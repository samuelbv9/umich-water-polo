import Paper from "@material-ui/core/Paper"
import parse from 'html-react-parser'
import "./style.css";

export default function Post({ children, date, title }) {
	return (
			<Paper className="postContainer">
				<div className="postHeading">
					<div>{title}</div>
					<div>{date}</div>
				</div>

				<div className="postBody">{typeof children === "string" ? parse(children) : children}</div>
			</Paper>
	);
};