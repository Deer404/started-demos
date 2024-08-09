import { useState } from "react";
import { sleep, useTodoStore } from "../../store/todoStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../libs/queryClient";
export default function TodoPage() {
  const todo = useTodoStore((state) => state.todo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const [inputValue, setInputValue] = useState<string>();

  useMutation({
    mutationFn: async (todo: string) => {
      sleep(2000);
      addTodo(todo);
    },
    onMutate: async (newTodo: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (old: string[]) => [...old, newTodo]);

      return { previousTodos };
    },
  });

  return (
    <>
      <h1>Todo Page</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          title="todo"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onChange={() => {
            if (inputValue) {
              addTodo(inputValue);
              setInputValue("");
            }
          }}
        >
          submit
        </button>
      </div>
      <ul>
        {todo.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
}
