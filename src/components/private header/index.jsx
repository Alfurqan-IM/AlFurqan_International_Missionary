import { useContext } from "react";
import styles from "./UserHeader.module.css";
import { AuthContext } from "../../contexts";
import { LogoutOutlined, ProfileFilled } from "@ant-design/icons";

export default function UserHeader() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <strong>USER MENU</strong>
        <span>
          {" "}
          <ProfileFilled /> User Profile
        </span>
        <span onClick={logout} style={{ cursor: "pointer" }}>
          <LogoutOutlined /> Logout
        </span>
      </div>

      <div className={styles.user}>
        <div className={styles.ImageContainer}>
          <img src={user?.tokenUser?.image || "/avatar.png"} alt="avatar" />
        </div>
        <div className={styles.userInfo}>
          <strong>{user?.tokenUser?.firsttName || " "}</strong>
          <p>{user?.tokenUser?.email || " "}</p>
        </div>
      </div>
    </div>
  );
}
