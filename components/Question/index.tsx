import React, { FC, MouseEventHandler, useState } from 'react'
import { Wrapper, Form, Text, QuestionOptions } from './style'

import Option from '../Option'

type selectControl = {
  [x: string]: boolean
}

type Option = {
  id: number,
  text: string
}

type Question = {
  statement: string,
  options: Option[]
}

const Question: FC<Question> = ({ statement, options }) => {

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

  return (
    <>
      <Form id='control'>
        <Text>
          { statement }
        </Text>
        {/* TODO: Agrupar esses inputs em um componente só  */}
        <QuestionOptions form='control' >
          {
            options.map((option, index) => <Option key={index} id={`${option.id}`} text={option.text} checked={selectControl[`${option.id}`]} onClick={handleClick} form="control" />)
          }          
          
        </QuestionOptions>
      </Form>
    </>
  )
}

export default Question