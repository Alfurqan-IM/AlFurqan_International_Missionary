import React from "react";
import "./aboutus.css";
import centralMosque from "../../assets/centralMosque.png";
import sunsetWalk from "../../assets/sunsetWalk.png";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import Footer from "../../components/footer";
import { useGetCampaigns, useGetCampaignsDonor } from "./Api";

const Campaign = () => {
  const campaigns = useGetCampaigns();
  const campaignsDonor = useGetCampaignsDonor();

  const mergeCampaignData = (campaignsData, donorsData) => {
    if (!campaignsData || !donorsData) return [];

    return campaignsData.map((campaign) => {
      const campaignSlug = campaign.donation_url
        ?.split("donorbox.org/")[1]
        ?.trim();

      const donorInfo = donorsData.find(
        (donor) => donor.slug.toLowerCase() === campaignSlug?.toLowerCase()
      );

      return {
        ...campaign,
        donorbox_id: donorInfo?.id,
        goal_amt: donorInfo?.goal_amt ? parseFloat(donorInfo.goal_amt) : 0,
        total_raised: donorInfo?.total_raised
          ? parseFloat(donorInfo.total_raised)
          : 0,
        formatted_goal_amount: donorInfo?.formatted_goal_amount || "$0",
        formatted_total_raised: donorInfo?.formatted_total_raised || "$0",
        donations_count: donorInfo?.donations_count || 0,
        progress:
          donorInfo?.goal_amt && donorInfo?.total_raised
            ? (parseFloat(donorInfo.total_raised) /
                parseFloat(donorInfo.goal_amt)) *
              100
            : 0,
      };
    });
  };

  const isLoading = campaigns.isLoading || campaignsDonor.isLoading;

  const mergedCampaigns = React.useMemo(() => {
    const campaignData = campaigns.data?.data?.campaign || [];
    const donorData = campaignsDonor.data?.data?.campaigns || [];
    return mergeCampaignData(campaignData, donorData);
  }, [campaigns.data, campaignsDonor.data]);

  return (
    <div className="about_us_container">
      <Header />
      <PublicNav />

      <div className="about_us_banner-container">
        <img
          src={centralMosque}
          alt="central mosques Pictures"
          className="banner-image"
        />
        <div className="about_us_banner-overlay">
          <div className="about_us_banner-title">
            Explore campaigns that need your support
          </div>
          <p style={{ color: "white" }}>
            The world is filled with heroes championing meaningful causes — and
            in this space, you are the hero.
          </p>
        </div>
      </div>

      {/* Campaign Cards Section */}
      {isLoading ? (
        <div>Loading campaigns...</div>
      ) : (
        <section className="campaign-list">
          {mergedCampaigns.map((item, index) => (
            <div
              key={index}
              className={`campaign-card ${index % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="campaign-image-container">
                <img
                  src={item.image_url || sunsetWalk}
                  alt={item.title}
                  className="campaign-image"
                />
              </div>

              <div className="campaign-info">
                <h3 className="campaign-title">{item.title}</h3>
                <p className="campaign-description">
                  {item.description.split(" ").length > 15
                    ? item.description.split(" ").slice(0, 15).join(" ") + "…"
                    : item.description}
                </p>
                <p className="status">
                  Status: <span className="status-active">{item.status}</span>
                </p>

                <p className="raised">
                  {item.formatted_total_raised} raised out of{" "}
                  {item.formatted_goal_amount}
                </p>

                <p className="dates">
                  Start Date: {new Date(item.start_date).toLocaleDateString()}{" "}
                  <br />
                  End Date: {new Date(item.end_date).toLocaleDateString()}
                </p>

                <div className="campaign-stats">
                  <span>{item.donations_count} Donors</span>
                  <span>
                    {Math.max(
                      0,
                      Math.floor(
                        (new Date(item.end_date) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}{" "}
                    Days Left
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${item.progress.toFixed(0)}%` }}
                  ></div>
                </div>

                <button
                  className="donate-btn"
                  onClick={() => window.open(item.donation_url, "_blank")}
                >
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Campaign;
