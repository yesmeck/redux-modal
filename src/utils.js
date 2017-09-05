export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function isPromise(thing) {
  try {
    return typeof thing.then === "function";
  } catch (e) {
    return false;
  }
}

export function isUndefined(thing) {
  return typeof thing === "undefined";
}
