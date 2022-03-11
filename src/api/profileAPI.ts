import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';

const fetchProfile = (args) => {
  return callAPI({
    url: 'getUserForEditProfile',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });
};

const fetchGenders = (args) => {
  return callAPI({
    url: 'getGenders',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchReligions = (args) => {
  return callAPI({
    url: 'getReligions',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchEducations = (args) => {
  return callAPI({
    url: 'getEducations',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchPoliticalViews = (args) => {
  return callAPI({
    url: 'getPoliticalViews',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchCountries = (args) => {
  return callAPI({
    url: 'getCountries',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
    nestedResponseType: false,
  });
};

const fetchRegions = (args) => {
  return callAPI({
    url: 'getRegions',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      params: args.payload.params,
    },
    ...args,
    nestedResponseType: false,
  });
};

const fetchCities = (args) => {
  return callAPI({
    url: 'getCities',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      params: args.payload.params,
    },
    ...args,
    nestedResponseType: false,
  });
};

const fetchEditData = (args) => {
  return callAPI({
    url: 'editMainInfoUser',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const checkAttachPhone = (args) => {
  return callAPI({
    url: 'checkAttachPhone',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const attachPhone = (args) => {
  return callAPI({
    url: 'attachPhone',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const checkAttachEmail = (args) => {
  return callAPI({
    url: 'checkAttachEmail',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const checkAttachEmailConfirmationCode = (args) => {
  return callAPI({
    url: 'checkAttachEmailConfirmationCode',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const attachEmailSetPassword = (args) => {
  return callAPI({
    url: 'attachEmailSetPassword',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const editUserAvatar = (args) => {
  return callAPI({
    url: 'editUserAvatar',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const attachGoogle = (args) => {
  return callAPI({
    url: 'attachGoogle',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const detachGoogle = (args) => {
  return callAPI({
    url: 'detachGoogle',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const attachYandex = (args) => {
  return callAPI({
    url: 'attachYandex',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const detachYandex = (args) => {
  return callAPI({
    url: 'detachYandex',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const APIs = {
  fetchProfile,
  fetchGenders,
  fetchReligions,
  fetchEducations,
  fetchPoliticalViews,
  fetchCountries,
  fetchRegions,
  fetchCities,
  fetchEditData,
  checkAttachPhone,
  attachPhone,
  checkAttachEmail,
  checkAttachEmailConfirmationCode,
  attachEmailSetPassword,
  editUserAvatar,
  attachGoogle,
  detachGoogle,
  attachYandex,
  detachYandex
};

export const profileAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
