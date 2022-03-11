import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { experimentalStyled } from '@material-ui/core/styles';
import { userSelectors } from '../slices/userSlice';
import Footer from './Footer/Footer';
import MainNavbar from './MainNavbar';
import AuthModal from './widgets/modals/AuthModal/AuthModal';
import { useWindowSize } from '../hooks/useWindowSize';
import { Search } from './Search/Search';
import { SuggestButton } from './SuggestButton/SuggestButton';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  paddingTop: 64,
}));

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isMobile } = useWindowSize();
  const { location: { pathname } } = useHistory();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  return (
    <MainLayoutRoot
      style={{ background: 'white', paddingBottom: isMobile ? 80 : 0, paddingTop: isMobile ? '88px' : '90px' }}
    >
      <MainNavbar />
      {!isMobile && <Search />}
      <AuthModal />
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

export default MainLayout;
