import { callAPI } from 'src/lib/axiosAPI';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const fetchAboutTheSite = (args) => {
  return callAPI({
    url: 'getAboutTheSite',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};
const APIs = { fetchAboutTheSite };

export const AboutAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
