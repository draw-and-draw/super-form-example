import { FieldValues, Path, FieldPath } from 'react-hook-form';

export interface CustomControllerProps<T extends FieldValues> {
  name: Path<FieldPath<T>>;
}
