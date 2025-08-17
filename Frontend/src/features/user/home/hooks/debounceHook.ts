import { useRef, useCallback, useEffect } from "react";

function useDebounce<T>(cb: (arg: T) => void, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedFn = useCallback(
        (arg: T) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                cb(arg);
            }, delay);
        },
        [cb, delay]
    );

    // cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedFn;
}

export default useDebounce;
