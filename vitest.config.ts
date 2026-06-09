import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vitest/config";

const mockSetupFile = path.resolve(process.cwd(), "src/mocks/setup-vitest.ts");

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
    },
    environment: "node",
    setupFiles: fs.existsSync(mockSetupFile) ? [mockSetupFile] : [],
  },
});
