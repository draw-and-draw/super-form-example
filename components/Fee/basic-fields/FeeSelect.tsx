import { Select, SelectItem, SelectProps, useComponentDefaultProps } from '@mantine/core';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';
import { CustomControllerProps } from '../Fee.type';

type FeeSelectProps<T extends FieldValues> = Omit<
  SelectProps & React.RefAttributes<HTMLInputElement> & CustomControllerProps<T>,
  'value' | 'error' | 'onChange' | 'name' | 'data'
> & {
  onFieldChange?: (v: string | null) => void;
  asyncData?: (searchValue: string) => Promise<SelectItem[]>;
  name: {
    id: string;
    name: string;
  };
  data?: SelectItem[];
};

const FeeSelect = <T extends FieldValues>(props: FeeSelectProps<T>) => {
  const defaultProps: Partial<FeeSelectProps<T>> = {
    placeholder: '请选择',
    clearable: true,
    searchable: true,
    nothingFound: '无匹配项',
    allowDeselect: false,
  };
  const { name, asyncData, ...mergedProps } = useComponentDefaultProps(
    'FeeSelect',
    defaultProps,
    props
  );

  const { control, setValue, watch } = useFormContext();

  // searchQuery
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery] = useDebouncedValue(searchValue, 500, { leading: true });
  const { data, isFetching } = useQuery(
    ['FeeSelect', name, searchQuery],
    async () => asyncData!(searchQuery),
    {
      enabled: !!asyncData,
    }
  );

  useEffect(() => {
    setSearchValue(watch(name.id));
  }, [name.id, setSearchValue, watch]);

  const loading = isFetching;
  const mergedData = !loading ? mergedProps.data || data : [];

  return (
    <Controller
      name={name.id}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...mergedProps}
          value={field.value || null}
          data={mergedData ?? []}
          nothingFound={loading ? '搜索中...' : mergedProps.nothingFound}
          onSearchChange={(value) => {
            if (asyncData) {
              if (value !== searchValue) {
                setSearchValue(value);
                // setSearching(true);
              }
              // else setSearching(false);
            }
          }}
          onChange={(v) => {
            field.onChange(v);
            setValue(name.name, mergedData?.find((item) => item.value === v)?.label);
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

type SelectInputProps = Omit<SelectProps & React.RefAttributes<HTMLInputElement>, 'data'> & {
  asyncData?: (searchValue: string) => Promise<SelectItem[]>;
  data?: SelectItem[];
};

export const SelectInput = (props: SelectInputProps) => {
  const { asyncData, ...otherProps } = props;

  // 聚焦时候
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery] = useDebouncedValue(searchValue, 500, { leading: true });
  // const [isFocused, setIsFocused] = useState(false);

  // searchQuery
  const { data, isFetching } = useQuery(
    ['FeeSelect', otherProps.name, searchQuery],
    async () => asyncData!(searchQuery),
    {
      enabled: !!asyncData,
    }
  );

  const loading = isFetching;
  const mergedData = !loading ? otherProps.data || data : [];

  return (
    <Select
      {...otherProps}
      data={mergedData ?? []}
      // placeholder={isFocused ? searchValue : otherProps.placeholder}
      // searchValue={searchValue}
      onFocus={() => {
        // setIsFocused(true);
        // setSearchValue('');
      }}
      onBlur={() => {
        // setIsFocused(false);
      }}
      onChange={(v) => {
        otherProps.onChange?.(v);
        setSearchValue(mergedData?.find((item) => item.value === v)?.label || '');
      }}
      onSearchChange={(value) => {
        if (asyncData) {
          if (value !== searchValue) {
            setSearchValue(value);
            // setSearching(true);
          }
          // else setSearching(false);
        }
      }}
    />
  );
};
