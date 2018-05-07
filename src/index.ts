import * as actions from "./actions";
import reducer from "./reducer";
import connectModal from "./connectModal";
import * as interfaces from './interface';

export default {
  ...interfaces,
  ...actions,
  reducer,
  connectModal,
};