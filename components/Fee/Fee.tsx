import { createStyles, Stack, StackProps } from '@mantine/core';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, Resolver, useForm, UseFormProps } from 'react-hook-form';

const useFormStyle = createStyles(() => ({
  root: {
    '.capture-InputWrapper-root': { position: 'relative', marginBottom: '18px' },
    '.capture-InputWrapper-error': { position: 'absolute', bottom: -16 },
    ':has(.capture-Input-invalid)': { margin: 0 },
  },
}));

export interface FeeProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'values'> {
  values?: T | (() => T);
  onSubmit?: (data: T) => Promise<void> | void;
  validationResolver?: Resolver<any, any>;
  className?: any;
  children: ReactNode;
}

const FeeContainer = ({ children, ...props }: StackProps & React.RefAttributes<HTMLDivElement>) => {
  return (
    <Stack p={24} pt={18} spacing={0} {...props}>
      {children}
    </Stack>
  );
};

const Fee = <T extends FieldValues>(props: FeeProps<T>) => {
  const { values, onSubmit, validationResolver, className, children, ...useFormProps } = props;
  const { classes, cx } = useFormStyle();

  const formMethods = useForm<T>({
    // 非受控状态的默认值 defaultValues: values,
    // 受控状态的默认值
    values: typeof values === 'function' ? values() : values,
    // 用户提交表单之前的校验策略，默认提交表单时校验，设置为 all 可以让前后校验逻辑统一，但是巨消耗性能
    mode: 'all',
    // 用户提交表单之后的校验策略，默认value变化时校验
    reValidateMode: 'onChange',
    // 有时候我们的表单value对象内置了一些字段但未注册至表单上面，如果我们希望表单使用这些字段，可以设置这个选项为true
    shouldUnregister: false,
    // 表单验证模式
    resolver: validationResolver,
    ...useFormProps,
  });

  return (
    <FormProvider {...formMethods}>
      <form className={cx(classes.root, className)} onSubmit={onSubmit && formMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

Fee.Container = FeeContainer;

export default Fee;
