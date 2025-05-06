import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #0b0c2a;
    color: white;
  }
  * {
    box-sizing: border-box;
  }
`

export default GlobalStyles
