import { useState } from "react";
import styles from "./UpdatePassword.module.css";
import { useUpdatePassword } from "../../pages/protected/Api";

export default function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate: updatePassword, isLoading } = useUpdatePassword({
    onSuccess: () => {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      alert("Password updated successfully");
    },
    onError: () => {
      setError("Failed to update password. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      setError("Password must be at least 8 characters and contain a number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    updatePassword({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <div className={styles.password_container}>
      <div className={styles.card_header}>
        <h2>🔒 Update Password</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.form_row}>
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.form_row}>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.form_row}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? "Changing..." : "Change Password"}
          </button>

          <button
            className={styles.secondary}
            onClick={() => {
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setError("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
