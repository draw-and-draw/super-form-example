import { Textarea, TextareaProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import React from 'react';
import { CustomControllerProps } from '../../types';

type FeeTextareaProps<T extends FieldValues> = Omit<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement> & CustomControllerProps<T>,
  'value' | 'error' | 'onChange'
> & {
  onFieldChange?: (v: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const FeeTextarea = <T extends FieldValues>(props: FeeTextareaProps<T>) => {
  const defaultProps: Partial<FeeTextareaProps<T>> = {
    placeholder: '请输入',
  };
  const mergedProps = useComponentDefaultProps('FeeTextarea', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <Textarea
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

export default FeeTextarea;
