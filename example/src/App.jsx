import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { add, Button, Capitalize } from "nexious-library";

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>
        {name.map((i) => (
          <Capitalize data={i} />
        ))}
      </h1>
      <div className="card">
        <Button data={count} click={handleCount} />

        {buttons.map((b) => (
          <Button data={b} />
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
