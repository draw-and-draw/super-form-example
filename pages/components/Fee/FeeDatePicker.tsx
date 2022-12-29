import { TextInput, TextInputProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { CustomControllerProps } from '../../types';
import React from 'react';
import { DatePicker, DatePickerProps } from '@mantine/dates';

type FeeDatePickerProps<T extends FieldValues> = Omit<
DatePickerProps &
    React.RefAttributes<HTMLInputElement> & { onFieldChange?: (v: Date|null) => void },
  'value' | 'error' | 'onChange'
> &
  CustomControllerProps<T>;

const FeeDatePicker = <T extends FieldValues>(props: FeeDatePickerProps<T>) => {
  const defaultProps: Partial<FeeDatePickerProps<T>> = {
    placeholder: '请选择日期',
  };
  const mergedProps = useComponentDefaultProps('FeeDatePicker', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          {...mergedProps}
          value={field.value}
          onChange={(v) => {
            field.onChange(v);
            mergedProps.onFieldChange?.(v);
          }}
          onBlur={(e) => {
            field.onBlur();
            mergedProps.onBlur?.(e);
          }}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default FeeDatePicker;