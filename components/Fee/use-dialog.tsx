import { Modal, ModalProps } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { useCallback, useMemo, useState } from 'react';

export interface DialogProps<T> {
  opened: boolean;
  onClose: () => void;
  payload?: T;
}

type UseDialogOption = {
  title: React.ReactNode;
  modalProps?: Omit<ModalProps, 'opened' | 'onClose' | 'title'>;
  onClose?: () => void;
  onOpen?: () => void;
};

const useDialog = <T,>(DialogContent: (props: DialogProps<T>) => JSX.Element) => {
  const defaultProps: Partial<UseDialogOption> = {
    modalProps: {
      size: 450,
      centered: true,
    },
  };

  const [opened, { open, close: closeDialog }] = useDisclosure(false);
  const [debouncedOpened] = useDebouncedValue(opened, 100);

  const [payload, setPayload] = useState<T>();
  const [options, setOptions] = useState<UseDialogOption>();
  const { title, onClose, onOpen, modalProps } = options ?? {};

  const handleClose = useCallback(() => {
    closeDialog();
    onClose?.();
  }, [closeDialog, onClose]);

  const Dialog = useMemo(
    () =>
      opened && (
        <Modal
          sx={{ '.capture-Modal-body': { padding: 0 } }}
          opened={debouncedOpened}
          onClose={handleClose}
          title={title}
          {...defaultProps.modalProps}
          {...modalProps}>
          <DialogContent opened={opened} onClose={handleClose} payload={payload} />
        </Modal>
      ),
    [
      opened,
      debouncedOpened,
      handleClose,
      title,
      defaultProps.modalProps,
      modalProps,
      DialogContent,
      payload,
    ]
  );

  const openDialog = useCallback(
    async <TT extends T>(payload: TT, options: UseDialogOption) => {
      setPayload(payload);
      setOptions(options);
      open();
      onOpen?.();
    },
    [onOpen, open]
  );

  return useMemo(() => [openDialog, Dialog] as const, [openDialog, Dialog]);
};

export default useDialog;
