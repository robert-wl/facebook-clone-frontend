import { debounce } from "@/utils/debouncer.ts";

type Callback = ((...args: any[]) => any) | (() => void);

export default function useDebounce(func: Callback, time: number) {
  return debounce(func, time);
}
