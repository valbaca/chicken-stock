/**
 * Metafunction that provides a function that when called, will only *actually*
 * call `fn` after no new for `timeout`ms
 */
export default function debounce(fn, timeout = 250) {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}
