import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { add, Button, Capitalize } from "nexious-library";

const App = () => {
  const [count, setCount] = useState(add(2, 5));
  const name = "vite + react".split(" ");

  const cap = name.map((n) => {
    // console.log("n", n);
    console.log("<Capitalize ", Capitalize({ data: n }));
    // return;
  });

  const handleCount = () => {
    setCount(() => count + 1);
  };
  console.log(cap);
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
        {"vite + react"
          .split(" ")
          .map((i) => <Capitalize data={i} />)
          .join(" ")}
      </h1>
      <div className="card">
        <Button data={count} click={handleCount} />
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
