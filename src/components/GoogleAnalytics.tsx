"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (!measurementId || typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      send_to: measurementId,
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [measurementId, pathname, searchParams]);

  return null;
}
