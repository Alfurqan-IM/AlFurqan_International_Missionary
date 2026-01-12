import { Table, Popconfirm } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import { useMyFeedbacks, useDeleteFeedback } from "../../pages/protected/Api";
import FeedbackModal from "./FeedbackModal";
import styles from "./FeedbackForm.module.css";

export default function MyFeedbacks() {
  const { data, isLoading } = useMyFeedbacks();
  const { mutate: deleteFeedback } = useDeleteFeedback();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | view | edit
  const [selected, setSelected] = useState(null);

  const feedbacks = data?.feedback || [];

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "View",
      render: (_, record) => (
        <EyeOutlined
          style={{ color: "#1677ff" }}
          onClick={() => {
            setSelected(record);
            setMode("view");
            setOpen(true);
          }}
        />
      ),
    },
    {
      title: "Edit",
      render: (_, record) => (
        <EditOutlined
          style={{ color: "#f4a100" }}
          onClick={() => {
            setSelected(record);

            setMode("edit");
            setOpen(true);
          }}
        />
      ),
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Popconfirm
          title="Delete this feedback?"
          onConfirm={() => {
            console.log(record);
            deleteFeedback(record.feedback_id);
          }}
        >
          <DeleteOutlined style={{ color: "red" }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <div className={styles.tableHeader}>
        <span className={styles.tableTitle}>My Feedbacks</span>

        <span
          onClick={() => {
            setSelected(null);
            setMode("create");
            setOpen(true);
          }}
          className={styles.addIcon}
        >
          New Feedback&nbsp;
          <PlusOutlined />
        </span>
      </div>

      <Table
        columns={columns}
        dataSource={feedbacks}
        loading={isLoading}
        rowKey="id"
      />

      <FeedbackModal
        open={open}
        mode={mode}
        data={selected}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
      />
    </>
  );
}
