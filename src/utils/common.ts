export const debounce = (fn: Function, wait = 50, immediate = false) => {
  let timer: number;
  return function(this: Function) {
    if(immediate) {
      fn.apply(this, arguments);
    }
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait)
  }
}

export const tempCovert = (k: number, digits = 0) => {
  return (k - 273.15).toFixed(digits)
}
