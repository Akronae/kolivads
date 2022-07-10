import { createGlobalStyle } from 'styled-components';
import Theme from './theme';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;900&display=swap');

  ::selection {
    background: ${Theme.current.selectionColor};
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    background-color: ${Theme.current.backgroundColor};
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: ${Theme.current.textColor};
    font-family: Inter;
    font-weight: 400;
    line-height: 1.2;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  a, b {
    color: ${Theme.current.accentColor};
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
  }
`;
