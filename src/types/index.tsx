import { FieldValues, Path, UnPackAsyncDefaultValues } from 'react-hook-form';

export interface CustomControllerProps<T extends FieldValues> {
  name: Path<UnPackAsyncDefaultValues<T>>;
}
