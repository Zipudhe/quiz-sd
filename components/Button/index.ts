import styled, { css } from 'styled-components'


const Button = styled.button<{id: string}>`
  padding: 30px 40px;
  border: none;
  border-radius: 8px;

  ${({ id }) => {
    if(id == 'start') {
      return css`
        background-color: purple;

        &:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      `
    }
  }}
`


export default Button