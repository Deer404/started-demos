"use client";

// 引入必要的React和自定义钩子函数
import {
  createContext,
  Dispatch, // 类型定义，用于描述Dispatch函数类型
  SetStateAction, // 类型定义，用于描述SetStateAction类型
  use, // 一个实验性钩子，用于访问Context的值
  useEffect, // 用于副作用处理
  useState, // 用于组件状态管理
} from "react";
import { useBrowserNativeTransitions } from "./useBrowserNativeTransitions"; // 引入自定义钩子，该钩子可能与浏览器过渡动画有关

type VoidCallback = () => void;

// 创建一个ViewTransitionsContext，默认值为一个空函数
const ViewTransitionsContext = createContext<
  Dispatch<SetStateAction<VoidCallback | null>>
>(() => {});

// 定义一个ViewTransitions组件，接受children作为参数并保证其只读
export function ViewTransitions({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 使用useState定义一个状态finishViewTransition，用于存储回调函数，初始值为null
  const [finishViewTransition, setFinishViewTransition] =
    useState<VoidCallback | null>(null);

  // 使用useEffect在finishViewTransition变化时执行
  useEffect(() => {
    // 如果finishViewTransition有值，则调用并重置为null
    if (finishViewTransition) {
      finishViewTransition();
      setFinishViewTransition(null);
    }
  }, [finishViewTransition]);

  // 调用自定义钩子，可能用于处理浏览器的原生过渡动画
  useBrowserNativeTransitions();

  // 返回一个Context.Provider，传递setFinishViewTransition函数作为value，并渲染子组件
  return (
    <ViewTransitionsContext.Provider value={setFinishViewTransition}>
      {children}
    </ViewTransitionsContext.Provider>
  );
}

// 定义一个自定义钩子，用于访问ViewTransitionsContext的值（即setFinishViewTransition函数）
export function useSetFinishViewTransition() {
  return use(ViewTransitionsContext); // 返回Context的值
}
