import { useCallback, useRef } from 'react';

export const useDebounce = (callback: Function, delay: number) => {
    const timer = useRef<NodeJS.Timer | null>(null);

    const debouncedWrapper = useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    const cancelDebounce = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    return { debouncedWrapper, cancelDebounce };
};
