declare module "redux-modal" {
  import { Component } from "React";

  interface IModalAction {
    type: string;
    payload: {
      modal: any
    };
  }

  interface IShowAction extends IModalAction {
    payload: {
      modal: any,
      props: any
    };
  }

  /**
   * Shows a modal
   * @param {any} modal Modal component
   * @param {any} props React props to pass to the modal component
   * @return {IShowAction}
   */
  function show(modal: any, props: any): IShowAction;

  /**
   * Hides a modal from view
   * @param {any} modal Modal component
   * @return {IShowAction}
   */
  function hide(modal: any):IShowAction;

  /**
   * Removes a modal from state
   * @param modal Disposes the modal
   * @return {IShowAction}
   */
  function destroy(modal: any):IShowAction;

  /**
   * Updates the state with a new one
   * @param {any} state Previous state
   * @param {IShowAction} action Action describing changes in the modal state
   * @return {any} The new state
   */
  function reducer(state: any, action: IShowAction):any;

  /**
   * Wraps a modal component inside connect call
   * @param {string} name The name of the modal
   * @param {function} resolve Resolver function
   * @param {boolean} destroyOnHide Boolean flag to indicate whether or not to destroy the
   * modal dialog on hide
   * @return {Component} React component HOC containing modal
   */
  function connectModal(name: string, resolve: () => any, destroyOnHide: boolean): Component
}