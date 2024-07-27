export const debounce = <F extends (...args: unknown[]) => unknown>(func: F, delay: number) => {
     let timer: NodeJS.Timeout;
     return (...args: Parameters<F>) => {
          clearTimeout(timer);
          timer = setTimeout(() => func(...args), delay);
     };
};
