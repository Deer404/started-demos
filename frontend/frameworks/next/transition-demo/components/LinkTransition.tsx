"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent } from "react";

// 为 startViewTransition 定义一个接口
interface ViewTransition {
  startViewTransition?: (callbck: () => void) => void;
}

// 扩展 Document 接口以包含 startViewTransition
interface DocumentWithViewTransition extends Document, ViewTransition {}

interface LinkTransitionProps extends LinkProps {
  children: React.ReactNode;
  href: string;

  className?: string;
}

// @deprecated
function LinkTransition({ children, href, ...props }: LinkTransitionProps) {
  const router = useRouter();
  const handleClick = (e: MouseEvent) => {
    const doc = document as DocumentWithViewTransition;

    if (!doc.startViewTransition) {
      // 浏览器不支持视图过渡。继续默认行为。
      return;
    } else {
      // 浏览器支持视图过渡。动画化过渡。
      e.preventDefault();
      doc.startViewTransition(() => {
        router[props.replace ? "replace" : "push"](href, {
          scroll: props.scroll ?? true,
        });
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div>{children}</div>
    </Link>
  );
}

export default LinkTransition;
