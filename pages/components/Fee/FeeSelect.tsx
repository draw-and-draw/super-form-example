import { Select, SelectProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { CustomControllerProps } from '../../types';
import React from 'react';

type FeeSelectProps<T extends FieldValues> = Omit<
  SelectProps & React.RefAttributes<HTMLInputElement> & { onFieldChange?: (v: string | null) => void },
  'value' | 'error' | 'onChange'
> &
  CustomControllerProps<T>;

const FeeSelect = <T extends FieldValues>(props: FeeSelectProps<T>) => {
  const defaultProps: Partial<FeeSelectProps<T>> = {
    placeholder: '请选择',
    clearable: true,
  };
  const mergedProps = useComponentDefaultProps('FeeSelect', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
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

export default FeeSelect;
