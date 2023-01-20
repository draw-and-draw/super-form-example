import { TextInput, TextInputProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { CustomControllerProps } from '.';
import React from 'react';

type FeeTextInputProps<T extends FieldValues> = Omit<
  TextInputProps & React.RefAttributes<HTMLInputElement> & CustomControllerProps<T>,
  'value' | 'error' | 'onChange'
> & { onFieldChange?: (v: React.ChangeEvent<HTMLInputElement>) => void };

const FeeTextInput = <T extends FieldValues>(props: FeeTextInputProps<T>) => {
  const defaultProps: Partial<FeeTextInputProps<T>> = {
    placeholder: '请输入',
  };
  const mergedProps = useComponentDefaultProps('FeeTextInput', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
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

export default FeeTextInput;
