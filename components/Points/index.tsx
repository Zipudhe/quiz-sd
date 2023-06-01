import React, { FC } from 'react'
import { Wrapper, Graphic } from './style'

type PlayersPoints = {
  [id: string]: number
}

interface IPoints {
  data: PlayersPoints
}

const Points: FC<IPoints> = ({ data }) => {

  return (
    <>
      <h1 style={{ marginTop: "50px" }} > Pontuação </h1>
      <Wrapper>
        {
          Object.keys(data).map((key, index) => {
            return (
              <Graphic key={index} percentage={data[key]/10}>
                <span> {data[key]} </span>
              </Graphic>
            )
          })
        }
      </Wrapper>
    </>
  )
}

export default Points