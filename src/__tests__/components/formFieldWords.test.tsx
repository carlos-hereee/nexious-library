// FormProps.fieldWords (2026-11 item 410): the words Form's own controls draw reach the file picker and
// the entry switcher, at the top level and inside a repeating group, and a form passing none keeps the
// English ones.
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { FormFieldWords, FormProps } from "nxs-form";
import Form from "../../components/template/Form";

const WORDS: FormFieldWords = {
  selectFile: "Elegir archivo",
  removeFile: "Quitar archivo",
  imagePreview: "Vista previa",
  entryCount: (count, max) => `${count} de ${max}`,
  entryPosition: (position, count) => `Elemento ${position} de ${count}`,
  entryEmpty: "vacío",
  addEntry: "Agregar otro",
  entriesFull: "No se permiten más",
};

const formProps = (fieldWords?: FormFieldWords, max = 20): FormProps =>
  ({
    initialValues: { hero: "https://cdn.example/hero.png", hasItems: true },
    labels: { hero: "Portada", hasItems: "Tiene elementos" },
    types: { hero: "file", hasItems: "checkbox" },
    placeholders: {},
    addEntry: {
      hasItems: {
        groupName: "items",
        initialValues: { question: "", photo: "" },
        labels: { question: "Pregunta", photo: "Foto" },
        types: { question: "text", photo: "file" },
        placeholders: {},
        canMultiply: true,
        canRemove: true,
        max,
        additionLabel: "Otra",
        removalLabel: "Quitar",
      },
    },
    entries: { items: [{ question: "", photo: "" }] },
    fieldWords,
    onSubmit: jest.fn(),
  }) as unknown as FormProps;

describe("Form fieldWords", () => {
  it("reaches the top level picker, a group's picker and the switcher", () => {
    render(<Form {...formProps(WORDS)} />);
    expect(screen.getAllByRole("button", { name: "Elegir archivo" })).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Quitar archivo" })).toBeInTheDocument();
    expect(screen.getAllByText("Vista previa")).toHaveLength(2);
    expect(screen.getByText("1 de 20")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Elemento 1 de 1, vacío" })).toBeInTheDocument();
    expect(screen.getByTitle("Agregar otro")).toBeInTheDocument();
    ["Choose a file", "Remove File", "Image Preview", "1 of 20"].forEach((english) =>
      expect(screen.queryByText(english)).not.toBeInTheDocument()
    );
  });

  it("says a full group is full in the consumer's words", () => {
    render(<Form {...formProps(WORDS, 1)} />);
    expect(screen.getByTitle("No se permiten más")).toBeInTheDocument();
  });

  it("keeps every English word when none are passed", () => {
    render(<Form {...formProps()} />);
    expect(screen.getAllByRole("button", { name: "Choose a file" })).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Remove File" })).toBeInTheDocument();
    expect(screen.getAllByText("Image Preview")).toHaveLength(2);
    expect(screen.getByText("1 of 20")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entry 1 of 1, empty" })).toBeInTheDocument();
    expect(screen.getByTitle("Add another")).toBeInTheDocument();
  });
});
