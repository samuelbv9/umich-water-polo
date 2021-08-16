import Image from "../image"
import Divider from "@material-ui/core/Divider"
import "./style.css";

function Player({ isOddIndex, details }) {
	const { isCaptian, hometown, bio, headshot, name } = details
	return (
		<div className={`playerContainer${isOddIndex ? " odd" : ""}`}>
				{headshot && <Image width="5.3rem" height="6rem" alt="headshot" className="playerHeadshot" src={`${process.env.PUBLIC_URL}/rosterPhotos/${headshot}`} />}

				<div className="playerInfo">
					<div className="playerInfoRow">
						<div className="playerName">
							{name}
							{isCaptian && <img className="captianMedal" alt="captian" src={`${process.env.PUBLIC_URL}/icons/captain.svg`} />}
						</div>
						<Divider variant="middle" className="mobilePlayerDivider" />
						<div className="playerHometown"> {hometown}</div>
					</div>

					<div className="playerBio">{bio}</div>
				</div>
		</div>
	)
}


export default Player



