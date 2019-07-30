export function resolvable () {
  let _resolve;
  const promise = new Promise(resolve => _resolve = resolve);
  promise.resolve = () => _resolve();
  return promise;
}

