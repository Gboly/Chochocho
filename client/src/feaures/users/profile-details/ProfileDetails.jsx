import "./profile-details.css";
import { profileDetails } from "../../../util/iconDescContent";
import { getUsernameFromLink, getFullDate } from "../../../util/functions";

const socials = ["facebook", "twitter", "instagram", "linkedin"];
export default function ProfileDetails({ user }) {
  const content = profileDetails.reduce((accum, current, index) => {
    const { type, icon, desc } = current;
    if (user[type]) {
      accum.push(
        <div key={index} className="ptd-item">
          <i className="ptdi-icon">{icon}</i>
          <div className="ptdi-desc">
            {`${desc} ${
              socials.includes(type)
                ? getUsernameFromLink(user[type])
                : type === "joinedDate"
                ? getFullDate(user[type], { month: true, year: true })
                : user[type]
            }`}
          </div>
        </div>
      );
    }

    return accum;
  }, []);

  return (
    <>
      <div className="profile-top-details">
        <h3>INTRO</h3>
        {content}
      </div>
    </>
  );
}
