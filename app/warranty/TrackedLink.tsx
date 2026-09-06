"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** 事件名稱，例：warranty_cta */
  event: string;
  /** 事件屬性，例：{ name: "register", page: "landing" } */
  props?: Record<string, string>;
  children: ReactNode;
};

/** 帶 Vercel Analytics 事件的連結；分析失敗不影響導頁。 */
export default function TrackedLink({ event, props, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        try {
          track(event, props);
        } catch {
          // analytics 不可用時靜默
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
