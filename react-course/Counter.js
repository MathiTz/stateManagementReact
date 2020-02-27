import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// const storeStateInLocalStorage = count => {
//   localStorage.setItem("counterState", JSON.stringify({ count }));
// };

// const useLocalStorage = (initialState, key) => {
//   const get = () => {
//     const storage = localStorage.getItem(key);
//     if (storage) return JSON.parse(storage).value;
//     return initialState;
//   };

//   const [value, setValue] = useState(get());

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify({ value }));
//   }, [key, value]);

//   return [value, setValue];
// };

const App = ({ max, step }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  let message = "";
  if (countRef.current < count) message = "Higher";
  if (countRef.current > count) message = "Lower";

  countRef.current = count;

  const increment = () => {
    setCount(c => c + 1);
  };
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log(`Count: ${count}`);
  //   }, 3000);

  //   return () => clearInterval(id);
  // }, [count]);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  return (
    <div className="App">
      <p>{message}</p>
      <p>{count}</p>
      <section>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default App;
