import {
  formatFormData,
  formatFormEntryData,
  formatPreviewData,
  formatFilesData,
  formatFilesEntryData,
} from "@nxs-utils/form/handleFormSubmit";
import type { FieldValueProps, FieldEntryProps } from "nxs-form";

const field = (overrides: Partial<FieldValueProps> & Pick<FieldValueProps, "name" | "value">): FieldValueProps => ({
  fieldId: overrides.fieldId || `${overrides.name}-id`,
  type: "text",
  label: "",
  placeholder: "",
  ...overrides,
});

describe("formatFormData", () => {
  it("flattens an array of fields into a name→value object", () => {
    const values: FieldValueProps[] = [
      field({ name: "username", value: "alice" }),
      field({ name: "age", value: 30 }),
      field({ name: "active", value: true }),
    ];
    expect(formatFormData(values)).toEqual({ username: "alice", age: 30, active: true });
  });

  it("returns an empty object for an empty input array", () => {
    expect(formatFormData([])).toEqual({});
  });

  it("later entries with the same name overwrite earlier ones", () => {
    const values: FieldValueProps[] = [
      field({ name: "x", value: "first" }),
      field({ name: "x", value: "second" }),
    ];
    expect(formatFormData(values)).toEqual({ x: "second" });
  });
});

describe("formatFormEntryData", () => {
  it("collapses entry groups into arrays keyed by groupName", () => {
    const entries: { [key: string]: FieldEntryProps } = {
      addresses: {
        "key-1": [
          field({ name: "street", value: "1 Main", groupName: "addresses", sharedKey: "key-1" }),
          field({ name: "city", value: "NYC", groupName: "addresses", sharedKey: "key-1" }),
        ],
        "key-2": [
          field({ name: "street", value: "2 Oak", groupName: "addresses", sharedKey: "key-2" }),
          field({ name: "city", value: "LA", groupName: "addresses", sharedKey: "key-2" }),
        ],
      },
    };
    const values: FieldValueProps[] = [
      field({ name: "username", value: "alice" }),
      field({ name: "addresses", value: true, groupName: "addresses" }),
    ];

    expect(formatFormEntryData(values, entries)).toEqual({
      username: "alice",
      addresses: [
        { street: "1 Main", city: "NYC" },
        { street: "2 Oak", city: "LA" },
      ],
    });
  });

  it("handles values with no entry groups (degrades to plain object)", () => {
    const values: FieldValueProps[] = [field({ name: "username", value: "alice" })];
    expect(formatFormEntryData(values, {})).toEqual({ username: "alice" });
  });
});

describe("formatPreviewData", () => {
  it("merges fields belonging to the same group + sharedKey", () => {
    const values: FieldValueProps[] = [
      field({ name: "username", value: "alice" }),
      field({
        name: "street",
        value: "1 Main",
        group: "addresses",
        groupName: "addresses",
        sharedKey: "key-1",
      }),
      field({
        name: "city",
        value: "NYC",
        group: "addresses",
        groupName: "addresses",
        sharedKey: "key-1",
      }),
    ];
    expect(formatPreviewData(values)).toEqual({
      username: "alice",
      addresses: [{ street: "1 Main", city: "NYC", sharedKey: "key-1" }],
    });
  });

  it("uses plain key/value for non-grouped fields", () => {
    const values: FieldValueProps[] = [field({ name: "x", value: 1 }), field({ name: "y", value: false })];
    expect(formatPreviewData(values)).toEqual({ x: 1, y: false });
  });

  // Locks in current behavior: once a sharedKey-keyed array exists for a group,
  // a new sharedKey arriving in subsequent fields is dropped silently because
  // findIndex returns -1 and there's no fallback push. If the source is fixed
  // to support multiple sharedKeys, update this test.
  it("drops fields whose sharedKey is not yet present in the group array", () => {
    const values: FieldValueProps[] = [
      field({
        name: "street",
        value: "1 Main",
        group: "addresses",
        groupName: "addresses",
        sharedKey: "key-1",
      }),
      field({
        name: "street",
        value: "2 Oak",
        group: "addresses",
        groupName: "addresses",
        sharedKey: "key-2",
      }),
    ];
    expect(formatPreviewData(values)).toEqual({
      addresses: [{ street: "1 Main", sharedKey: "key-1" }],
    });
  });
});

describe("formatFilesData", () => {
  it("appends string and number/boolean values under field name", () => {
    const fd = new FormData();
    formatFilesData(
      [
        field({ name: "username", value: "alice" }),
        field({ name: "age", value: 30 }),
        field({ name: "active", value: true }),
      ],
      fd
    );
    expect(fd.get("username")).toBe("alice");
    expect(fd.get("age")).toBe("30");
    expect(fd.get("active")).toBe("true");
  });

  it("appends File values under their field name", () => {
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    const fd = new FormData();
    formatFilesData([field({ name: "avatar", value: file })], fd);
    const stored = fd.get("avatar");
    expect(stored).toBeInstanceOf(File);
    expect((stored as File).name).toBe("hello.txt");
  });

  it("uses groupName as the key when the grouped value is a File", () => {
    const file = new File(["x"], "x.png");
    const fd = new FormData();
    formatFilesData(
      [field({ name: "photo", value: file, groupName: "photos", sharedKey: "k1" })],
      fd
    );
    expect(fd.get("photos")).toBeInstanceOf(File);
  });

  it("uses groupName-sharedKey as the key when the grouped value is not a File", () => {
    const fd = new FormData();
    formatFilesData(
      [field({ name: "street", value: "1 Main", groupName: "addresses", sharedKey: "k1" })],
      fd
    );
    expect(fd.get("addresses-k1")).toBe("1 Main");
  });
});

describe("formatFilesEntryData", () => {
  it("appends grouped entry values and ungrouped values to a fresh FormData", () => {
    const file = new File(["pic"], "pic.png");
    const entries: { [key: string]: FieldEntryProps } = {
      photos: {
        "k1": [field({ name: "image", value: file, groupName: "photos", sharedKey: "k1" })],
      },
    };
    const values: FieldValueProps[] = [
      field({ name: "username", value: "alice" }),
      field({ name: "photos", value: true, groupName: "photos" }),
    ];

    const result = formatFilesEntryData(values, entries);
    expect(result).toBeInstanceOf(FormData);
    expect(result.get("username")).toBe("alice");
    // the file in the entry is keyed under its groupName (since value is File)
    expect(result.get("photos")).toBeInstanceOf(File);
  });
});
