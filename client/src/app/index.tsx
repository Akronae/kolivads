import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '@/styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { ThemeManager, ThemeProperties } from '@/styles/theme';
import { useReducer } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProperties {}
}

export function App(props: any) {
  const { i18n } = useTranslation();
  const [theme, setTheme] = React.useState<ThemeProperties>(
    ThemeManager.current,
  );
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  ThemeManager.setTheme = setTheme;
  window.addEventListener('resize', forceUpdate);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Kolivads"
        defaultTitle="Kolivads"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Manage your real estate ads!" />
      </Helmet>

      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
