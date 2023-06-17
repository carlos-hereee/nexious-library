// assets
export { default as Hero } from "./asset/Hero";
export { default as Logo } from "./asset/Logo";
export { default as Icon } from "./asset/Icon";

// buttons
export { default as Button } from "./buttons/Button";
export { default as BackButton } from "./buttons/BackButton";

// forms
export { default as Input } from "./forms/Input";
export { default as InputQuantity } from "./forms/InputQuantity";
export { default as Label } from "./forms/Label";
export { default as Option } from "./forms/Option";

// table
export { default as CellData } from "./table/CellData";
export { default as CellTitle } from "./table/CellTitle";
export { default as TableCaption } from "./table/TableCaption";
export { default as Column } from "./table/Column";

// texts
export { default as Capitalize } from "./texts/Capitalize";
export { default as Heading } from "./texts/Heading";
export { default as Title } from "./texts/Title";
export { default as Hyperlink } from "./texts/Hyperlink";
export { default as Ribbon } from "./texts/Ribbon";
export { default as Subtitle } from "./texts/Subtitle";
export { default as Navlink } from "./texts/Navlink";
export { default as KeyValue } from "./texts/KeyValue";
export { default as CamelSpace } from "./texts/CamelSpace";

/**
   * NOTICE: 
   * mapping through the components displays the react element 
   *
   *  const cap = name.map((n) => <Capitalize data={n} />);
   *  I.E.
   * 
   * {
   *    $$typeof:Symbol(react.element), 
   *    key:null
   *    props:{data: 'vite'}
   *    ref:null
   *    ...rest
   * }
   * 
   * This is the react element to be invoked 

   */
// export { Button, Icon, Capitalize, Heading, Hyperlink, Title, Navlink, Hero };
