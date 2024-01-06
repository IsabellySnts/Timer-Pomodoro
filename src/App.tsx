import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Route";
import { BrowserRouter } from "react-router-dom";

export function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>

  )
}


