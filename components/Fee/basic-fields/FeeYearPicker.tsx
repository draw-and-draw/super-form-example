import { useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import React from 'react';
import { CustomControllerProps } from '../Fee.type';
import { DatePicker, DatePickerProps } from '@capture/core';

type FeeYearPickerProps<T extends FieldValues> = Omit<
  DatePickerProps & React.RefAttributes<HTMLInputElement> & CustomControllerProps<T>,
  'value' | 'error' | 'onChange'
> & { onFieldChange?: (v: number | null) => void; label?: string; disabled?: boolean };

const FeeYearPicker = <T extends FieldValues>(props: FeeYearPickerProps<T>) => {
  const defaultProps: Partial<FeeYearPickerProps<T>> = {
    placeholder: '请选择',
  };
  const mergedProps = useComponentDefaultProps('FeeYearPicker', defaultProps, props);

  const { control } = useFormContext();

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker.Year
          {...mergedProps}
          value={field.value ? new Date(field.value + '/1/1') : null}
          withAsterisk
          onChange={(v) => {
            field.onChange(v);
            mergedProps.onFieldChange?.(v?.getFullYear() || null);
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

export default FeeYearPicker;
