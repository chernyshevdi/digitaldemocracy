import { userActionCreators } from 'src/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const setRoutes = ({ pathname, length, setRout }): void => {
  // const routerLength = useSelector((s: RootState) => s?.user?.routes?.length);
  // setRout({ length, path: pathname });
};

export default setRoutes;
