import { create } from "zustand";

// 创建一个通用的获取数据的store工厂函数
function createFetchStore<T>(fetchFunction: () => Promise<T[]>) {
  type FetchState = {
    data: T[];
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
  };

  return create<FetchState>((set) => ({
    data: [],
    loading: false,
    error: null,
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const result = await fetchFunction();
        set({ data: result, loading: false });
      } catch (error) {
        set({ error: (error as Error).message, loading: false });
      }
    },
  }));
}

// 使用示例
type Task = { id: number; title: string };
export const useTaskStore = createFetchStore<Task>(async () => {
  return [
    { id: 1, title: "任务1" },
    { id: 2, title: "任务2" },
  ];
});
