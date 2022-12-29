import { Button, Group, Stack } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import {
  FeeTextInput,
  FeeNumberInput,
  FeeSelect,
  FeeDatePicker,
  FeeTextarea,
  FeeRadioGroup,
  FeePasswordInput,
} from '../Fee';
import Info from './components/Info';
import { genreData, professionData } from './Form.controls';

const FormFields = () => {
  const { setValue } = useFormContext();

  return (
    <Group align="flex-start" position="center" noWrap sx={{ width: '100%' }}>
      <Stack
        sx={{
          width: 300,
        }}
        spacing={2}
      >
        <FeeTextInput name="name" label="名称" withAsterisk />
        <FeePasswordInput name="password" label="密码" withAsterisk />
        <FeeRadioGroup name="genre" label="性别" data={genreData} withAsterisk />
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
          name={{ id: 'profession.id', name: 'profession.name' }}
          label="职业"
          withAsterisk
          data={professionData}
        />
        <FeeDatePicker name="birthday" label="生日" withAsterisk />
        <FeeTextarea name="description" label="个人介绍" withAsterisk />
        <Button type="submit">提交</Button>
      </Stack>
      <Info /> {/* 额外组件，不用管 */}
    </Group>
  );
};

export default FormFields;
