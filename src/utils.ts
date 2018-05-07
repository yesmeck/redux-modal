export function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function isPromise(thing: any) {
  try {
    return typeof thing.then === "function";
  } catch (e) {
    return false;
  }
}

export function isUndefined(thing: any) {
  return typeof thing === "undefined";
}
