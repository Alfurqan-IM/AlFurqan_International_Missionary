import { useState } from "react";
import "./DonationModal.css";

function CopyIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11" />
      <path d="M20 10v11" />
      <path d="M8 14v3" />
      <path d="M12 14v3" />
      <path d="M16 14v3" />
    </svg>
  );
}

function CopyField({ label, value, mono = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="dm-field-row">
      <div className="dm-field-text">
        {label && <div className="dm-field-label">{label}</div>}
        <div className={`dm-field-value${mono ? " mono" : ""}`} title={value}>
          {value}
        </div>
      </div>
      <button
        type="button"
        className={`dm-copy-btn${copied ? " copied" : ""}`}
        onClick={handleCopy}
        aria-label={`Copy ${label || value}`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

export default function DonationModal({ open, onClose }) {
  if (!open) return null;

  const zelleEmail = "alfurqanaim@gmail.com";
  const stripeUrl =
    "https://donorbox.org/alfurqan-international-general-mission-fund";
  const accountNumber = "375029375263";
  const domesticRouting = "072000805";
  const wireRouting = "026009593";

  return (
    <div className="dm-overlay" onClick={onClose}>
      <div className="dm-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="dm-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="dm-quote-section">
          <div className="dm-diamond" />
          <p className="dm-quote">
            "The example of those who spend their wealth in the way of Allah is
            like a seed that grows seven ears; in every ear are a hundred
            grains. And Allah multiplies for whom He wills."
          </p>
          {/* <p className="dm-citation">— Surah Al-Baqarah (2:261)</p> */}
        </div>

        <div className="dm-body-section">
          <div className="dm-panel">
            <div className="dm-ways-badge" style={{ marginTop: "25px" }}>
              Ways to donate
            </div>

            <div className="dm-cards">
              <div className="dm-card">
                <div className="dm-card-head">
                  <span className="dm-badge-num">1</span>
                  <span className="dm-card-title">US Zelle</span>
                </div>
                <CopyField label="Send to" value={zelleEmail} />
              </div>

              <div className="dm-card">
                <div className="dm-card-head">
                  <span className="dm-badge-num">2</span>
                  <span className="dm-card-title">Credit or debit card</span>
                </div>
                <p className="dm-card-note">
                  Powered by Stripe, hosted on Donorbox.
                </p>
                <CopyField label="Donation link" value={stripeUrl} />
                <a
                  className="dm-open-link"
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donate via Stripe
                  <ExternalLinkIcon />
                </a>
              </div>

              <div className="dm-card">
                <div className="dm-card-head">
                  <span className="dm-badge-num">3</span>
                  <span className="dm-card-title">Bank transfer</span>
                </div>
                <div className="dm-card-sub">
                  <BankIcon />
                  Bank of America
                </div>
                <CopyField label="Account #" value={accountNumber} mono />
                <CopyField
                  label="Domestic routing #"
                  value={domesticRouting}
                  mono
                />
                <CopyField label="Wire routing #" value={wireRouting} mono />
              </div>
            </div>
          </div>
        </div>

        <div className="dm-footer">
          <p className="dm-footer-line1">
            Together, we can build a better tomorrow for our ummah.
          </p>
          <p className="dm-footer-line2">
            For our ummah. For our future. For the sake of Allah.
          </p>
        </div>
      </div>
    </div>
  );
}
