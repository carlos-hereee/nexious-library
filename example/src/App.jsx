import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Capitalize, Heading, add, Button , BackButton} from "nexious-library";
// import { Button, Capitalize, Heading, add } from "nexious-library";
// import { Button, Capitalize, Heading, add } from "nexious-library";
// import {  Capitalize, Heading, } from 'nexious-library'
// import {add} from 'nexious-library/@math/index.js'
// import {Button} from 'nexious-library/@atoms/'

// import { } from "nexious-library";

const App = () => {
  const [count, setCount] = useState(add(2, 5));
  let name = ["vite", "+", "react"];
  let buttons = [2, 5];

  /**
   * NOTICE: 
   * mapping through the components displays the react element 
   *
   *  const cap = name.map((n) => <Capitalize data={n} />);
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

  const handleCount = () => {
    setCount(() => count + 1);
  };
  return (
    <>
      <h1>
        {name.map((i) => (
          <span key={i}>
            <Capitalize data={i} />{" "}
          </span>
        ))}
      </h1>
      <div className="flex-g">
        <Heading data="Links" />
        <div className="hero flex-g">
          <div>
            <p className="icon-label">Vite</p>
            <a href="#vite" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
          </div>
          <div>
            <p>React</p>
            <a href="#react" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
        </div>
      </div>
      {/* <button onClick={() => history.back()}>Back</button> */}
      <BackButton />
      <div className="card">
        <Button data={count} click={handleCount} />

        {buttons.map((b) => (
          <Button data={b} key={b} />
        ))}
        <button onClick={handleCount}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
