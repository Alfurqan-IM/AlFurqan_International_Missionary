import { Table, Tag, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

import {
  useDeleteRegistration,
  useMyRegistrations,
} from "../../pages/protected/Api";
import RegisterProgrammeModal from "./registerationModal";

import styles from "./RegisterProgramme.module.css";
export default function MyProgrammes() {
  const { data, isLoading } = useMyRegistrations();
  const { mutate: deleteReg } = useDeleteRegistration();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const registrations = data?.registrations || [];

  const columns = [
    {
      title: "Programme",
      dataIndex: "programme",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (val) => <Tag color="orange">{val}</Tag>,
    },
    {
      title: "Discovery Method",
      dataIndex: "discovery_method",
      render: (val) => <Tag color="red">{val}</Tag>,
    },
    {
      title: "Update",
      render: (_, record) => (
        <EditOutlined
          style={{ color: "#f4a100" }}
          onClick={() => {
            setEditData(record);
            setOpen(true);
          }}
        />
      ),
    },
    {
      title: "Remove",
      render: (_, record) => (
        <Popconfirm
          title="Remove this registration?"
          onConfirm={() => deleteReg(record.reg_id)}
        >
          <DeleteOutlined style={{ color: "red" }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <div className={styles.tableHeader}>
        <span className={styles.tableTitle}>My Programmes</span>

        <span
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className={styles.addIcon}
        >
          Register New Programme&nbsp;
          <PlusOutlined />
        </span>
      </div>

      <Table
        columns={columns}
        dataSource={registrations}
        loading={isLoading}
        rowKey="id"
      />

      <RegisterProgrammeModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        editData={editData}
      />
    </>
  );
}
