import styled from 'styled-components'

interface ICircle {
  color: string
}

export const Wrapper = styled.div`
  width: 200px;
  height: 50px;
  display: grid;
  place-items: center;
`

export const Circle = styled.div<ICircle>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color:  ${({ color }) => color} ;
  border: 2px solid gray;
`
