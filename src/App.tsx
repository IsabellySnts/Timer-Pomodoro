import { Button } from "./components/Button/Button";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./styles/theme/default";

export function App() {

  return (
      <ThemeProvider theme={DefaultTheme}>
        <Button variant="primary" />
        <Button variant="secondary" />
        <Button variant="danger" />
        <Button variant="success" />
        <Button />
      </ThemeProvider>
    
  )
}


