import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import newsActionCreators from '../../../slices/newsSlice1';

const creators = {
  ...newsActionCreators
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(creators, dispatch);
};
