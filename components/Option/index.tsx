import React, { AllHTMLAttributes, FC, useState } from 'react'
import { OptionWrapper, Input } from './style'

interface IOption extends AllHTMLAttributes<HTMLDivElement> {
  checked?: boolean,
  text: string,
  answer: number,
}

const Option: FC<IOption> = ({ checked = false, text, answer, ...props }) => {
  const { id, disabled } = props

  return (
    <OptionWrapper {...props} checked={checked} answer={answer} id={id} >
      <label htmlFor={id}>
        {text}
      </label>
      <Input id={id} disabled={disabled} type={'checkbox'} defaultChecked={checked} />
    </OptionWrapper>
  )
}

export default Option