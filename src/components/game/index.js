import Image from "../image";
import Divider from "@material-ui/core/Divider"
import "./style.css";

const days = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
]

export default function Game({ isOddIndex, opponent, score, result, viewingLink, logo, time: gameTime }) {

	const addZero = (s) => s.length === 1 ? "0" + s : s

	const time = new Date(gameTime)
	const dayN = addZero(time.getDate().toString())

	const month = addZero((time.getMonth() + 1).toString())

	const dayL = days[time.getDay()]

	const hour = addZero(time.getHours().toString())
	const min = addZero(time.getMinutes().toString())

	return (
		<div className={`gameContainer${isOddIndex ? " odd" : ""}`}>
				<div className="gameCardInfo">
					<Image
						alt="opponent"
						className="rivalLogo"
						src={`${process.env.PUBLIC_URL}/schools/${logo}`}
						width="5rem"
						height="5rem"
					/>
					<div className="gameInfoText">
						<div>{month}.{dayN} ({dayL}) / {hour}:{min} ET</div>
						<div><b>{"vs. " + opponent.toUpperCase()}</b></div>
					</div>
				</div>
				<Divider variant="middle" className="mobileScoreDivider" />
				<div className="scoreContainer">
					{score !== "N/A" && <div className="scoreReport"><b>{score}</b></div>}

					{result && <img
						alt="gameResultLogo"
						className="imageResult"
						src={`${process.env.PUBLIC_URL}/icons/${result}.svg`}
					/>}
				</div>

				{viewingLink && (
					<div
						onClick={() => window.open(viewingLink, "_blank")}
						className="playbackRecording"
					>
						Watch Here
						<svg className="youtubeStream" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.507 109.01"><path fill="none" d="M63.607 30.302v48.915l39.3-24.715-39.3-24.2z" /><path d="M154.107 17.002a19.581 19.581 0 00-13.9-13.8c-12.3-3.2-61.5-3.2-61.5-3.2s-48.3-.2-60.6 3c-6.8 1.8-13.3 7.3-15.1 14-3.3 12.2-3 37.5-3 37.5s-.3 25.3 3 37.5c1.8 6.7 8.4 12.2 15.1 14 12.3 3.3 60.6 3 60.6 3s48.3.2 60.6-3c6.8-1.8 13.1-7.3 14.9-14 3.3-12.1 3.3-37.5 3.3-37.5s-.1-25.3-3.4-37.5zm-90.5 62.215V30.302l39.3 24.2z" /></svg>
					</div>
				)}
		</div>
	);
}