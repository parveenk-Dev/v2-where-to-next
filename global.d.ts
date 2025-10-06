declare global {
  interface Window {
    gtag: (arg1: string, arg2: string, options?: object) => void;
    semaphore?: {
      push: (args: any[]) => void;
    };
  }
}
export { };
