import React, { useReducer, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import classes from './Subscriptions.module.scss';
import { userSelectors } from '../../../../slices/userSlice';
import { useFetchSubscriptionsData } from './hooks/useFetchSubscriptionsData';
import SubscriptionCard from './SubscriptionCard/SubscriptionCard';
import { Loading } from '../../../../components/Loading/Loading';
import { APIStatus } from '../../../../lib/axiosAPI';

interface IState {
  activeType: string;
  data: Array<IDataState>;
}

export enum TypeSubscribe {
  POLITICIANS = 'politicians',
  MEDIAS = 'medias',
  AUTHORS = 'authors',
}

interface IDataState {
  id: number;
  title: string;
  active: boolean;
  type: TypeSubscribe;
}

const initialState = (t): IState => {
  return {
    activeType: 'politicians',
    data: [
      { id: 1, title: t('tabs.politicians'), active: true, type: TypeSubscribe.POLITICIANS },
      { id: 2, title: t('tabs.massMedia'), active: false, type: TypeSubscribe.MEDIAS },
      { id: 3, title: t('tabs.authors'), active: false, type: TypeSubscribe.AUTHORS },
    ],
  };
};

function reducer(state, action) {
  switch (action.type) {
    case 'setActive':
      return {
        ...state,
        activeType: action.payload.type,
        data: [...state.data].map((item) =>
          item.id === action.payload.id ? { ...item, active: true } : { ...item, active: false }
        ),
      };
    case 'changeTitle':
      return {
        ...state,
        data: [...state.data].map((item) => {
          if (TypeSubscribe.POLITICIANS === item.type) {
            return {
              ...item,
              title: action.payload.t('tabs.politicians'),
            };
          }
          if (TypeSubscribe.MEDIAS === item.type) {
            return {
              ...item,
              title: action.payload.t('tabs.massMedia'),
            };
          }
          if (TypeSubscribe.AUTHORS === item.type) {
            return {
              ...item,
              title: action.payload.t('tabs.authors'),
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export const Subscriptions = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [state, dispatch] = useReducer(reducer, initialState(t));
  const { fetch, status } = useFetchSubscriptionsData();
  const subscriptions = useSelector(userSelectors.getSubscriptions());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  useEffect(() => {
    fetch();
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch({ type: 'changeTitle', payload: { t } });
  }, [currentLang]);

  const setCards = () => {
    return state.find((item) => item.active === true).title;
  };
  return (
    <WrapperAsyncRequest status={status}>
      <div className={classes.root}>
        <div className={classes.buttons}>
          {state.data.map(({ id, title, active, type }) => {
            return (
              <Button
                key={id}
                className={active ? classes.buttonStyle : classes.buttonStyleActive}
                onClick={() => dispatch({ type: 'setActive', payload: { id, type } })}
              >
                {title}
              </Button>
            );
          })}
        </div>
        <div className={classes.party}>
          {status === APIStatus.Loading ? (
            <Loading />
          ) : (
            subscriptions[state.activeType]?.map((item) => (
              <SubscriptionCard key={item.id} type={state.activeType} {...item} />
            ))
          )}
        </div>
      </div>
    </WrapperAsyncRequest>
  );
};
