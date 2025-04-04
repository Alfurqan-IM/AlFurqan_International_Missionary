import "./index.css";

const MatronPatronCard = ({ image, name, title,role}) => {
  return (
    <div className="matron_profile-card">
      <div className="matron_profile-image">
        <img src={image} alt={name} />
      </div>
      <h2 className="matron_profile-name">{name}</h2>
      {/* <p className="profile-title">{title}</p>  */}
      <div className="matron_profile-position">{role}</div>
    </div>
  );
};

export default MatronPatronCard;