import { useEffect, useRef } from "react";
import { debounce } from "@/controller/debouncer.ts";

interface IProps {
  callback: () => void;
  debounceDelay?: number;
}

export default function useInfiniteScroll<T extends HTMLElement>({ callback, debounceDelay = 50 }: IProps) {
  const pageRef = useRef<T>(null);

  const debouncedCallback = debounce(callback, debounceDelay);
  const handleScroll = (element: T) => {
    if (element) {
      const scrollTop = element.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalHeight = element.scrollHeight;

      if (!(scrollTop + windowHeight + 1000 >= totalHeight)) {
        return;
      }
      debouncedCallback();
    }
  };

  useEffect(() => {
    const scrollElement = pageRef.current!;

    if (scrollElement) {
      scrollElement.addEventListener("scroll", () => handleScroll(scrollElement));
      return () => {
        scrollElement!.addEventListener("scroll", () => handleScroll(scrollElement));
      };
    }
  }, []);

  return {
    ref: pageRef,
  };
}
