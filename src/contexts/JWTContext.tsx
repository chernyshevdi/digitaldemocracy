import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import axios from '../lib/axios';
import type { User } from '../types/user';
import { userActionCreators } from '../slices/userSlice';
import { getItem } from '../lib/localStorageManager';
import { useFetchUserData } from '../pages/ProfilePage/hooks/useFetchUserData';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends State {
  platform: 'JWT';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type RegisterAction = {
  type: 'REGISTER';
  payload: {
    user: User;
  };
};

type Action =
  | InitializeAction
  | LoginAction
  | LogoutAction
  | RegisterAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
  } else {
    localStorage.removeItem('token');
  }
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setIsAuthenticated } = userActionCreators();
  const { fetch: fetchUserData } = useFetchUserData();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const accessToken = getItem('token');

        if (accessToken) {
          setSession(accessToken);
          setIsAuthenticated(true);
          fetchUserData();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await axios.post<{ accessToken: string; user: User }>('/api/authentication/login', {
      email,
      password
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const logout = async (): Promise<void> => {
    setSession(null);
    setIsAuthenticated(false);
  };

  const register = async (
    email: string,
    name: string,
    password: string
  ): Promise<void> => {
    const response = await axios.post<{ accessToken: string; user: User }>(
      '/api/authentication/register',
      {
        email,
        name,
        password
      }
    );
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
