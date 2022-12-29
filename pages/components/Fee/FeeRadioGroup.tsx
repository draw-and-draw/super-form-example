import { Radio, RadioGroupProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { CustomControllerProps } from '../Fee.type';
import React from 'react';

type FeeRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupProps &
    React.RefAttributes<HTMLInputElement> & {
      onFieldChange?: (v: string | null) => void;
      data: { value: string; label: string }[];
    },
  'value' | 'error' | 'onChange'
> &
  CustomControllerProps<T>;

const FeeRadioGroup = <T extends FieldValues>(props: FeeRadioGroupProps<T>) => {
  const defaultProps: Partial<FeeRadioGroupProps<T>> = {};
  const mergedProps = useComponentDefaultProps('FeeRadioGroup', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <Radio.Group
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
          error={fieldState.error?.message}>
          {mergedProps.data.map((item) => (
            <Radio value={item.value} label={item.label} key={item.value} />
          ))}
        </Radio.Group>
      )}
    />
  );
};

export default FeeRadioGroup;
