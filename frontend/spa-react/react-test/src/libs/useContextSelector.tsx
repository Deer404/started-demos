import React, {
  useContext,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";

// 定义 Context 的类型
type ContextType<T> = {
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
  setState: React.Dispatch<React.SetStateAction<T>>;
};

// useContextSelector 钩子
function useContextSelector<T, S>(
  Context: React.Context<ContextType<T>>,
  selector: (state: T) => S
): S {
  const context = useContext(Context);
  const latestSelector = useRef(selector);
  const latestSelectedValue = useRef<S>();

  latestSelector.current = selector;

  const subscribe = useCallback(
    (callback: () => void) => {
      const unsubscribe = context.subscribe(() => {
        const newSelectedValue = latestSelector.current(context.getState());
        if (newSelectedValue !== latestSelectedValue.current) {
          latestSelectedValue.current = newSelectedValue;
          callback();
        }
      });
      return unsubscribe;
    },
    [context]
  );

  const selectedValue = useSyncExternalStore(
    subscribe,
    () => latestSelector.current(context.getState()),
    () => latestSelector.current(context.getState())
  );

  return selectedValue;
}

// 创建 Provider 的函数
function createProvider<T>(
  initialState: T
): [React.FC<{ children: React.ReactNode }>, React.Context<ContextType<T>>] {
  const listeners = new Set<() => void>();
  let state = initialState;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const setState: React.Dispatch<React.SetStateAction<T>> = (newState) => {
    state =
      typeof newState === "function"
        ? (newState as (prevState: T) => T)(state)
        : newState;
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const Context = React.createContext<ContextType<T>>({
    getState,
    subscribe,
    setState,
  });

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Context.Provider value={{ getState, subscribe, setState }}>
      {children}
    </Context.Provider>
  );

  return [Provider, Context];
}

export { useContextSelector, createProvider };
