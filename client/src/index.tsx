import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'sanitize.css/sanitize.css';
import '@/locales/i18n';

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { Provider } from 'react-redux';
import { App } from '@/app';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from '@/store/configureStore';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { KolivadsApiUrl } from '@/utils/api';
import reportWebVitals from '@/reportWebVitals';
import * as Theme from '@/styles/theme';

window['modules'] = {
  Theme,
};

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const apolloClient = new ApolloClient({
  uri: KolivadsApiUrl,
  cache: new InMemoryCache(),
});

ReactDOMClient.createRoot(MOUNT_NODE!).render(
  <Provider store={store}>
    <HelmetProvider>
      {/* <React.StrictMode> */}
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      {/* </React.StrictMode> */}
    </HelmetProvider>
  </Provider>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
