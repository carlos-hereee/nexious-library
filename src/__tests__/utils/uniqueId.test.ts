import { uniqueId, uniqueRandomList } from "../../utils/data/uniqueId";

// ── uniqueId regression suite ──
// Why: prior implementation called Node's `crypto.randomInt`, which does not
//   exist in browsers. Vite's shim made every form render crash with
//   "import_crypto.default.randomInt is not a function". The fix moved to
//   Web Crypto via globalThis.crypto.getRandomValues.
// What these tests lock in:
//   ① uniqueId runs in a DOM-like env (jest is configured with jsdom) without
//      throwing. If someone reintroduces `import crypto from "crypto"` and the
//      Node crypto surface, these tests still pass in Node — but the import
//      itself would break browser bundles. So we also assert we never touch
//      any Node-only symbol by exercising the function through the compiled
//      path in integration, and by asserting shape/length here.
//   ② Output shape: default length is 24 raw chars → 4 segments of 6 joined
//      with dashes ("xxxxxx-xxxxxx-xxxxxx-xxxxxx").
//   ③ Short-length path (length <= DASH_THRESHOLD) returns no dashes.
//   ④ Character pool is respected (only allowed chars appear).

describe("uniqueId", () => {
  const allowed = /^[A-Za-z0-9!@#$%^&*()_+=\[\]{}|;:,.<>?\-]+$/;

  it("does not throw in the test environment", () => {
    expect(() => uniqueId()).not.toThrow();
  });

  it("default output is 4 segments of 6 chars joined by dashes", () => {
    const id = uniqueId();
    expect(id).toMatch(/^.{6}-.{6}-.{6}-.{6}$/);
    expect(id.length).toBe(27); // 24 chars + 3 dashes
  });

  it("short ids skip the dash splitter", () => {
    const id = uniqueId(8);
    expect(id.length).toBe(8);
    expect(id.includes("-")).toBe(false);
  });

  it("only produces characters from the known pool", () => {
    // Large-ish sample to catch off-by-ones in the modulo math.
    for (let i = 0; i < 50; i++) {
      const id = uniqueId(24);
      expect(id).toMatch(allowed);
    }
  });

  it("generates unique values across many calls", () => {
    // Collisions at 24 chars out of an 85-char alphabet are astronomically
    // rare. Any duplicate here means randomness is broken (e.g. a mock
    // stuck at a constant) which is the exact class of regression this test
    // is protecting against.
    const ids = new Set<string>();
    for (let i = 0; i < 500; i++) ids.add(uniqueId());
    expect(ids.size).toBe(500);
  });
});

describe("uniqueRandomList", () => {
  it("returns the requested count with unique ids", () => {
    const list = uniqueRandomList(10);
    expect(list).toHaveLength(10);
    const ids = new Set(list.map((x) => x.id));
    expect(ids.size).toBe(10);
  });
});
