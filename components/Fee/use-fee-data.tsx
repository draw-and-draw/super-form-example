import { Resolver } from 'react-hook-form';

export interface UseFeeDataProps<T> {
  initialValues: T | (() => T);
  onSubmit: (data: T) => void;
  validationResolver: Resolver;
}

const useFeeData = <T,>(props: UseFeeDataProps<T>) => {
  const { initialValues, onSubmit, validationResolver } = props;

  return {
    values: initialValues,
    onSubmit,
    validationResolver,
  };
};

export default useFeeData;
