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

function Temperature({ initialValue = 30 }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ display: "flex", justifyContent: 'space-between', width: '70%' }}>
      <span>How many degrees Celsius is hot for you?</span>
      <span>
        <button onClick={() => setValue(value - 1)}>( - )</button>
        <input type="text" value={value} onChange={event => setValue(event.target.value)} />
        <button onClick={() => setValue(value + 1)}>( + )</button>
      </span>
      <span>You said that '{value}' is hot for you!</span>
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

const utcServiceUrl = `https://app-current-utc-git-fernandobh.herokuapp.com`;
const fetchJson = (...args) => fetch(...args).then(response => response.json());

function CurrentTime() {
  const [utc, setUtc] = useState(`loading`);

  const updateUtc = () => fetchJson(utcServiceUrl).then(setUtc);

  useEffect(updateUtc, []);

  return (
    <div>
      The current utc is : '{utc}', <button onClick={updateUtc}>update current utc</button>
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

const LastChangeContext = createContext({
  change: 1,
  setChange: () => {},
});

function SeeContext() {
  return <LastChangeContext.Consumer>{({ change }) => <div>The last change was: '{change}'</div>}</LastChangeContext.Consumer>;
}

function ChangeContext() {
  return (
    <LastChangeContext.Consumer>
      {({ setChange }) => (
        <div>
          <button onClick={() => setChange(prompt("New value of context:", Math.random().toString(36).slice(-5)))}> Update Context </button>
        </div>
      )}
    </LastChangeContext.Consumer>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

function SeeContextHooks() {
  const { change } = useContext(LastChangeContext);

  return <div>(Hooks) The last change was: '{change}'</div>;
}

function ChangeContextHooks() {
  const { setChange } = useContext(LastChangeContext);

  return (
    <div>
      (Hooks) <button onClick={() => setChange(prompt("New value of context:", Math.random().toString(36).slice(-5)))}> Update Context </button>
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------------------------------

function Home() {
  return <>Hello there!</>;
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
          <Link to="/Temperature">Temperature</Link>
          <Link to="/CurrentTime">CurrentTime</Link>
          <Link to="/SeeContext">SeeContext</Link>
          <Link to="/ChangeContext">ChangeContext</Link>
          <Link to="/SeeContextHooks">SeeContextHooks</Link>
          <Link to="/ChangeContextHooks">ChangeContextHooks</Link>
          <br />
          <br />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/AbcUse/:a/:b/:c" exact component={AbcUse} />
            <Route path="/XyzUse/:x/:y/:z" exact component={XyzUse} />
            <Route path="/Temperature/" exact component={Temperature} />
            <Route path="/CurrentTime/" exact component={CurrentTime} />
            <Route path="/SeeContext/" component={SeeContext} />
            <Route path="/ChangeContext/" component={ChangeContext} />
            <Route path="/SeeContextHooks/" component={SeeContextHooks} />
            <Route path="/ChangeContextHooks/" component={ChangeContextHooks} />
          </Switch>
        </LastChangeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
