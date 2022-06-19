import { useCallback, useEffect, useRef, useState } from "react"

export function useSafeState<T>(defaultValue: T): [T, (value: T | ((value: T) => T)) => void] {
    const [state, setState] = useState<T>(defaultValue);
    const isUnmountedRef = useRef<boolean>(false);

    useEffect(() => () => { isUnmountedRef.current = true }, []);

    const setter = useCallback((value: T | ((value: T) => T)) => !isUnmountedRef.current && setState(value), []);

    return [state, setter];
};
