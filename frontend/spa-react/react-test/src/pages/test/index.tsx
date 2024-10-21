import { todosStore } from "@/store/todoStore";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function useSyStore1(subscribe, getSnapshot) {
  const [state, setState] = useState(getSnapshot());
  subscribe(() => {
    setState(getSnapshot());
  });
  return state;
}

export function useSyStore2(subscribe, getSnapshot) {
  const [state, setState] = useState(() => getSnapshot());
  const stateRef = useRef(state);
  const getSnapshotRef = useRef(getSnapshot);
  const subscribeRef = useRef(subscribe);

  useEffect(() => {
    getSnapshotRef.current = getSnapshot;
    subscribeRef.current = subscribe;
  }, [getSnapshot, subscribe]);

  useEffect(() => {
    let didUnsubscribe = false;

    const checkForUpdates = () => {
      if (didUnsubscribe) {
        return;
      }

      const nextState = getSnapshotRef.current();
      if (!Object.is(stateRef.current, nextState)) {
        stateRef.current = nextState;
        setState(nextState);
      }
    };

    const unsubscribe = subscribeRef.current(checkForUpdates);
    checkForUpdates();

    return () => {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!Object.is(state, stateRef.current)) {
      setState(stateRef.current);
    }
  }, [state]);

  return state;
}

export default function TestPage() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );
  console.log(todos);

  return (
    <>
      <h1>Test Page</h1>
      <button onClick={todosStore.addTodo}>Add Todo</button>
    </>
  );
}
