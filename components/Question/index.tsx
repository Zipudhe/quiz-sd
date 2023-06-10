import React, { FC, useContext, useState } from 'react'
import { Form, Text, QuestionOptions } from './style'
import { useRouter } from 'next/router'

import Option from '../Option'

import { PostAnswer, Question } from '../../api/Question'


type selectControl = {
  [x: string]: boolean
}

interface IQuestion {
  questao: Question
}

const Question: FC<IQuestion> = ({ questao }) => {
  const { answer, options, statment } = questao
  const [disabled, setDisable] = useState(false)
  const { query: { session, id } } = useRouter()

  const defaultControl = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
  }
  
  const [selectControl, setSelectControl] = useState<selectControl>(defaultControl)
  //@ts-ignore
  const handleClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id_clicked = e.target.id as string
    console.log({ id_clicked })
    setDisable(true)
    if(!disabled) {
      setSelectControl((prevState) => {
        const updated = { ...defaultControl, [id_clicked]: true }
        return updated
      })

      if(session && id) {
        console.log('should post answer')
        PostAnswer(id_clicked, session as string, id as string)
          .then(res => {
            console.log('OK')
          })
          .catch(err => {
            console.error('failed to send answer')
          })
      }
    }
  }


  return (
    <>
      <Form id='control'>
        <Text>
          { statment }
        </Text>
        {/* TODO: Agrupar esses inputs em um componente só  */}
        <QuestionOptions form='control' >
          {
            options && options.map((opcao, index) => <Option disabled={disabled} key={index} id={`${index}`} text={opcao} checked={selectControl[index.toString()]} onClick={handleClick} form="control" />)
          }          
        </QuestionOptions>
      </Form>
    </>
  )
}

export default Question