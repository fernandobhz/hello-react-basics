import { useState, useEffect, useContext, createContext } from "react";
import { HashRouter, BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import "./App.css";

function Abc(props) {
  return <pre>{JSON.stringify(props)}</pre>;
}

const Xyz = ({ x, y, z }) => (
  <div>
    X: {x}, Y: {y}, Z: {z}
  </div>
);

function AbcUse() {
  const { a, b, c } = useParams();
  return <Abc a={a} b={b} c={c} />;
}

function XyzUse() {
  const { x, y, z } = useParams();
  return <Xyz x={x} y={y} z={z} />;
}

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
  return <LastChangeContext.Consumer>{({ change }) => <div>A ultima mudança foi: '{change}'</div>}</LastChangeContext.Consumer>;
}

function ModificaContexto() {
  return (
    <LastChangeContext.Consumer>
      {({ setChange }) => (
        <div>
          <button onClick={() => setChange(prompt("qual o novo valor do contexto?", Math.random().toString(36).slice(-5)))}>Atualizar contexto</button>
        </div>
      )}
    </LastChangeContext.Consumer>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

function VerContextoHooks() {
  const { change } = useContext(LastChangeContext);

  return <div>(Hooks) A ultima mudança foi: '{change}'</div>;
}

function ModificaContextoHooks() {
  const { setChange } = useContext(LastChangeContext);

  return (
    <div>
      (Hooks) <button onClick={() => setChange(prompt("qual o novo valor do contexto?", Math.random().toString(36).slice(-5)))}>Atualizar contexto</button>
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

function Home() {
  return <div>Hello there!</div>;
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/AbcUse/:a/:b/:c" exact component={AbcUse} />
      <Route path="/XyzUse/:x/:y/:z" exact component={XyzUse} />
      <Route path="/Termostato/" exact component={Termostato} />
      <Route path="/Agora/" exact component={Agora} />
      <Route path="/VerContexto/" component={VerContexto} />
      <Route path="/ModificaContexto/" component={ModificaContexto} />
      <Route path="/VerContextoHooks/" component={VerContextoHooks} />
      <Route path="/ModificaContextoHooks/" component={ModificaContextoHooks} />
    </Switch>
  </BrowserRouter>
);

function App() {
  const [change, setChange] = useState(1);

  return (
    <div className="App">
      <LastChangeContext.Provider value={{ change, setChange }}>
        <a href="/">Home</a>
        <a href="/AbcUse/a/b/c">AbcUse</a>
        <a href="/XyzUse/1/2/3">XyzUse</a>
        <a href="/Termostato">Termostato</a>
        <a href="/Agora">Agora</a> -<a href="#VerContexto">VerContexto</a>
        <a href="/ModificaContexto">ModificaContexto</a>
        <a href="/VerContextoHooks">VerContextoHooks</a>
        <a href="/ModificaContextoHooks">ModificaContextoHooks</a>
        <br />
        <br />
        <Routes />
      </LastChangeContext.Provider>
    </div>
  );
}

export default App;
