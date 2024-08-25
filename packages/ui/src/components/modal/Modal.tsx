import { Modal as BaseModal } from "@restart/ui";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import styles from "./styles/modal.module.scss";
import { ReactNode } from "react";

type Modal = {
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  children: ReactNode;
};

function Modal({ onClose, isOpen, className, children }: Modal): JSX.Element {
  return (
    <BaseModal
      show={isOpen}
      onHide={onClose}
      renderBackdrop={(props) => <div className={styles["modal-backdrop"]}></div>}
    >
      <div className={styles["modal-root"]}>
        <div className={styles.container}>{children}</div>
      </div>
    </BaseModal>
  );
}

export default Object.assign(Modal, {
  header: ModalHeader,
  body: ModalBody,
  footer: ModalFooter,
});
