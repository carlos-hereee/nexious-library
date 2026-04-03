import { renderHook, act } from "@testing-library/react";
import { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
import type { FieldValueProps } from "nxs-form";

// Helper: build a minimal FieldValueProps for test use
const field = (overrides: Partial<FieldValueProps>): FieldValueProps => ({
  fieldId: overrides.name || "field-1",
  name: "field",
  value: "",
  type: "text",
  label: "",
  placeholder: "",
  ...overrides,
});

describe("useFormValidation — checkRequired", () => {
  it("adds an error when a required field is empty", () => {
    const { result } = renderHook(() =>
      useFormValidation({ required: ["username"] })
    );

    act(() => {
      result.current.validateForm([field({ name: "username", value: "" })]);
    });

    expect(result.current.validationStatus).toBe("error");
    expect(result.current.formErrors["username"]).toBe("**Required");
  });

  it("passes when a required field has a value", () => {
    const { result } = renderHook(() =>
      useFormValidation({ required: ["username"] })
    );

    act(() => {
      result.current.validateForm([field({ name: "username", value: "carlos" })]);
    });

    expect(result.current.validationStatus).toBe("validated");
    expect(result.current.formErrors["username"]).toBeUndefined();
  });

  it("does not flag non-required empty fields", () => {
    const { result } = renderHook(() =>
      useFormValidation({ required: ["username"] })
    );

    act(() => {
      result.current.validateForm([field({ name: "bio", value: "" })]);
    });

    expect(result.current.validationStatus).toBe("validated");
    expect(result.current.formErrors["bio"]).toBeUndefined();
  });
});

describe("useFormValidation — checkEmail", () => {
  it("adds an error for an invalid email address", () => {
    const { result } = renderHook(() => useFormValidation({}));

    act(() => {
      result.current.validateForm([field({ name: "email", value: "not-an-email" })]);
    });

    expect(result.current.validationStatus).toBe("error");
    expect(result.current.formErrors["email"]).toMatch(/valid email/i);
  });

  it("passes a valid email address", () => {
    const { result } = renderHook(() => useFormValidation({}));

    act(() => {
      result.current.validateForm([field({ name: "email", value: "user@example.com" })]);
    });

    expect(result.current.validationStatus).toBe("validated");
    expect(result.current.formErrors["email"]).toBeUndefined();
  });

  it("skips email validation when the field is empty (caught by required instead)", () => {
    const { result } = renderHook(() => useFormValidation({ required: ["email"] }));

    act(() => {
      result.current.validateForm([field({ name: "email", value: "" })]);
    });

    // error should be the required message, not the email format message
    expect(result.current.formErrors["email"]).toBe("**Required");
  });

  it("does not validate email format on non-email fields", () => {
    const { result } = renderHook(() => useFormValidation({}));

    act(() => {
      result.current.validateForm([field({ name: "username", value: "not-an-email" })]);
    });

    expect(result.current.validationStatus).toBe("validated");
    expect(result.current.formErrors["username"]).toBeUndefined();
  });
});

describe("useFormValidation — validateForm status", () => {
  it("sets status to 'error' when there are validation errors", () => {
    const { result } = renderHook(() =>
      useFormValidation({ required: ["name"] })
    );

    act(() => {
      result.current.validateForm([field({ name: "name", value: "" })]);
    });

    // BUG WAS: this incorrectly set "validated" even when errors existed
    expect(result.current.validationStatus).toBe("error");
  });

  it("sets the requested status when there are no errors", () => {
    const { result } = renderHook(() => useFormValidation({}));

    act(() => {
      result.current.validateForm([field({ name: "name", value: "alice" })], "green");
    });

    expect(result.current.validationStatus).toBe("green");
  });

  it("sets 'validated' when no errors and no specific status requested", () => {
    const { result } = renderHook(() => useFormValidation({}));

    act(() => {
      result.current.validateForm([field({ name: "name", value: "alice" })]);
    });

    expect(result.current.validationStatus).toBe("validated");
  });

  it("does not override requested status with 'validated' on a clean form", () => {
    // This was a subtle architectural bug: the old useEffect([formErrors]) would
    // fire after validateForm set "green" and override it to "validated".
    // Now that the useEffect is removed, "green" persists.
    const { result } = renderHook(() => useFormValidation({}));

    act(() => {
      result.current.validateForm([field({ name: "name", value: "alice" })], "green");
    });

    expect(result.current.validationStatus).toBe("green");
  });
});

describe("useFormValidation — checkMatch", () => {
  it("adds an error when field value does not match the expected value", () => {
    const { result } = renderHook(() =>
      useFormValidation({ match: [{ name: "confirmPassword", value: "secret123" }] })
    );

    act(() => {
      result.current.validateForm([
        field({ name: "confirmPassword", value: "wrong" }),
      ]);
    });

    expect(result.current.validationStatus).toBe("error");
    expect(result.current.formErrors["confirmPassword"]).toMatch(/must match/i);
  });

  it("passes when field value matches", () => {
    const { result } = renderHook(() =>
      useFormValidation({ match: [{ name: "confirmPassword", value: "secret123" }] })
    );

    act(() => {
      result.current.validateForm([
        field({ name: "confirmPassword", value: "secret123" }),
      ]);
    });

    expect(result.current.validationStatus).toBe("validated");
  });
});

describe("useFormValidation — checkUniqueness", () => {
  it("adds an error when field value already exists in the unique list", () => {
    const { result } = renderHook(() =>
      useFormValidation({ unique: [{ name: "appName", list: ["myapp", "otherapp"] }] })
    );

    act(() => {
      result.current.validateForm([field({ name: "appName", value: "myapp" })]);
    });

    expect(result.current.validationStatus).toBe("error");
    expect(result.current.formErrors["appName"]).toMatch(/already exist/i);
  });

  it("passes when the value is not in the unique list", () => {
    const { result } = renderHook(() =>
      useFormValidation({ unique: [{ name: "appName", list: ["myapp"] }] })
    );

    act(() => {
      result.current.validateForm([field({ name: "appName", value: "newapp" })]);
    });

    expect(result.current.validationStatus).toBe("validated");
  });
});
