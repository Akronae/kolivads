import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    transition: all 0.2s ease-in-out;
  }

  :root {
    color-scheme: ${props => props.theme.colorScheme};
  }
  ::selection {
    background: ${p => p.theme.selectionColor};
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    background-color: ${p => p.theme.backgroundColor};
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: ${p => p.theme.textColor};
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
    color: ${p => p.theme.accentColor};
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
