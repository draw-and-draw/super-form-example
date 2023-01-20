import { PasswordInput, PasswordInputProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import React from 'react';
import { CustomControllerProps } from '.';

type FeePasswordInputProps<T extends FieldValues> = Omit<
  PasswordInputProps & React.RefAttributes<HTMLInputElement> & CustomControllerProps<T>,
  'value' | 'error' | 'onChange'
> & {
  onFieldChange?: (v: React.ChangeEvent<HTMLInputElement>) => void;
};

const FeePasswordInput = <T extends FieldValues>(props: FeePasswordInputProps<T>) => {
  const defaultProps: Partial<FeePasswordInputProps<T>> = {
    placeholder: '请输入',
  };
  const mergedProps = useComponentDefaultProps('FeePasswordInput', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <PasswordInput
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

export default FeePasswordInput;
