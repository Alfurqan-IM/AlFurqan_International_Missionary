import { Modal } from "antd";
import { useState, useEffect } from "react";
import { useGetPrograms } from "../../pages/public/Api";

import styles from "./RegisterProgramme.module.css";
import {
  useRegisterProgram,
  useUpdateRegistration,
} from "../../pages/protected/Api";

export default function RegisterProgrammeModal({ open, onClose, editData }) {
  const { data } = useGetPrograms();
  const programmes = data?.data?.programmes || [];

  const isEdit = !!editData;

  const [programme, setProgramme] = useState("");
  const [discoveryMethod, setDiscoveryMethod] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editData) {
      setProgramme(editData.programme);
      setDiscoveryMethod(editData.discovery_method);
      setCategory(editData.category);
    }
  }, [editData]);

  const { mutate: registerProgram, isLoading } = useRegisterProgram({
    onSuccess: () => onClose(),
  });

  const { mutate: updateRegistration, isLoading: updating } =
    useUpdateRegistration({
      onSuccess: () => {
        onClose();
      },
    });

  const referralSources = [
    "Masjid",
    "Website",
    "Email_Campaign",
    "Referral",
    "Other",
  ];

  const categories = ["Adult", "Youth"];

  const handleSubmit = () => {
    const payload = { programme, discovery_method: discoveryMethod, category };

    if (isEdit) {
      updateRegistration({ id: editData.reg_id, payload });
    } else {
      registerProgram(payload);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEdit ? "Edit Registration" : "Register for Programme"}
      footer={null}
    >
      <select
        className={styles.input}
        value={programme}
        onChange={(e) => setProgramme(e.target.value)}
      >
        <option value="">Select programme</option>
        {programmes.map((p) => (
          <option key={p.programme_id} value={p.title}>
            {p.title}
          </option>
        ))}
      </select>

      <select
        className={styles.input}
        value={discoveryMethod}
        onChange={(e) => setDiscoveryMethod(e.target.value)}
      >
        <option value="">Discovery method</option>
        {referralSources.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        className={styles.input}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        className={styles.btn}
        onClick={handleSubmit}
        disabled={isLoading || updating}
      >
        {isEdit
          ? updating
            ? "Updating..."
            : "Update"
          : isLoading
          ? "Submitting..."
          : "Submit"}
      </button>
    </Modal>
  );
}
