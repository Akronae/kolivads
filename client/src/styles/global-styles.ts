import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;900&display=swap');

  * {
    transition: all 0.2s ease-in-out;
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

  .opacity-0 {
    opacity: 0;
  }
`;
