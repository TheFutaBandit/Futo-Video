import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    type?: 'text' | 'email' | 'password' | 'number'
    inputType: 'select' | 'input' | 'textarea'
    options?: {value: string, label: string, id: string}[]
    label?: string
    placeholder: string
    register: UseFormRegister<any>
    name: string
    errors: FieldErrors<FieldValues>
    lines?: number
}

const FormGenerator= ({
    type,
    inputType,
    options,
    label,
    placeholder,
    register,
    name,
    errors,
    lines,
}: Props) => {
  return (
    switch(inputType) {
        case 'input' : 

        default : 
         break
    }
  )
}

export default FormGenerator