import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '@/styles/global-styles';

import { HomePage } from '@/app/pages/HomePage/Loadable';
import { NotFoundPage } from '@/app/components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeManager, ThemeProperties, ZIndex } from '@/styles/theme';
import { useReducer } from 'react';
import { Div } from '@/app/components/Div';
import { isDarkTheme } from '@/utils/deviceUtils';
import { AppManager } from '@/app/AppManager';
import { ViewProperty } from '@/app/pages/ViewProperty/Loadable';

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
          <Route path="/property/:id" component={ViewProperty} />
          <Route path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <ModalShadow
          showIf={AppManager.showShadow}
          onClick={AppManager.showShadowOnClick}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}

const ModalShadow = styled(Div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: ${ZIndex.ModalShadow};

  :root {
    color-scheme: ${isDarkTheme() ? 'dark' : 'light'};
  }
`;
