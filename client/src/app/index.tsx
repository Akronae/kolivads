import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '@/styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeManager, ThemeProperties, ZIndex } from '@/styles/theme';
import { useReducer } from 'react';
import { Div } from './components/Div';
import { isDarkTheme } from '@/utils/deviceUtils';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProperties {}
}

export class AppManager {
  public static showShadow = false;
  public static setShowShadow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function App(props: any) {
  const { i18n } = useTranslation();
  const [theme, setTheme] = React.useState<ThemeProperties>(
    ThemeManager.current,
  );
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  ThemeManager.setTheme = setTheme;
  window.addEventListener('resize', forceUpdate);

  [AppManager.showShadow, AppManager.setShowShadow] = React.useState(
    false as boolean,
  );

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
        <AppShadow showIf={AppManager.showShadow} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

const AppShadow = styled(Div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: ${ZIndex.AppShadow};

  :root {
    color-scheme: ${isDarkTheme() ? 'dark' : 'light'};
  }
`;
