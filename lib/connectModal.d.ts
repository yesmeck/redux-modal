import { ModalConfig, InjectedWrapperComponent } from './interface';
export default function connectModal({
  name,
  getModalState,
  resolve,
  destroyOnHide,
}: ModalConfig): InjectedWrapperComponent;
