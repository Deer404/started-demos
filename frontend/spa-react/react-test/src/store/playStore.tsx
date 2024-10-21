// zustand store 存储一个 对象类型

import { create } from "zustand";

// 创建一个通用的获取数据的store工厂函数
export type MapBounds = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

type PlayState = {
  mapBounds: MapBounds | null;
  setMapBounds: (mapBounds: MapBounds) => void;
};

export const usePlayStore = create<PlayState>((set) => ({
  mapBounds: null,
  setMapBounds: (mapBounds) => set({ mapBounds }),
}));
