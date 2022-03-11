import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'nprogress/nprogress.css';

import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { Container } from '@material-ui/core';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { AuthProvider } from './contexts/JWTContext';
import { Loading } from './components/Loading/Loading';

import './index.scss';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    grecaptcha: any;
    recaptchaWidgetId: any;
  }
}

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <BrowserRouter>
                <Suspense fallback={(
                  <Container
                    maxWidth="lg"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80vh',
                    }}
                  >
                    <Loading size={80} />
                  </Container>
                )}
                >
                  <App />
                </Suspense>
              </BrowserRouter>
            </LocalizationProvider>
          </StyledEngineProvider>
        </AuthProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
