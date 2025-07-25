import { RadioGroup as ChakraRadioGroup } from '@chakra-ui/react'
import * as React from 'react'

export interface RadioProps extends ChakraRadioGroup.ItemProps {
  rootRef?: React.RefObject<HTMLDivElement | null>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const { children, inputProps, rootRef, ...rest } = props
  return (
    <ChakraRadioGroup.Item ref={rootRef} {...rest}>
      <ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
      <ChakraRadioGroup.ItemIndicator />
      {children && <ChakraRadioGroup.ItemText fontSize={'12px'}>{children}</ChakraRadioGroup.ItemText>}
    </ChakraRadioGroup.Item>
  )
})

export const RadioGroup = ChakraRadioGroup.Root
