import { useState, useEffect, useContext, createContext } from "react";
import { HashRouter, BrowserRouter, Switch, Route, useParams, Link } from "react-router-dom";
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

function App() {
  const [change, setChange] = useState(1);

  return (
    <div className="App">
      <BrowserRouter>
        <LastChangeContext.Provider value={{ change, setChange }}>
          <Link to="/">Home</Link>
          <Link to="/AbcUse/a/b/c">AbcUse</Link>
          <Link to="/XyzUse/1/2/3">XyzUse</Link>
          <Link to="/Termostato">Termostato</Link>
          <Link to="/Agora">Agora</Link>
          <Link to="/VerContexto">VerContexto</Link>
          <Link to="/ModificaContexto">ModificaContexto</Link>
          <Link to="/VerContextoHooks">VerContextoHooks</Link>
          <Link to="/ModificaContextoHooks">ModificaContextoHooks</Link>
          <br />
          <br />
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
        </LastChangeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
