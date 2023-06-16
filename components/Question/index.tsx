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