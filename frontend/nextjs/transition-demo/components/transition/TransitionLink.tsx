"use client"; // 指定这是一个客户端代码
import NextLink from "next/link"; // 引入Next.js的Link组件
import { useRouter } from "next/navigation"; // 引入Next.js的useRouter钩子，用于导航
import { startTransition, useCallback } from "react"; // 从react中导入startTransition和useCallback方法
import { useSetFinishViewTransition } from "./TransitionView"; // 引入自定义hook，用于完成视图过渡

// 从下列GitHub地址中复制过来的代码
// https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement; // 获取事件目标并断言其类型
  const target = eventTarget.getAttribute("target"); // 获取target属性
  return (
    (target && target !== "_self") || // 检查target属性是否被修改
    event.metaKey || // 检查meta键是否按下
    event.ctrlKey || // 检查ctrl键是否按下
    event.shiftKey || // 检查shift键是否按下
    event.altKey || // 检查alt键是否按下（会触发资源下载）
    (event.nativeEvent && event.nativeEvent.which === 2) // 检查中键点击
  );
}

// 从下列GitHub地址中复制过来的代码
// https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L204-L217
function shouldPreserveDefault(
  e: React.MouseEvent<HTMLAnchorElement>
): boolean {
  const { nodeName } = e.currentTarget; // 获取事件目标的节点名称

  // 检查节点名称是否为"A"
  const isAnchorNodeName = nodeName.toUpperCase() === "A";

  if (isAnchorNodeName && isModifiedEvent(e)) {
    // 如果是带有修饰键的点击，则返回true不阻止浏览器默认行为
    return true;
  }

  return false; // 否则返回false，阻止默认行为
}

// 这是一个包装了next/link组件的自定义组件，用于显式使用router API进行导航，并触发视图过渡
export function TransitionLink(props: React.ComponentProps<typeof NextLink>) {
  const router = useRouter(); // 获取路由对象
  const finishViewTransition = useSetFinishViewTransition(); // 获取完成视图过渡的方法

  const { href, as, replace, scroll } = props; // 从props中解构出必要的属性
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e); // 如果props中有onClick方法，则调用它
      }

      if ("startViewTransition" in document) {
        if (shouldPreserveDefault(e)) {
          return; // 如果应保留默认行为，则退出
        }

        e.preventDefault(); // 阻止默认点击行为

        // @ts-ignore
        document.startViewTransition(
          // 启动视图过渡
          () =>
            new Promise<void>((resolve) => {
              startTransition(() => {
                // 从下列GitHub地址中复制过来的代码
                // https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L231-L233
                router[replace ? "replace" : "push"](href as any, {
                  scroll: scroll ?? true, // 默认滚动到顶部
                });
                finishViewTransition(() => resolve); // 完成视图过渡后，执行resolve
              });
            })
        );
      }
    },
    [props, router, replace, href, scroll, finishViewTransition] // 依赖项数组
  );

  return <NextLink {...props} onClick={onClick} />; // 返回经过自定义onClick方法处理的NextLink组件
}
