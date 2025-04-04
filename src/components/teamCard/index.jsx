import "./index.css";

const TeamCard = ({ image, name, title,role}) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={image} alt={name} />
      </div>
      <h2 className="profile-name">{name}</h2>
      <p className="profile-title">{title}</p>
      <div className="profile-position">{role}</div>
    </div>
  );
};

export default TeamCard;