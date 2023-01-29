import { FieldValues, FieldPath } from 'react-hook-form';

export interface CustomControllerProps<T extends FieldValues> {
  name: FieldPath<T>;
}
