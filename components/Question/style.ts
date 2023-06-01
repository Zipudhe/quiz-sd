import styled from 'styled-components'

interface IOptions {
  checked: true
}

export const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  border: 1px solid gray;
  border-radius: 2px;
  display: grid;
  place-items: center;

  > h1 {
    color: white;
  }
`

export const Form = styled.form`
  height: 80%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

export const Text = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: justify;
  max-width: 80%;
`

export const QuestionOptions = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 10px;
  border: none;
`

export const Options = styled.input`
  height: 160px;
  width: 160px;
`
