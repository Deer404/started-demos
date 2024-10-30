import { createProvider, useContextSelector } from "@/libs/useContextSelector";
import { createContext, useContext } from "react";
interface AppState {
  count: number;
  text: string;
}

const [MyProvider, MyContext] = createProvider<AppState>({
  count: 0,
  text: "Hello",
});

export const ContextPage: React.FC = () => {
  return (
    <MyProvider>
      <Counter />
      <TextDisplay />
    </MyProvider>
  );
};

const Counter: React.FC = () => {
  const count = useContextSelector(MyContext, (state) => state.count);
  const { setState } = useContext(MyContext);

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() =>
          setState((state) => ({ ...state, count: state.count + 1 }))
        }
      >
        Increment
      </button>
    </div>
  );
};

const TextDisplay: React.FC = () => {
  console.log("TextDisplay render");
  const text = useContextSelector(MyContext, (state) => state.text);

  return <p>Text: {text}</p>;
};

export default ContextPage;
