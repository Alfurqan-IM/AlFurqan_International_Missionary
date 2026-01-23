import { useContext } from "react";
import styles from "./NewsletterCard.module.css";
import { useGetUser, useSubscribe } from "../../pages/protected/Api";
import { AuthContext } from "../../contexts";

export default function NewsletterCard() {
  const { user } = useContext(AuthContext);
  const userId = user?.tokenUser?.user_id;

  const { data, refetch } = useGetUser(userId);
  const isSubscribed = Boolean(data?.user?.notification);

  const { mutate: subscribeAction, isLoading } = useSubscribe({
    onSuccess: () => {
      alert("Action completed successfully");
      refetch(); // ✅ refresh user subscription status
    },
    onError: () => {
      alert("Request failed. Please try again.");
    },
  });

  const handleAction = () => {
    const actionText = isSubscribed ? "unsubscribe" : "subscribe";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} to our newsletter?`
    );

    if (!confirmed) return;

    subscribeAction({
      userId,
      subscription: !isSubscribed,
    });
  };

  return (
    <div className={styles.card}>
      <h3>Stay with us!</h3>

      <p>
        {isSubscribed
          ? "You are currently subscribed to our newsletter."
          : "Subscribe to get our latest news."}
      </p>

      <div className={styles.actions}>
        <button
          className={isSubscribed ? styles.secondary : styles.primary}
          onClick={handleAction}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : isSubscribed
            ? "Unsubscribe"
            : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
