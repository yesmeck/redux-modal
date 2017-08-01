declare module "redux-modal" {
  import { Component } from "React";

  /**
   * Signature for modal action
   */
  interface IModalAction {
    /**
     * Redux type property
     */
    type: string;
    /**
     * Payload to update state
     */
    payload: {
      /**
       * The name of the modal
       */
      modal: string
    };
  }

  /**
   * Signature for the show modal action
   */
  interface IShowAction extends IModalAction {
    /**
     * Payload to update state
     */
    payload: {
      /**
       * The name of the modal
       */
      modal: string,
      /**
       * Props to pass to component
       */
      props: any
    };
  }

  /**
   * The show modal action creator
   * @param {string} modal The name of modal to show
   * @param {any} props Props pass to your modal
   * @return {IShowAction}
   */
  function show(modal: string, props: any): IShowAction;

  /**
   * The hide modal action creator
   * @param {string} modal The name of the modal to hide
   * @return {IShowAction}
   */
  function hide(modal: string):IShowAction;

  /**
   * Removes a modal from state
   * @param {string} modal The name of the modal to delete
   * @return {IShowAction}
   */
  function destroy(modal: string):IShowAction;

  /**
   * The modal reducer. Should be given to mounted to your Redux state at modal
   * @param {any} state Previous state
   * @param {IShowAction} action Action describing changes in the modal state
   * @return {any} The new state
   */
  function reducer(state: any, action: IShowAction):any;

  /**
   * Connect a modal component to redux store
   * @param {string} name The name of the modal
   * @param {function} resolve Things you want to resolve before show your modal, 
   * if return a promise, the modal will show after the promise resolved
   * @param {boolean} destroyOnHide Weather destroy the modal state and umount 
   * the modal after hide, default is true
   * @return {Component} A React component class that injects modal state and
   * handleHide action creator into your modal component
   */
  function connectModal(name: string, resolve: () => any, destroyOnHide: boolean): Component
}