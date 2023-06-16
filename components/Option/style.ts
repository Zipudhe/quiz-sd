import styled from 'styled-components'

interface IOptionWrapper  {
  checked: boolean,
  answer: Number,
}

export const OptionWrapper = styled.div<IOptionWrapper>`
  height: fit-content;
  min-height: 160px;
  width: 160px;
  border-radius: 4px;
  background-color: ${({ checked, id, answer, tabIndex }) => {
    if(!checked) {
      return 'blue'
    }
    return answer == tabIndex ? 'green' : 'red';
  }};
  display: grid;
  place-items: center;
  padding: 10px;

  > input {
    opacity: 0;
  }

  > label {
    color: white;
    text-align: center;
    line-height: 150%;
    pointer-events: none;
  }

  :disabled {
    border: 1px solid gray;
  }
`

export const Input = styled.input``