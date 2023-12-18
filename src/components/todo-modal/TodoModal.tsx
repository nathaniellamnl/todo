import React, { useRef } from "react";
import { Todo } from "../../types";
import { Form, Input, Modal } from "antd";
import { Button } from "antd";
import styles from "./TodoModal.module.css";

interface TodoItemProps {
  item?: Todo;
  isModalOpen: boolean;
  handleSubmit: (value: { name: string }) => void;
  handleClose: () => void;
}

const TodoModal = ({
  item,
  isModalOpen,
  handleSubmit,
  handleClose,
}: TodoItemProps) => {
  const submitButtonRef = useRef<HTMLElement>(null);
  const type = item ? "update" : "create";

  return (
    <>
      <Modal
        title={type === "update" ? "Edit todo" : "Add todo"}
        open={isModalOpen}
        footer={[
          <Button
            key="submit-button"
            type="primary"
            onClick={() => submitButtonRef?.current?.click()}
          >
            {type === "update" ? "Update todo" : "Add todo"}
          </Button>,
          <Button key="cancel-button" onClick={handleClose}>
            Cancel
          </Button>,
        ]}
        onCancel={handleClose}
      >
        <Form
          initialValues={{ name: type === "update" ? item?.name : undefined }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your todo!" }]}
          >
            <Input placeholder="Name of todo" />
          </Form.Item>
          <Button
            className={styles["submit-button"]}
            ref={submitButtonRef}
            htmlType="submit"
          />
        </Form>
      </Modal>
    </>
  );
};

export default TodoModal;
