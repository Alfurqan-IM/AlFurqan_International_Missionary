import { useState } from "react";
import { useGetProgramsTitle } from "../../pages/public/Api";
import styles from "./RegisterProgramme.module.css";
import { useRegisterProgram } from "../../pages/protected/Api";

export default function RegisterProgramme() {
  const { data, isLoading } = useGetProgramsTitle();
  const { mutate: registerProgram, isLoading: isSubmitting } =
    useRegisterProgram({
      onSuccess: () => {
        alert("Registration successful");
        setProgramme("");
        setDiscoveryMethod("");
        setCategory("");
      },
      onError: () => {
        alert("Registration failed");
      },
    });

  const programmes = data?.data?.programmes || [];
  const [programme, setProgramme] = useState("");
  const [discoveryMethod, setDiscoveryMethod] = useState("");
  const [category, setCategory] = useState("");

  const referralSources = [
    "Masjid",
    "Social_Media",
    "Email_Campaign",
    "Referral",
    "Website",
    "Event_Workshop",
    "Advertisement",
    "Friends",
    "Other",
  ];

  const categories = ["Adult", "Youth", "Children"];

  const handleSubmit = () => {
    const payload = {
      programme,
      discovery_method: discoveryMethod,
      category,
    };

    registerProgram(payload);
  };

  return (
    <div className={styles.program_container}>
      <div className={styles.program_container_title}>
        <h3>Register for Programme</h3>
      </div>
      <div className={styles.card}>
        {/* PROGRAMME */}
        <select
          className={styles.input}
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
          disabled={isLoading}
        >
          <option value="" disabled>
            {isLoading ? "Loading programmes..." : "I am registering for"}
          </option>

          {programmes.map((item, i) => (
            <option key={i} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>

        {/* DISCOVERY METHOD */}
        <select
          className={styles.input}
          value={discoveryMethod}
          onChange={(e) => setDiscoveryMethod(e.target.value)}
        >
          <option value="" disabled>
            How did you hear about our programme?
          </option>

          {referralSources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* CATEGORY */}
        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          className={styles.btn}
          disabled={!programme || !discoveryMethod || !category || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
