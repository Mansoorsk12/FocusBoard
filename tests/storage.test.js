import test from "node:test";
import assert from "node:assert/strict";
import { readTaskCache, STORAGE_KEY } from "../src/hooks/useLocalStorage.js";
import { initialTasks } from "../src/data/initialTasks.js";

function storageWith(raw) {
  return { getItem: (key) => (key === STORAGE_KEY ? raw : null) };
}

test("missing storage and intentionally empty storage are different", () => {
  globalThis.window = { localStorage: storageWith(null) };
  assert.equal(readTaskCache().tasks, null);
  globalThis.window = { localStorage: storageWith("[]") };
  assert.deepEqual(readTaskCache().tasks, []);
  delete globalThis.window;
});

test("saved tasks survive reads and are not replaced by sample data", () => {
  const saved = [{ ...initialTasks[0], title: "My saved work" }];
  globalThis.window = { localStorage: storageWith(JSON.stringify(saved)) };
  assert.deepEqual(readTaskCache().tasks, saved);
  delete globalThis.window;
});

test("invalid JSON, invalid records, and unavailable storage are handled", () => {
  for (const raw of ["not-json", "{}", "[null]"]) {
    globalThis.window = { localStorage: storageWith(raw) };
    const cache = readTaskCache();
    assert.equal(cache.tasks, null);
    assert.ok(cache.error);
  }
  globalThis.window = {
    localStorage: {
      getItem() {
        throw new Error("Blocked");
      },
    },
  };
  assert.doesNotThrow(() => readTaskCache());
  assert.ok(readTaskCache().error);
  delete globalThis.window;
});
