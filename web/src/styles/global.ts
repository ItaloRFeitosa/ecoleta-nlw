import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: ${props => props.theme.colors.background};
  -webkit-font-smoothing: antialiased;
  color: ${props => props.theme.colors.text};
}

body, input, button {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  color: ${props => props.theme.colors.title};;
  font-family: Ubuntu;
}
`;
