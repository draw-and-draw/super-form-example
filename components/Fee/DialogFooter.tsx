import { Box, Button, Group, Popover, Textarea } from '@mantine/core';
import { useState, Children, cloneElement, ReactNode } from 'react';
import { isElement } from '@mantine/utils';
import { useDisclosure } from '@mantine/hooks';
import { useFormContext } from 'react-hook-form';

type DialogFooterProps = {
  loading?: boolean;
  isCreating?: boolean;
  submitButtonProps?: React.ComponentProps<typeof Button> & { type: 'submit' };
  cancelButtonProps?: React.ComponentProps<typeof Button>;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  onReject?: (comments: string) => void;
};

const DialogFooter = (props: DialogFooterProps) => {
  const { confirmText, cancelText, loading, onCancel, onSubmit, onReject, isCreating } = props;

  const formContext = useFormContext();

  const operationLoading = loading || formContext?.formState.isSubmitting;

  return (
    <>
      <Group
        px={24}
        py={14}
        sx={{
          background: '#fff',
          borderRadius: '0 0 6px 6px',
          borderTop: '1px solid rgba(0, 0, 0, 0.11)',
        }}
        position="right">
        {onReject && (
          <PopoverConfirm title="请输入驳回理由" inputEnable size={280} onConfirm={onReject}>
            <Button color="red" variant="outline" loading={operationLoading}>
              驳回
            </Button>
          </PopoverConfirm>
        )}
        {onCancel && (
          <Button onClick={onCancel} variant="outline" color="gray">
            {cancelText || '取消'}
          </Button>
        )}
        <Button type="submit" onClick={onSubmit} loading={operationLoading} sx={{ minWidth: 110 }}>
          {confirmText || (isCreating ? '创建' : '保存')}
        </Button>
      </Group>
    </>
  );
};

export default DialogFooter;

interface PopoverConfirmProps {
  title: ReactNode;
  anchorText?: string;
  inputEnable?: boolean;
  size?: number;
  onConfirm: (reason: string) => void;
  onCancel?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export function PopoverConfirm({
  title,
  inputEnable,
  size,
  onConfirm,
  onCancel,
  children,
  disabled = false,
}: PopoverConfirmProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState('');

  const confirmDisabled = inputEnable && !reason;

  const handleConfirm = () => {
    onConfirm(reason);
    handleClose();
  };
  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const handleClose = () => {
    close();
    setReason('');
  };

  return (
    <Popover
      width={size || 200}
      opened={opened}
      onClose={handleClose}
      withArrow
      shadow="md"
      disabled={disabled}>
      <Popover.Target>
        <Box onClick={open}>
          {children &&
            Children.map(children, (child) => {
              return isElement(child)
                ? cloneElement(child, {
                    onClick: (...args: any) => {
                      open();
                      child?.props?.onClick && child.props.onClick(...args);
                    },
                  })
                : child;
            })}
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        {!inputEnable && (
          <Box fz="sm" mt="xs">
            {title}
          </Box>
        )}
        {inputEnable && (
          <Textarea
            label={title}
            size="xs"
            placeholder="请输入"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}
        <Group position="right" mt="md">
          <Button size="xs" onClick={handleCancel} variant="outline" color="dark">
            取消
          </Button>
          <Button size="xs" onClick={handleConfirm} disabled={confirmDisabled} variant="filled">
            确认
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
