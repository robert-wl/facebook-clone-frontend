type FunctionType = ((...args: unknown[]) => unknown) | (() => void);

export const debounce = <F extends FunctionType>(func: F, delay: number) => {
  let timer: NodeJS.Timeout;
  return async (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
