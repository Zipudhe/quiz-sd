import React, { FC, MouseEventHandler, useState } from 'react'
import { Wrapper, Form, Text, GroupOptions } from './style'

import Option from '../Option'

type selectControl = {
  [x: string]: boolean
}

const GameWrapper: FC = () => {

  const defaultControl = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
  }
  
  const [selectControl, setSelectControl] = useState<selectControl>(defaultControl)
  //@ts-ignore
  const handleClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('clicked: ', e.target.id)
    setSelectControl((prevState) => {
      const id = e.target.id as string
      const updated = { ...defaultControl, [id]: true }
      return updated
    })
  }

  console.log({ selectControl })

  return (
    <>
      <Form id='control'>
        <Text>
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </Text>
        {/* TODO: Agrupar esses inputs em um componente só  */}
        <GroupOptions form='control' >
          <Option id='1' text={'Lorem Ipsum Lorem Ipsum'} checked={selectControl['1']} onClick={handleClick} form="control" />
          <Option id='2' text={'Lorem Ipsum Lorem Ipsum'} checked={selectControl['2']} onClick={handleClick} form="control" />
          <Option id='3' text={'Lorem Ipsum Lorem Ipsum'} checked={selectControl['3']} onClick={handleClick} form="control" />
          <Option id='4' text={'Lorem Ipsum Lorem Ipsum'} checked={selectControl['4']} onClick={handleClick} form="control" />
        </GroupOptions>
      </Form>
    </>
  )
}

export default GameWrapper