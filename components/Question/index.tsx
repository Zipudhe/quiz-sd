import React, { FC, Suspense, useEffect, useState } from 'react'
import { Form, Text, QuestionOptions } from './style'
import { useRouter } from 'next/router'

import Option from '../Option'

import { PostAnswer, Question, GetQuestion } from '../../api/Question'


type selectControl = {
  [x: string]: boolean
}

export type MyQuestion = Question & {
  serverTime: number
}

interface IQuestion {
  question?: MyQuestion,
}

const Question: FC<IQuestion> = ({ question }) => {
  const defaultControl = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
  }
  const [disabled, setDisable] = useState(false)
  const [selectControl, setSelectControl] = useState<selectControl>(defaultControl)

  const { query: { session, id } } = useRouter()


  if(!question) {
    return (<h1 style={{ color: 'white' }} > Formulando pergunta.... </h1> )
  }
  
  /*
  `handleClick` is a function that is called when an option is clicked in the question form.
  It updates the `selectControl` state to mark the clicked option as selected and sends a POST
  request to the server with the selected option if the user is logged in. It also sets the
  `disabled` state to true to prevent further clicks until the question is changed. 
  */
 //@ts-ignore
  const handleClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id_clicked = Number.parseInt(e.target.id) as number

    const anwserData = {
      correct: question.answer == id_clicked + 1,
      session: session as string,
      question: id as string,
      user_id: localStorage.getItem('id')!,
      sentQuestionTime: question.serverTime,
    }


    setDisable(true)
    if(!disabled) {
      setSelectControl((prevState) => {
        const updated = { ...defaultControl, [id_clicked]: true }
        return updated
      })

      if(session && id) {
        PostAnswer(anwserData)
          .then(res => {
            console.log('OK')
          })
          .catch(err => {
            console.error('failed to send answer')
          })
      }
    }
  }

  //TODO Arrumar esquema de resposta de perguntas
  if(!question) {
    return (
      <h1>
        Loading Question
      </h1>
    )
  }

  return (
    <Suspense fallback={<h1 style={{ color: 'white' }} > Loading... </h1> } >
      <Form id='control'>
        <Text>
          { question.statment }
        </Text>
        <QuestionOptions form='control' >
          {
            question.options && question.options.map((opcao, index) => {
              const id = index + 1
              return (
                <Option 
                  form="control"
                  disabled={disabled}
                  answer={question.answer}
                  key={index}
                  id={`${index}`}
                  tabIndex={id}
                  text={opcao}
                  checked={selectControl[index.toString()]}
                  onClick={handleClick}
                />
              )
            })
          }          
        </QuestionOptions>
      </Form>
    </Suspense>
  )
}

export default Question