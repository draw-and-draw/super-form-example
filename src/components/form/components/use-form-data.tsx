import { Resolver } from 'react-hook-form';

export interface UseFormDataProps<T> {
  initialValues: T | (() => T);
  onSubmit: (data: T) => void;
  validationResolver: Resolver;
}

const useFormData = <T,>(props: UseFormDataProps<T>) => {
  const { initialValues, onSubmit, validationResolver } = props;

  return {
    values: initialValues,
    onSubmit,
    validationResolver,
  };
};

export default useFormData;
