import { SHOW, HIDE, DESTROY } from "../src/actionTypes";
import reducer from "../src/reducer";

describe("reducer", () => {
  it("return the initial state", () => {
    expect(reducer()).toEqual({});
  });

  it("handle SHOW", () => {
    const action = {
      type: SHOW,
      payload: { modal: "foo", props: { bar: "bzz" } }
    };

    expect(reducer(undefined, action)).toEqual({
      foo: {
        show: true,
        props: {
          bar: "bzz"
        }
      }
    });
  });

  it("handle HIDE", () => {
    const prevState = {
      foo: {
        show: true,
        props: {
          bar: "bzz"
        }
      }
    };

    const action = { type: HIDE, payload: { modal: "foo" } };

    expect(reducer(prevState, action)).toEqual({
      foo: {
        show: false,
        props: {
          bar: "bzz"
        }
      }
    });
  });

  it("handle DESTROY", () => {
    const prevState = {
      foo: {
        show: true,
        props: {
          bar: "bzz"
        }
      }
    };

    const action = { type: DESTROY, payload: { modal: "foo" } };

    expect(reducer(prevState, action)).toEqual({ foo: undefined });
  });
});
