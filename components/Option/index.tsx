import React, { AllHTMLAttributes, FC, useState } from 'react'
import { OptionWrapper, Input } from './style'

interface IOption extends AllHTMLAttributes<HTMLDivElement> {
  checked?: boolean,
  text: string
}

const Option: FC<IOption> = ({ checked = false, text, ...props }) => {
  const { id, disabled } = props

  return (
    <OptionWrapper {...props} checked={checked} >
      <label  htmlFor={id}>
        {text}
      </label>
      <Input id={id} disabled={disabled} type={'checkbox'} defaultChecked={checked} />
    </OptionWrapper>
  )
}

export default Option