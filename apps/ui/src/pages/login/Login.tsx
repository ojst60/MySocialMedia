import styles from "./styles/login.module.scss";
import Modal from "../../components/modal/Modal";
import { useState } from "react";

function Login(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.header showCloseButton>
        <h1>Header</h1>

      </Modal.header>
      <Modal.body></Modal.body>
    </Modal>
  );
}

export default Login;
