import logo from './logo.svg';
import styles from './App.module.css';
import { createSignal } from "solid-js";
function App() {
  const [first, setFirst] = createSignal("JSON");
  return (
    <div class={styles.App}>
      <span>adasd</span>
      <Child1 name={first()} />
      <Child2 set={setFirst}/>
    </div>
  );
}


function Child1(props) {
  console.log("Child1 render");
  return <div>{props.name}</div>
}

function Child2(props) {
  console.log("Child2 render");
  const handleClick = ()=>{
    props.set(Math.random().toString())
  }
  return <button onClick={handleClick}>set</button>
}

export default App;
