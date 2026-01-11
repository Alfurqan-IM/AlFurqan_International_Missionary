import { useState } from "react";
import styles from "./FeedbackForm.module.css";
import { useCreateFeedback } from "../../pages/protected/Api";

export default function FeedbackForm() {
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const { mutate: createFeedback, isLoading } = useCreateFeedback({
    onSuccess: () => {
      setSubject("");
      setNotes("");
      setError("");
      alert("Feedback submitted successfully");
    },
    onError: () => {
      setError("Failed to submit feedback. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (!subject.trim() || !notes.trim()) {
      setError("Subject and message are required.");
      return;
    }

    setError("");
    createFeedback({ subject, notes });
  };

  return (
    <div className={styles.feedback_container}>
      <div className={styles.card_header}>
        <h3>📝 Create Feedback</h3>
      </div>

      <div className={styles.card}>
        <div className={styles.form_group}>
          <label>Subject</label>
          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.form_group}>
          <label>Notes</label>
          <textarea
            rows="6"
            placeholder="Enter Message"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button
            className={styles.primary}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>

          <button
            className={styles.secondary}
            onClick={() => {
              setSubject("");
              setNotes("");
              setError("");
            }}
            disabled={isLoading}
          >
            Clear Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
