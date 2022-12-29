import { FieldValues } from 'react-hook-form';

export interface ValueItem {
  id: string;
  name: string | null;
}

// 表单值类型
export interface FormValuesProps extends FieldValues {
  name: string;
  age: string;
  profession: ValueItem;
}

// 表单项使用的数据
export const professionData = [
  { label: '程序员', value: '1' },
  { label: '设计师', value: '2' },
  { label: '产品经理', value: '3' },
];
