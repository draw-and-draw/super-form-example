import { Stack, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useFormContext, useFormState } from 'react-hook-form';

const Info = () => {
  const { watch, control } = useFormContext();
  const { errors } = useFormState({ control });

  return (
    <Stack sx={{ width: 400 }}>
      <Stack spacing={4}>
        <Title order={4}>watch object</Title>
        <Prism language="json">{JSON.stringify(watch(), null, 2)}</Prism>
      </Stack>
      <Stack spacing={4}>
        <Title order={4}>error message</Title>
        <Prism language="json">
          {JSON.stringify(
            {
              name: errors.name?.message,
              age: errors.age?.message,
              // @ts-ignore
              profession: { id: errors?.profession?.id?.message, name: errors?.profession?.name?.message },
            },
            null,
            2,
          )}
        </Prism>
      </Stack>
    </Stack>
  );
};

export default Info;
