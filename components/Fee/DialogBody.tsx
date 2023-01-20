import { Stack, StackProps } from '@mantine/core';

type DialogFooterProps = StackProps & React.RefAttributes<HTMLDivElement>;

const DialogBody = (props: DialogFooterProps) => {
  const { children } = props;
  return <Stack p={24}>{children}</Stack>;
};

export default DialogBody;
