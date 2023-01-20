// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { UserProvider } from './contexts/user';
import { CartProvider } from './contexts/cart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </CartProvider>
    </UserProvider>
  );
}
