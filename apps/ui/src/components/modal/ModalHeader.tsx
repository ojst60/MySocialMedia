import { ReactNode } from "react";

interface ModalHeader {
  showCloseButton?: boolean;
  children: ReactNode;
}

function ModalHeader({ showCloseButton, children }: ModalHeader): JSX.Element {
  return <div>{children}</div>;
}

export default ModalHeader;
