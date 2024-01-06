import { Button } from "./components/Button/Button";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";

export function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />

      <GlobalStyle />
    </ThemeProvider>

  )
}


