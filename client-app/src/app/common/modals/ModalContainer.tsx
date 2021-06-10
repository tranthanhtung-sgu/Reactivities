import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  return (
    <Modal
      style={{ position: "relative", height: 480, width: 500 }}
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      size="mini"
    >
      <Modal.Content style={{ position: "relative" }}>{modalStore.modal.body}</Modal.Content>
    </Modal>
  );
});
