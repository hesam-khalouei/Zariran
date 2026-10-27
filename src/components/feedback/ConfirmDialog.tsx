import { Modal } from "./Modal";
import { Button } from "../ui/Button";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open, onClose, onConfirm, title, description,
  confirmLabel = "تأیید", cancelLabel = "انصراف", destructive = false, isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm"
      footer={<>
        <Button variant={destructive ? "destructive" : "primary"} onClick={onConfirm} isLoading={isLoading}>{confirmLabel}</Button>
        <Button variant="ghost" onClick={onClose}>{cancelLabel}</Button>
      </>}>
      <span className="sr-only">{description}</span>
    </Modal>
  );
}