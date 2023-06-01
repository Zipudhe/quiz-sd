import styled from 'styled-components'

interface IOptionWrapper  {
  checked: boolean
}

export const OptionWrapper = styled.div<IOptionWrapper>`
  height: 160px;
  width: 160px;
  border-radius: 4px;
  background-color: ${({ checked }) => checked ? 'green' : 'blue'};
  display: grid;
  place-items: center;
  padding: 10px;

  > input {
    opacity: 0;
  }

  > label {
    color: white;
    text-align: justify;
  }
`

export const Input = styled.input``