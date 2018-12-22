export declare function show(
  modal: string,
  props?: {}
): {
  type: string;
  payload: {
    modal: string;
    props: {};
  };
};
export declare function hide(
  modal: string
): {
  type: string;
  payload: {
    modal: string;
  };
};
export declare function destroy(
  modal: string
): {
  type: string;
  payload: {
    modal: string;
  };
};
