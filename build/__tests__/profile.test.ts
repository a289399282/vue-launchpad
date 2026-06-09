import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readLaunchpadProfile } from "../profile";

const temporaryRoots: string[] = [];

async function createTemporaryRoot(profileContent?: string) {
  const root = await mkdtemp(path.join(os.tmpdir(), "vue-launchpad-profile-"));
  temporaryRoots.push(root);

  if (profileContent !== undefined) {
    await writeFile(path.join(root, ".uirc.json"), profileContent);
  }

  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { force: true, recursive: true })),
  );
});

describe("readLaunchpadProfile", () => {
  it("缺少 .uirc.json 时使用默认 UI profile", async () => {
    const root = await createTemporaryRoot();

    expect(readLaunchpadProfile(root)).toEqual({
      i18n: false,
      ui: "element-plus",
    });
  });

  it("读取合法 UI profile", async () => {
    const root = await createTemporaryRoot(JSON.stringify({ i18n: true, ui: "naive-ui" }));

    expect(readLaunchpadProfile(root)).toEqual({
      i18n: true,
      ui: "naive-ui",
    });
  });

  it("非法 UI 值降级到默认 UI，避免构建链读取 undefined 配置", async () => {
    const root = await createTemporaryRoot(JSON.stringify({ i18n: true, ui: "unknown-ui" }));

    expect(readLaunchpadProfile(root)).toEqual({
      i18n: true,
      ui: "element-plus",
    });
  });

  it("损坏或非对象配置降级到默认 UI profile", async () => {
    const invalidJsonRoot = await createTemporaryRoot("{");
    const nonObjectRoot = await createTemporaryRoot("null");

    expect(readLaunchpadProfile(invalidJsonRoot)).toEqual({
      i18n: false,
      ui: "element-plus",
    });
    expect(readLaunchpadProfile(nonObjectRoot)).toEqual({
      i18n: false,
      ui: "element-plus",
    });
  });
});
