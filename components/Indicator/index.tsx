import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { Wrapper, Circle } from './style'

export type State = 'disconnected' | 'connected' | 'unanswared' | 'answared'

interface IIndicator extends HTMLAttributes<HTMLDivElement> {
  state: State,
}

const Indicator: FC<IIndicator> = ({ state, id, ...props }) => {

  const [color, setColor] = useState('')

  useEffect(() => {
    if(state == 'disconnected' || state == 'unanswared') {
      setColor('yellow')
    } else {
      setColor('#00ff00')
    }
  }, [state])

  return (
    <Wrapper {...props} key={id} >
      <Circle color={color} />
    </Wrapper>
  )
}

export default Indicator