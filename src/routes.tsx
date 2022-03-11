import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const NotFound = Loadable(lazy(() => import('./pages/NotFound')));

const Home = Loadable(lazy(() => import('./pages/Home')));
const SingleNews = Loadable(lazy(() => import('./pages/SingleNewsPage/SingleNewsPage')));

const routes = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/SingleNews',
        element: <SingleNews />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '*  ',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
