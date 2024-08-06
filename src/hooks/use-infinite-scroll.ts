import { RefObject, useEffect, useRef } from "react";
import { debounce } from "@/utils/debouncer.ts";

interface IProps<T> {
  callback: () => void;
  debounceDelay?: number;
  pageRef?: RefObject<T>;
}

export default function useInfiniteScroll<T extends HTMLElement>({ callback, debounceDelay = 50, pageRef: outerRef }: IProps<T>) {
  const pageRef = useRef<T>(null);

  const debouncedCallback = debounce(callback, debounceDelay!);
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
    const scrollElement = outerRef?.current ?? pageRef.current!;

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
