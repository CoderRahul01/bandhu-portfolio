declare module "next" {
  export type {
    Metadata,
    MetadataRoute,
    ResolvingMetadata,
    ResolvingViewport,
    Viewport,
  } from "next/dist/types";
  export type { NextConfig } from "next/dist/server/config-shared";
}

declare module "next/link" {
  import type { ComponentType, ReactNode } from "react";

  export type LinkProps = {
    href: string | URL;
    children?: ReactNode;
    className?: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
    target?: string;
    rel?: string;
    [key: string]: unknown;
  };

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module "next/image" {
  import type { ComponentType } from "react";

  export type ImageLoaderProps = {
    src: string;
    width: number;
    quality?: number;
  };

  export type ImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    className?: string;
    loader?: (props: ImageLoaderProps) => string;
    onLoad?: () => void;
    [key: string]: unknown;
  };

  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module "next/navigation" {
  export function notFound(): never;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module "next/headers" {
  export function cookies(): Promise<{
    get(name: string): { value: string } | undefined;
    set(name: string, value: string, options?: Record<string, unknown>): void;
    delete(name: string): void;
  }>;
}

declare module "next/script" {
  import type { ComponentType, ScriptHTMLAttributes } from "react";

  type ScriptProps = ScriptHTMLAttributes<HTMLScriptElement> & {
    id?: string;
    strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker";
  };

  const Script: ComponentType<ScriptProps>;
  export default Script;
}

declare module "next/font/google" {
  export function Inter(options: {
    subsets?: string[];
    variable?: string;
    display?: string;
    weight?: string | string[];
  }): {
    className: string;
    variable: string;
    style: {
      fontFamily: string;
    };
  };
}
