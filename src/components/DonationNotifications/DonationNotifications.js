import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { notification } from "antd";

const DonationNotifications = () => {
  const [donation, setDonation] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Establish a single socket connection
    const socket = io("alfurqaninstitute.onrender.com", {
      transports: ["websocket", "polling"], // Ensure compatibility
    });
    //  http://localhost:5005
    // Listen for new donation events
    socket.on("newDonation", (data) => {
      console.log("New donation received:", data);
      setDonation(data);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (donation && donation.name) {
      console.log(donation);
      api.open({
        message: donation.name || "New Donation",
        description:
          `${donation.slug} in ${donation.currency}` ||
          "You have a new donation!",
        placement: "bottomRight",
        duration: 0, // Notification stays until manually closed
      });
    }
  }, [donation, api]);

  return <>{contextHolder}</>;
};

export default DonationNotifications;
