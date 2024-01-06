//este arquivo contem apenas código de tipagem
import 'styled-components'
import { DefaultTheme } from '../styles/theme/default'

//Guardando em themeType as propriedades de defaultTheme
type ThemeType = typeof DefaultTheme;

//criando uma tipagem para o styled-components 
declare module 'styled-components'{
    export interface DefaultTheme extends ThemeType{};
}