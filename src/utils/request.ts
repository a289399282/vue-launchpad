import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

export interface ApiEnvelope<TData> {
  code: number;
  data: TData;
  message: string;
  traceId?: string;
}

export interface LaunchpadRequestConfig<TPayload = unknown> extends AxiosRequestConfig<TPayload> {
  dedupe?: boolean;
  skipAuth?: boolean;
}

export class RequestError<TPayload = unknown> extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly payload?: TPayload,
  ) {
    super(message);
    this.name = "RequestError";
  }
}

function readToken() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem("vue-launchpad-token");
}

function isApiEnvelope<TData>(value: unknown): value is ApiEnvelope<TData> {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "data" in value &&
    "message" in value
  );
}

const pendingRequests = new Map<string, AbortController>();
const requestKeys = new WeakMap<InternalAxiosRequestConfig, string>();
const requestControllers = new WeakMap<InternalAxiosRequestConfig, AbortController>();

function stableStringify(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value !== "object") {
    return String(value);
  }

  if (value instanceof URLSearchParams) {
    return value.toString();
  }

  if (value instanceof FormData) {
    return Array.from(value.entries())
      .map(([key, entryValue]) => {
        const normalizedValue =
          typeof File !== "undefined" && entryValue instanceof File ? entryValue.name : entryValue;

        return `${key}:${normalizedValue}`;
      })
      .sort()
      .join("&");
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  return `{${Object.keys(value)
    .sort()
    .map((key) => `${key}:${stableStringify((value as Record<string, unknown>)[key])}`)
    .join(",")}}`;
}

function createPendingKey(config: InternalAxiosRequestConfig) {
  const method = (config.method ?? "GET").toUpperCase();
  const url = config.url ?? "";
  const params = stableStringify(config.params);
  const data = stableStringify(config.data);

  return [method, url, params, data].join("::");
}

function bindAbortSignal(config: InternalAxiosRequestConfig, controller: AbortController) {
  const upstreamSignal = config.signal;

  if (upstreamSignal?.aborted) {
    controller.abort();
    return;
  }

  const addAbortListener = upstreamSignal?.addEventListener;

  if (upstreamSignal && typeof addAbortListener === "function") {
    addAbortListener.call(
      upstreamSignal,
      "abort",
      () => {
        controller.abort();
      },
      { once: true },
    );
  }

  config.signal = controller.signal;
}

function trackPendingRequest(config: InternalAxiosRequestConfig) {
  const requestKey = createPendingKey(config);
  const previousController = pendingRequests.get(requestKey);

  previousController?.abort();

  const controller = new AbortController();
  bindAbortSignal(config, controller);
  pendingRequests.set(requestKey, controller);
  requestKeys.set(config, requestKey);
  requestControllers.set(config, controller);
}

function removePendingRequest(config?: InternalAxiosRequestConfig) {
  if (!config) {
    return;
  }

  const requestKey = requestKeys.get(config);
  const controller = requestControllers.get(config);

  if (requestKey && controller && pendingRequests.get(requestKey) === controller) {
    pendingRequests.delete(requestKey);
  }

  requestKeys.delete(config);
  requestControllers.delete(config);
}

class HttpClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      // 中文：统一读取环境矩阵中的业务 API 根路径，开发/预发可配合 Vite 动态代理转发。
      // English: Read the business API base URL from the env matrix; dev/staging can forward through Vite proxies.
      baseURL: import.meta.env.VITE_APP_BASE_API,
      timeout: 15_000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use((config) => {
      const launchpadConfig = config as InternalAxiosRequestConfig & LaunchpadRequestConfig;
      const token = readToken();

      if (!launchpadConfig.skipAuth && token) {
        launchpadConfig.headers.Authorization = `Bearer ${token}`;
      }

      if (launchpadConfig.dedupe !== false) {
        trackPendingRequest(launchpadConfig);
      }

      return launchpadConfig;
    });

    this.instance.interceptors.response.use(
      (response) => {
        removePendingRequest(response.config);

        const payload = response.data;

        if (isApiEnvelope(payload)) {
          if (payload.code >= 200 && payload.code < 300) {
            return payload.data;
          }

          throw new RequestError(payload.message, response.status, payload);
        }

        return payload;
      },
      (error: AxiosError) => {
        removePendingRequest(error.config);

        const message =
          error.response?.statusText || error.message || "Network request failed unexpectedly";

        return Promise.reject(
          new RequestError(message, error.response?.status, error.response?.data),
        );
      },
    );
  }

  request<TData = unknown, TPayload = unknown>(config: LaunchpadRequestConfig<TPayload>) {
    return this.instance.request<unknown, TData, TPayload>(config);
  }

  get<TData = unknown>(url: string, config?: LaunchpadRequestConfig) {
    return this.request<TData>({ ...config, method: "GET", url });
  }

  post<TData = unknown, TPayload = unknown>(
    url: string,
    data?: TPayload,
    config?: LaunchpadRequestConfig<TPayload>,
  ) {
    const requestConfig: LaunchpadRequestConfig<TPayload> = { ...config, method: "POST", url };

    if (data !== undefined) {
      requestConfig.data = data;
    }

    return this.request<TData, TPayload>(requestConfig);
  }

  put<TData = unknown, TPayload = unknown>(
    url: string,
    data?: TPayload,
    config?: LaunchpadRequestConfig<TPayload>,
  ) {
    const requestConfig: LaunchpadRequestConfig<TPayload> = { ...config, method: "PUT", url };

    if (data !== undefined) {
      requestConfig.data = data;
    }

    return this.request<TData, TPayload>(requestConfig);
  }

  delete<TData = unknown>(url: string, config?: LaunchpadRequestConfig) {
    return this.request<TData>({ ...config, method: "DELETE", url });
  }
}

export const request = new HttpClient();
