import { Button } from "./buttons";
import { Icon } from "./icon";
import { Capitalize, Heading, Hyperlink, Title, Navlink } from "./texts";

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
export { Button, Icon, Capitalize, Heading, Hyperlink, Title, Navlink };
