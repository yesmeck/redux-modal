import { Action, Store } from 'redux';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ReduxContext {
  store: Store<any>;
}

export interface ModalAction extends Action {
  payload?: {
    modal: string;
    props?: any;
  };
}

export type ReduxModalState = {
  [name: string]: ModalState;
};

export type ModalState = {
  show?: boolean;
  props?: any;
};

export interface ResolveParameter {
  props: any;
}

export interface ModalConfig {
  name: string;
  resolve?: (parameter: ResolveParameter) => any;
  getModalState?: (state: any) => ModalState;
  destroyOnHide?: boolean;
}

export interface InjectedProps {
  show: boolean;
  handleHide: () => void;
  handleDestroy: () => void;
}

export interface ConnectModalProps {
  hide: (name: string) => ModalAction;
  show: (name: string) => ModalAction;
  destroy: (name: string) => ModalAction;
  modal: ModalState;
}

export interface ConnectModalState {
  show?: boolean;
}

export interface InjectedWrapperComponent {
  <P extends InjectedProps>(
    component: React.ComponentType<P>
  ): React.ComponentClass<Omit<P, keyof InjectedProps> & any>;
}
