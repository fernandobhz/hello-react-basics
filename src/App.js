import { useState, useEffect } from "react";
import "./App.css";

const utcServiceUrl = `https://app-current-utc-git-fernandobh.herokuapp.com`;
const responseJson = response => response.json();

function Agora() {
  const [utc, setUtc] = useState(`loading`);

  const atualiza = () => fetch(utcServiceUrl).then(responseJson).then(setUtc);

  useEffect(atualiza, []);

  return (
    <>
      Agora é: '{utc}', <button onClick={atualiza}>atualizar</button>
    </>
  );
}

function Abc(props) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

const Xyz = ({ x, y, z }) => (
  <div>
    X: {x}
    <br />
    Y: {y}
    <br />
    Z: {z}
    <br />
  </div>
);

function Termostato({ initialValue = 30 }) {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      Quanto é quente para você?
      <button onClick={() => setValue(value - 1)}>( - )</button>
      <input type="text" value={value} />
      <button onClick={() => setValue(value + 1)}>( + )</button>
      Você disse que {value} é quente para você!!!
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Techseract</p>
        <Agora />
        <Abc a="1" b="2" c="3"></Abc>
        <Xyz x="1" y="2" z="3"></Xyz>

        <Termostato />
      </header>
    </div>
  );
}

export default App;
