import React, { FC, Suspense, useEffect, useState } from 'react'
import { Form, Text, QuestionOptions } from './style'
import { useRouter } from 'next/router'

import Option from '../Option'

import { PostAnswer, Question, GetQuestion } from '../../api/Question'


type selectControl = {
  [x: string]: boolean
}

interface IQuestion {
  questao: Question
}

const Question: FC = () => {
  //@ts-ignore
  const [question, setQuestion] = useState<Question>({})
  const [disabled, setDisable] = useState(false)
  const { query: { session, id }, push } = useRouter()

  const defaultControl = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
  }
  
  /* `useEffect` is a React hook that allows you to perform side effects in function components. In
  this case, the `useEffect` hook is being used to fetch a question from the server using the
  `GetQuestion` function and update the `question` state with the fetched question using the
  `setQuestion` function. The `console.log` statement is used to log the answer of the fetched
  question to the console. The `useEffect` hook is also returning a cleanup function that sets the
  `disabled` state to `false`. The `useEffect` hook is triggered whenever the `id` dependency
  changes. */
  useEffect(() => {
    GetQuestion()
      .then((question) => {
        setQuestion(question)
        console.log(question.answer)
      })
      .catch(err => {
        console.error({ err })
      })

      return () => setDisable(false)
  }, [id])

  console.log({ answer: question.answer })

  const [selectControl, setSelectControl] = useState<selectControl>(defaultControl)
  /*
  `handleClick` is a function that is called when an option is clicked in the question form.
  It updates the `selectControl` state to mark the clicked option as selected and sends a POST
  request to the server with the selected option if the user is logged in. It also sets the
  `disabled` state to true to prevent further clicks until the question is changed. 
  */
 //@ts-ignore
  const handleClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id_clicked = e.target.id as string
    console.log({ answer: question.answer, id_clicked })
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

  //TODO Arrumar esquema de resposta de perguntas

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