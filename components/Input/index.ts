import { styled } from 'styled-components'

export const Input = styled.input`
  border: none;
  border-radius: 2px;
  padding: 0px 5px;
  margin-left: 2px;

  &:focus {
    outline: 2px solid green;
  }
`

export default Input