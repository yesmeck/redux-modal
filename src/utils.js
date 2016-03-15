export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function isPromise(thing) {
  return typeof thing.then === 'function'
}

export function isUndefined(thing) {
  return typeof thing === 'undefined'
}

