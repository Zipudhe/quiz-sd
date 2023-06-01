import styled, { keyframes } from 'styled-components'

interface IGraphic {
  percentage: number
}

export const Wrapper = styled.div`
  display: flex;
  aling-items: end;
  justify-content: space-evenly;
  height: 90%;
  width: 100%;
  place-items: end;
`

const slide = (height: number) => keyframes`
  from { height: 0 };
  to { height: ${height} }
`

export const Graphic = styled.div<IGraphic>`
  height: ${({ percentage }) => `${percentage}%`};
  width: 100%;
  max-width: 200px;
  background-color: purple;
  animation: ${({ percentage }) => slide(percentage)} 1.5s linear;

  > span {
    position: relative;
    top: -30px;
    left: calc(100% - 60%);
    color: white;
    font-weight: bold;
  }
`