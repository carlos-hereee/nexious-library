import { renderHook } from "@testing-library/react";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";

describe("useRequiredProps", () => {
  // ── green light cases ──────────────────────────────────────────────────────
  it("returns green when all props are present", () => {
    const { result } = renderHook(() => useRequiredProps({ name: "Alice", age: 30, active: true }));

    expect(result.current.lightColor).toBe("green");
    expect(result.current.errors).toHaveLength(0);
  });

  it("returns green for boolean false (explicitly set prop, not missing)", () => {
    // false is a valid value — it should not be flagged as missing
    const { result } = renderHook(() => useRequiredProps({ isVisible: false }));

    expect(result.current.lightColor).toBe("green");
  });

  it("returns green for numeric zero (valid value)", () => {
    const { result } = renderHook(() => useRequiredProps({ count: 0 }));

    expect(result.current.lightColor).toBe("green");
  });

  // ── red light cases ────────────────────────────────────────────────────────
  it("returns red when a prop is undefined", () => {
    const { result } = renderHook(() => useRequiredProps({ name: undefined }));

    expect(result.current.lightColor).toBe("red");
    expect(result.current.errors).toHaveLength(1);
    expect(result.current.errors[0].name).toBe("name");
  });

  it("returns red when a prop is null", () => {
    const { result } = renderHook(() => useRequiredProps({ name: null }));

    expect(result.current.lightColor).toBe("red");
    expect(result.current.errors[0].name).toBe("name");
  });

  it("returns red when a prop is an empty string", () => {
    const { result } = renderHook(() => useRequiredProps({ title: "" }));

    expect(result.current.lightColor).toBe("red");
    expect(result.current.errors[0].name).toBe("title");
  });

  it("returns red when a prop is an empty array", () => {
    const { result } = renderHook(() => useRequiredProps({ items: [] }));

    expect(result.current.lightColor).toBe("red");
    expect(result.current.errors[0].name).toBe("items");
  });

  it("returns red when a prop is an empty object", () => {
    // BUG WAS: `objLength(value) < 0` can never be true — was effectively dead code.
    // Fixed to `=== 0` so empty objects are correctly flagged.
    const { result } = renderHook(() => useRequiredProps({ config: {} }));

    expect(result.current.lightColor).toBe("red");
    expect(result.current.errors[0].name).toBe("config");
  });

  // ── accumulation: the stale closure regression ─────────────────────────────
  it("accumulates multiple errors — one per missing prop", () => {
    // BUG WAS: stale closure meant each call to missingProps overwrote with the
    // initial empty array. Only the last error survived. Fixed with functional update.
    const { result } = renderHook(() => useRequiredProps({ title: "", subtitle: null, items: undefined }));

    expect(result.current.lightColor).toBe("red");
    // all three missing props should each produce an error entry
    expect(result.current.errors).toHaveLength(3);
    const names = result.current.errors.map((e) => e.name);
    expect(names).toContain("title");
    expect(names).toContain("subtitle");
    expect(names).toContain("items");
  });

  it("mixes: some props valid, some missing — only missing ones flagged", () => {
    const { result } = renderHook(() => useRequiredProps({ name: "Alice", email: "" }));

    expect(result.current.lightColor).toBe("red");
    expect(result.current.errors).toHaveLength(1);
    expect(result.current.errors[0].name).toBe("email");
  });
});
