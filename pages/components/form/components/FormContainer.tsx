import { createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, Resolver, useForm, UseFormProps } from 'react-hook-form';

const useFormStyle = createStyles(() => ({
  root: {
    width: 300,
    '.mantine-InputWrapper-root': { position: 'relative' },
    '.mantine-InputWrapper-error': { position: 'absolute', bottom: 0 },
    '.mantine-Input-wrapper': {
      marginBottom: 18,
    },
  },
}));

export interface FormContainerProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'values'> {
  values: T | (() => T);
  onSubmit: (data: T) => Promise<void> | void;
  validationResolver: Resolver<any, any>;
  children: ReactNode;
}

const FormContainer = <T extends FieldValues>(props: FormContainerProps<T>) => {
  const { values, onSubmit, validationResolver, children, ...useFormProps } = props;
  const { classes } = useFormStyle();

  const formMethods = useForm<T>({
    // 非受控状态的默认值 defaultValues: values,
    // 受控状态的默认值
    values: typeof values === 'function' ? values() : values,
    // 用户提交表单之前的校验策略，默认提交表单时校验，设置为 all 可以让前后校验逻辑统一，但是巨消耗性能
    mode: 'onSubmit',
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
      <form className={classes.root} onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormContainer;
