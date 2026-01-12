import { Modal } from "antd";
import { useEffect, useState } from "react";
import {
  useCreateFeedback,
  useUpdateFeedback,
} from "../../pages/protected/Api";
import styles from "./FeedbackForm.module.css";

export default function FeedbackModal({ open, onClose, data, mode }) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (data) {
      setSubject(data.subject);
      setNotes(data.notes);
    } else {
      setSubject("");
      setNotes("");
    }
  }, [data, open]);

  const { mutate: createFeedback, isLoading } = useCreateFeedback({
    onSuccess: () => onClose(),
  });

  const { mutate: updateFeedback, isLoading: updating } = useUpdateFeedback({
    onSuccess: () => onClose(),
  });

  const handleSubmit = () => {
    if (isEdit) {
      updateFeedback({
        id: data.feedback_id,
        payload: { subject, notes },
      });
    } else {
      createFeedback({ subject, notes });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={
        isView ? "View Feedback" : isEdit ? "Edit Feedback" : "Create Feedback"
      }
    >
      <div className={styles.form_group}>
        <label>Subject</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isView}
        />
      </div>

      <div className={styles.form_group}>
        <label>Notes</label>
        <textarea
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={isView}
        />
      </div>

      {!isView && (
        <button
          className={styles.primary}
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
      )}
    </Modal>
  );
}
