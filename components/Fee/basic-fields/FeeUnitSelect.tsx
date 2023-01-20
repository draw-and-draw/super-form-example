import { useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { CustomControllerProps } from '../Fee.type';
import React from 'react';
import { UnitApiService } from 'src/api';
import { useQuery } from '@tanstack/react-query';
import { CascadeSelect, CascadeSelectProps } from 'src/components/CascadeSelect';

type FeeUnitSelectProps<T extends FieldValues> = Omit<
  CascadeSelectProps & React.RefAttributes<HTMLInputElement> & CustomControllerProps<T>,
  'value' | 'error' | 'onSelect' | 'data'
> & { onFieldChange?: (v: React.ChangeEvent<HTMLInputElement>) => void };

const FeeUnitSelect = <T extends FieldValues>(props: FeeUnitSelectProps<T>) => {
  const defaultProps: Partial<FeeUnitSelectProps<T>> = {
    placeholder: '请输入',
    withinPortal: true,
  };
  const mergedProps = useComponentDefaultProps('FeeUnitSelect', defaultProps, props);

  const { control } = useFormContext();

  const { data } = useQuery(['PcfUnitGroupApiService.getNotCEUGList'], async () => {
    const res = await UnitApiService.getNotCEUGList();

    return res?.map((it) => {
      return {
        ...it,
        units: it?.units?.map((u) => {
          return { ...u, unitGroupId: u.unitId, unitGroupName: u.unitName };
        }),
      };
    });
  });

  return (
    <Controller
      name={mergedProps.name}
      control={control}
      render={({ field, fieldState }) => (
        <CascadeSelect
          {...mergedProps}
          fieldNames={{ id: 'unitGroupId', label: 'unitGroupName', children: 'units' }}
          showLastLevel={true}
          data={data || []}
          value={field.value?.id || ''}
          maxDeep={2}
          placeholder="请选择"
          onSelect={(v) => {
            field.onChange(v);
            mergedProps.onFieldChange?.(v);
          }}
          onBlur={(e) => {
            field.onBlur();
            mergedProps.onBlur?.(e);
          }}
          error={fieldState.error?.message}
          clearable
        />
      )}
    />
  );
};

export default FeeUnitSelect;
