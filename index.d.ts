/// <reference types="react" />
import { Action } from "redux";

type ComponentClass = React.ComponentClass;
type ComponentType<T> = React.ComponentType<T>;

/**
 * ModalState model, currently {any}
 */
export type ModalState = any;

/**
 * Signature for modal configuration
 */
interface IModalConfig {
  /**
   * The name of the modal
   * @param {string} name
   */
  name: string;
  /**
   * Things you want to resolve before show your modal,
   * if return a promise, the modal will show after the promise resolved
   * @param {function} resolve
   */
  resolve?: () => any;
  /**
   * A function that takes the entire Redux state and returns the state slice which
   * corresponds to where the redux-modal reducer was mounted. Defaults to assuming
   * that the reducer is mounted under the 'modal' key.
   * @param {function} getModalState
   */
  getModalState?: (state: any) => ModalState;
  /**
   * Weather destroy the modal state and umount the modal after hide, default is true
   * @param {boolean} destroyOnHide
   */
  destroyOnHide?: boolean;
}

/**
 * The show modal action creator
 * @param {string} modal The name of modal to show
 * @param {any} props Props pass to your modal
 * @return {IShowAction}
 */
export function show(modal: string, props: any): Action;

/**
 * The hide modal action creator
 * @param {string} modal The name of the modal to hide
 * @return {IShowAction}
 */
export function hide(modal: string): Action;

/**
 * Removes a modal from state
 * @param {string} modal The name of the modal to delete
 * @return {IShowAction}
 */
export function destroy(modal: string): Action;

/**
 * The modal reducer. Should be given to mounted to your Redux state at modal
 * @param {ModalState} state Previous state
 * @param {IShowAction} action Action describing changes in the modal state
 * @return {ModalState} The new state
 */
export function reducer(state: ModalState, action: Action): ModalState;

/**
 * Interface specification for properties which are injected by the `connectModal`
 * decorator.
 */
export interface IModalInjectedProps {
  /**
   * Boolean flag indicating whether the modal is showing or not
   *
   * @type {boolean}
   * @memberof IModalInjectedProps
   */
  show: boolean;
  /**
   * Function that hides the component when called
   *
   * @memberof IModalInjectedProps
   */
  handleHide: () => void;
}

interface InjectedWrapperComponent {
  <P extends IModalInjectedProps>(
      component: ComponentType<P>
  ): ComponentClass;
}

/**
 * Connect a modal component to redux store
 * @param {IModalConfig} config The modal configuration
 * @return {Component} A React component class that injects modal state and
 * handleHide action creator into your modal component
 */
export function connectModal<TOwnProps>(
    config: IModalConfig
): InjectedWrapperComponent;
