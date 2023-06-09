import React, { createContext, FC, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'

import { State } from "../components/Indicator"

export type StateType = {
  [x: string]:  State
}

type StateProvider = [
  state: StateType,
  setState: React.Dispatch<React.SetStateAction<StateType>>
]

export const defaultState = {
  '1': 'connected',
  '2': 'disconnected',
  '3': 'disconnected',
  '4': 'disconnected'
} as StateType

export const StateContext = createContext<StateProvider>({}  as StateProvider)


const StateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  var state = useState<StateType>(defaultState)

  return (
    <StateContext.Provider value={state} >
      { children }
    </StateContext.Provider>
  )

}

export default StateProvider