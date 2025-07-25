import { HTMLChakraProps, ListCollection } from '@chakra-ui/react';
import React, { HTMLInputTypeAttribute } from 'react';

interface TextInputProps extends HTMLChakraProps<'input'> {
  name: string;
  label?: string;
  required?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  infoMessage?: string;
  helperMessage?: string;
  useFullAmountMask?: boolean;
  rightAccessory?: React.ReactNode;
  leftAccessory?: React.ReactNode;
  type?: HTMLInputTypeAttribute | undefined;
  accept?: string;
  validate?: any;
  useMask?: boolean;
  maskVisibleCount?: number;
  maskChar?: string;
  customRadius?: number;
  height?: string | number;
  toolTipInfo?: string;
  isLoading?: boolean;
  onChangeFunction?: any;
}

interface FormTextAreaProps extends TextInputProps {
  minHeight?: string;
  autoresize?: boolean;
}

interface FullSelectProps {
  name: string;
  label?: string;
  listItems: ListCollection<unknown> | any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<any>;
  placeholder?: string;
  isDisabled?: boolean;
  isMultiSelect?: boolean;
  onChangeFunc?: (data: any) => void;
  infoMessage?: string;
  variant?: 'outline' | 'subtle';
  validate?: any;
  required?: boolean;
  width?: string;
  customRenderSelected?: (selectedItems: any[]) => React.ReactNode;
  isClearable?: boolean;
  showDropdownIcon?: boolean;
  toolTipInfo?: string;
  isLoading?: boolean;
  ref?: any | undefined;
}
interface DefaultProps extends TextInputProps {
  isNumber?: boolean;
  min: number;
  max: number;
}

interface CheckBoxProps extends HTMLChakraProps<'label'> {
  name: string;
  label?: string | React.ReactNode;
  validate?: any;
  itemsPerRow?: number;
  size?: 'sm' | 'md' | 'lg';
  items?: {
    name?: string;
    value?: string;
  }[];
}

interface SwitchProps extends HTMLChakraProps<'switch'> {
  name: string;
  label?: string;
  validate?: any;
  reverse?: boolean;
  description?: string;
  isLoading?: boolean;
}

interface FormColorPickerProps extends TextInputProps {}

interface FormDatePickerFieldProps extends TextInputProps {
  mode: 'single' | 'range';
}

interface TimeInputProps extends TextInputProps {
  variant?: 'outline' | 'subtle' | 'plain';
}
interface OtpInputProps extends TextInputProps {
  count?: number;
  attached?: boolean;
}

export type {
  TextInputProps,
  FormTextAreaProps,
  FullSelectProps,
  DefaultProps,
  CheckBoxProps,
  SwitchProps,
  FormColorPickerProps,
  FormDatePickerFieldProps,
  TimeInputProps,
  OtpInputProps,
};
