import { useState, useEffect, useContext, createContext } from "react";
import "./App.css";

// TODO: Router

function Abc(props) {
  return <pre>{JSON.stringify(props)}</pre>;
}

const Xyz = ({ x, y, z }) => (
  <div>
    X: {x}, Y: {y}, Z: {z}
  </div>
);

// ----------------------------------------------------------------------------------------------------------------------------------------

function Termostato({ initialValue = 30 }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div>
      Quanto é quente para você?
      <button onClick={() => setValue(value - 1)}>( - )</button>
      <input type="text" value={value} />
      <button onClick={() => setValue(value + 1)}>( + )</button>
      Você disse que {value} é quente para você!!!
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

const utcServiceUrl = `https://app-current-utc-git-fernandobh.herokuapp.com`;
const responseJson = response => response.json();

function Agora() {
  const [utc, setUtc] = useState(`loading`);

  const atualiza = () => fetch(utcServiceUrl).then(responseJson).then(setUtc);

  useEffect(atualiza, []);

  return (
    <div>
      Agora é: '{utc}', <button onClick={atualiza}>atualizar</button>
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

const LastChangeContext = createContext({
  change: 1,
  setChange: () => {},
});

function VerContexto() {
  return (
    <LastChangeContext.Consumer>
      {({ change }) => (
        <div>A ultima mudança foi: '{change}'</div>
      )}
    </LastChangeContext.Consumer>
  );
}

function ModificaContexto() {
  return (
    <LastChangeContext.Consumer>
      {({ setChange }) => (
        <div>
          <button onClick={() => setChange(prompt("qual o novo valor do contexto?", new Date().toISOString()))}>Atualizar contexto</button>
        </div>
      )}
    </LastChangeContext.Consumer>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

function App() {
  const [change, setChange] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <LastChangeContext.Provider value={{change, setChange}}>
          <Abc a="1" b="2" c="3" />
          <Xyz x="1" y="2" z="3" />
          <Termostato />
          <Agora />
          <VerContexto />
          <ModificaContexto />
        </LastChangeContext.Provider>
      </header>
    </div>
  );
}

export default App;
