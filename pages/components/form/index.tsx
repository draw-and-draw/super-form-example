import Form from './Form.fields';
import FormContainer, { FormContainerProps } from './components/FormContainer';
import { FieldValues } from 'react-hook-form';

const Index = <T extends FieldValues>(props: Omit<FormContainerProps<T>, 'children'>) => {
  // 为了让表单组件能够使用 useFormContext 的方法，需要将 formMethods 传递给 FormProvider
  return (
    <FormContainer {...props}>
      <Form /> {/* 表单组件 */}
    </FormContainer>
  );
};

export default Index;
