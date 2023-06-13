export * from "./buttons/index.tsx";
export * from "./icon/index.tsx";
export * from "./texts/index.tsx";
export * from "./asset/index.tsx";
export * from "./forms/index.tsx";
export * from "./table/index.tsx";

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
