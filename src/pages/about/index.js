import { useState, useEffect } from "react";
import axios from "axios"
import Loading from "../../components/loading";
import Post from "../../components/post";
import SectionBanner from "../../components/sectionBanner"
import ImageIntro from '../../components/imageHeader'
import Image from '../../components/image'
import parse from 'html-react-parser'
import { ErrorBoundary, useErrorHandler } from "react-error-boundary"
import ErrorFallback, { logger } from "../../components/error"
import './style.css';

export default function About() {
	return (
		<div className="aboutContainer">
			<ImageIntro imagePath={`${process.env.PUBLIC_URL}/bannerPhotos/bigtenchamps2017.jpg`} />
			<AboutBody />
		</div>
	)
}

function AboutBody() {

	const [loading, setLoading] = useState(true)
	const [about, setAbout] = useState({})
	const handleError = useErrorHandler()

	const getData = async () => {
		try {
			const { data } = await axios.get(`/data/about.json`)
			setAbout(data)
			setLoading(false)
		} catch (error) {
			console.log(error)
			handleError(error)
		}
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
				<div style={{ margin: "1rem 0" }}>
					<Post>
						{
							loading ? <Loading /> : parse(about.body)
						}
					</Post>
				</div>
			</ErrorBoundary>

			{
				loading ? <Loading /> :
					<>
						<SectionBanner>Executive Board</SectionBanner>
						<ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
							<EBoardContainer eboard={about.eboard} />
						</ErrorBoundary>
					</>
			}

		</>

	)
}

const EBoardContainer = ({ eboard }) => {
	return (
		eboard.map((post, index) => {
			return (
				<div key={index} className={`eboardContainer${(index % 2) ? " odd" : ""}`}>
					<ErrorBoundary fallback={<div>Error</div>} onError={logger}>
						<div className="executiveRole">{post.role}</div>
						<EBoardPeople people={post.people} />
					</ErrorBoundary>
				</div>
			)
		})

	)
}

function EBoardPeople({ people }) {
	return (
		<div className="executiveContainer">
			{
				people.map((item, index) => {
					return (
						<ErrorBoundary key={index} fallback={<div>Error</div>} onError={logger}>
							<EBoardPerson details={item} />
						</ErrorBoundary>
					)
				})
			}
		</div>
	)
}

const EBoardPerson = ({ details }) => {
	return (
		<div className="executiveInfo">
			{details.headshot && <Image alt="headshot" className="executiveHeadshot" width="5rem" height="7rem" src={`${process.env.PUBLIC_URL}/executiveHeadshots/${details.headshot}`} />}
			<div className="executiveName">{details.name}</div>
		</div>
	)
}