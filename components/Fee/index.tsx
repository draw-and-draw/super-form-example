import FeeNumberInput from './FeeNumberInput';
import FeeSelect from './FeeSelect';
import FeeTextInput from './FeeTextInput';
import FeeDatePicker from './FeeDatePicker';
import FeeRadioGroup from './FeeRadioGroup';
import FeePasswordInput from './FeePasswordInput';
import FeeTextarea from './FeeTextarea';
import { FieldValues, Path, FieldPath } from 'react-hook-form';

export interface CustomControllerProps<T extends FieldValues> {
  name: Path<FieldPath<T>>;
}

export { FeeNumberInput, FeeSelect, FeeTextInput, FeeRadioGroup, FeePasswordInput, FeeTextarea, FeeDatePicker };
