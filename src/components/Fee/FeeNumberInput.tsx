import { NumberInputProps, TextInput, useComponentDefaultProps } from '@mantine/core';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  useFormContext,
} from 'react-hook-form';
import { CustomControllerProps } from '../../types';
import React, { useEffect, useState } from 'react';

type FeeNumberInputProps<T extends FieldValues> = Omit<
  NumberInputProps & React.RefAttributes<HTMLInputElement> & CustomControllerProps<T>,
  | 'value'
  | 'error'
  | 'onChange'
  | 'step'
  | 'decimalSeparator'
  | 'stepHoldDelay'
  | 'stepHoldInterval'
  | 'startValue'
  | 'type'
  | 'hideControls'
  | 'noClampOnBlur'
  | 'removeTrailingZeros'
> & {
  onFieldChange?: (v?: string) => void;
  accuracyMethod?: 'round-down' | 'round-up' | 'round';
};

const FeeNumberInput = <T extends FieldValues>(props: FeeNumberInputProps<T>) => {
  const defaultProps: Partial<FeeNumberInputProps<T>> = {
    placeholder: '请输入',
    accuracyMethod: 'round-down',
  };
  const mergedProps = useComponentDefaultProps('FeeNumberInput', defaultProps, props);

  const { control, watch } = useFormContext();

  const [displayValue, setDisplayValue] = useState<string>();

  useEffect(() => {
    setDisplayValue(watch(mergedProps.name));
  }, [mergedProps.name, watch]);

  const value = (mergedProps.formatter?.(displayValue) || displayValue)?.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, (string | undefined) & Path<UnPackAsyncDefaultValues<T>>>,
  ) => {
    // 去除非数字字符
    let toggleValue = (mergedProps.parser?.(e.target.value) || e.target.value).replace(/[^0-9.-]/g, '');
    if (toggleValue !== displayValue && toggleValue.match(/^((-?\d*\.(\d+)?)|(-?\d*?))$/)) {
      field.onChange(toggleValue);
      mergedProps.onFieldChange?.(toggleValue);
      setDisplayValue(toggleValue);
    }
  };

  // eslint-disable-next-line complexity
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: ControllerRenderProps<FieldValues, (string | undefined) & Path<UnPackAsyncDefaultValues<T>>>,
  ) => {
    if (displayValue) {
      let dotIndex = displayValue.indexOf('.');
      let zeroNum = 0;
      let index = -1;
      for (const item of displayValue) {
        index++;
        if (index === dotIndex) break;
        if ((displayValue[0] === '-' && item === '0') || (displayValue[0] === '0' && item === '0')) {
          if (index + 1 < dotIndex) {
            zeroNum++;
          }
        }
      }
      let finalValue = displayValue;

      // todo
      // precision round - up and round method need to be implemented in the future version
      // 小数部分 向上取整和四舍五入方法需要在未来版本中实现

      // 小数位数处理
      if (mergedProps.precision !== undefined && mergedProps.precision >= -1) {
        if (mergedProps.precision === 0 && dotIndex !== -1) {
          finalValue = finalValue.slice(0, dotIndex);
        } else {
          if (dotIndex !== -1) {
            let precisionCutIndex =
              dotIndex + mergedProps.precision > displayValue.length - 1
                ? displayValue.length - 1
                : dotIndex + mergedProps.precision;
            finalValue = finalValue.slice(0, precisionCutIndex + 1);
            if (precisionCutIndex - dotIndex < mergedProps.precision) {
              finalValue += '0'.repeat(mergedProps.precision - precisionCutIndex + dotIndex);
            }
          } else {
            finalValue += '.';
            finalValue += '0'.repeat(mergedProps.precision);
          }
        }
      }
      // 小数点结尾处理
      if (finalValue[finalValue.length - 1] === '.') {
        finalValue = finalValue.slice(0, finalValue.length - 1);
      }
      // 前置0处理
      if (finalValue[0] === '-') {
        finalValue = '-' + finalValue.slice(zeroNum + 1, finalValue.length);
      } else {
        finalValue = finalValue.slice(zeroNum, finalValue.length);
      }
      // 最大最小值处理
      if (mergedProps.max !== undefined && Number(finalValue) > mergedProps.max) {
        finalValue = mergedProps.max?.toString();
      }
      if (mergedProps.min !== undefined && Number(finalValue) < mergedProps.min) {
        finalValue = mergedProps.min?.toString();
      }
      // 边界值处理
      if (finalValue === '-') finalValue = '';
      if (finalValue === '-0') finalValue = '0';
      // 赋值
      if (finalValue !== displayValue) {
        field.onChange(finalValue);
        setDisplayValue(finalValue);
      }
    }
    field.onBlur();
    mergedProps.onBlur?.(e);
  };

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          {...mergedProps}
          value={value}
          onChange={(e) => handleChange(e, field)}
          onBlur={(e) => handleBlur(e, field)}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default FeeNumberInput;
