import { useRef, useState } from "react";

export function useGetState<T = any> (initVal: T): [T, (n: T) => void, () => T] {
  const [state, setState] = useState<T>(initVal);
  const ref = useRef(initVal);
  const _setState = (newVal: T) => {
    ref.current = newVal;
    setState(newVal)
  }
  const getState = () => {
    return ref.current;
  }
  return [state, _setState, getState];
}
