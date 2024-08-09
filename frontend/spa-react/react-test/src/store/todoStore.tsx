import { create } from "zustand";

type TodoState = {
  todo: string[];
  addTodo: (todo: string) => void;
  getTodo: () => Promise<string[]>;
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTodo() {
  await sleep(1000);
  return ["todo1", "todo2", "todo3"];
}

// function useXX() {
//   return useQuery({
//     queryKey: ["todo"],
//     queryFn: () => fetchTodo(),
//   });
// }

export const useTodoStore = create<TodoState>((set) => ({
  todo: [],
  addTodo: (todo) => set((state) => ({ todo: [...state.todo, todo] })),
  getTodo: async () => await fetchTodo(),
}));
