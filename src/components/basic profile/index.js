import styles from "./BasicProfile.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts";
import {
  useGetUser,
  useUpdateUserProfile,
  useUploadProfileImage,
} from "../../pages/protected/Api.js";
import { ProfileFilled } from "@ant-design/icons";

export default function BasicProfile() {
  const { user, setUser } = useContext(AuthContext);

  const userId = user?.tokenUser.user_id;

  const { data } = useGetUser(userId);

  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (data) {
      setForm(data?.user);
    }
  }, [data, setUser]);

  const updateProfile = useUpdateUserProfile();
  const uploadImage = useUploadProfileImage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const allowedPayload = {
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      gender: form.gender,
      address: form.address,
      city: form.city,
      state: form.state,
      country: form.country,
    };

    updateProfile.mutate({
      userId,
      payload: allowedPayload,
    });
  };

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    uploadImage.mutate(
      { userId, image: file },
      {
        onSuccess: (updated) => {
          setPreview(null);
        },
      }
    );
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>
          {" "}
          <ProfileFilled style={{ marginRight: "5px" }} />
          Basic Profile
        </h3>

        <div className={styles.content}>
          {/* FORM */}
          <div className={styles.info}>
            {[
              ["first_name", "First Name"],
              ["last_name", "Last Name"],

              ["email", "Email"],
              ["phone", "Phone"],
              ["gender", "Gender"],
              ["address", "Address"],
              ["city", "City"],
              ["state", "State"],
              ["country", "Country"],
            ].map(([key, label]) => (
              <div key={key} className={styles.row}>
                <label className={styles.label}>{label}</label>
                <input
                  className={styles.input}
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  disabled={key === "email"}
                />
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div
            className={styles.imageBox}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <img
              src={preview || data?.user?.image || "/placeholder.png"}
              alt="profile"
            />

            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            <button onClick={() => fileRef.current.click()}>
              {uploadImage.isLoading ? "Uploading..." : "Upload Image"}
            </button>

            <small>Drag & drop or click to upload</small>
          </div>
        </div>

        <div className={styles.buttonSection}>
          <button
            className={styles.btn}
            onClick={handleSubmit}
            disabled={updateProfile.isLoading}
          >
            {updateProfile.isLoading ? "Saving..." : "Update My Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
