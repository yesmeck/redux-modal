import * as React from 'react';
import { connectModal, IModalConfig } from '../../index';

interface IDialogProps {
  handleHide: () => void;
  show: boolean;
  title: string
}

const Dialog: React.SFC<IDialogProps> = ({ title }) => (
  <p>{title}</p>
);


const WrappedDialog = ({ name }: IModalConfig) => {
  const OuterDialog = connectModal({ name })(Dialog);
  return <OuterDialog />;
}
