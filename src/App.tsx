import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Header</h1>
      <p>{count}</p>
      <button
        className="border-2 bg-gray-300 p-2 rounded my-2"
        onClick={() => setCount(count + 1)}
      >
        click here
      </button>
    </div>
  );
}

export default App;
