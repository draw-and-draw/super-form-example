import { Button, Group, Stack } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { FeeTextInput, FeeNumberInput, FeeSelect, FeeDatePicker } from '../Fee';
import Info from './components/Info';
import { professionData } from './Form.controls';

const FormFields = () => {
  const { setValue } = useFormContext();

  return (
    <Group align="flex-start" position="center" noWrap sx={{ width: '100%' }}>
      <Stack>
        <FeeTextInput name="name" label="名称" withAsterisk />
        <FeeNumberInput
          name="age"
          label="年龄"
          // max={120}
          // min={0}
          precision={20}
          // parser={(value) => value?.replace(/[岁]/g, '')}
          // formatter={(value) => (!Number.isNaN(parseFloat(value || '')) ? `${value} 岁` : ' ')}
          withAsterisk
        />
        <FeeSelect
          name="profession.id"
          label="职业"
          withAsterisk
          onFieldChange={(v) => setValue('profession.name', professionData.find((item) => item.value === v)?.label)}
          data={professionData}
        />
        <FeeDatePicker name="date" label="生日" withAsterisk />
        <Button type="submit">提交</Button>
      </Stack>
      <Info /> {/* 额外组件，不用管 */}
    </Group>
  );
};

export default FormFields;
