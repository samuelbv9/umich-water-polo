import { useState, useEffect, lazy, Suspense } from "react"
import axios from "axios"
import Post from "../../components/post";
import AliceCarousel from "react-alice-carousel";
import Image from "../../components/image"
import Paper from "@material-ui/core/Paper"
import Spinner from "../../components/spinner"
import CountUp from "../../components/countUp"
import { ErrorBoundary, useErrorHandler } from "react-error-boundary"
import ErrorFallback, { logger } from "../../components/error"
import "./style.css";
import "react-alice-carousel/lib/alice-carousel.css";

const AlumniNetwork = lazy(() => import('../../components/alumni'));

const Loading = ({ style, isMobile }) => {
	return (
		<div style={style} className={`carouselContainer slideshowContainer${isMobile ? " mobile" : ""}`}>
			<Spinner size={100} thickness={140} speed={150} />
		</div>
	)
}

export default function Home() {
	return (
		<div className="bodyContainer">
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
				<Carousel />
			</ErrorBoundary>
			<h2 className="quote">Hail to the victors.</h2>
			<div className="championBanner">
				<ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
					<Paper className="championBannerItem" elevation={3}><span><b><CountUp to={100} duration={2} />+</b></span>First Team All&#x2011;Americans</Paper>
					<Paper className="championBannerItem" elevation={3}><span><b><CountUp to={3} duration={1} />x</b></span>National Champions</Paper>
					<Paper className="championBannerItem" elevation={3}><span><b><CountUp to={14} duration={1} />x</b></span>Big Ten Champions</Paper>
					<Paper className="championBannerItem" elevation={3}><span><b><CountUp to={100} duration={2} />+</b></span>Academic All&#x2011;Americans</Paper>
				</ErrorBoundary>
			</div>
			<div style={{ marginTop: "4rem" }}>
				<ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
					<Updates />
				</ErrorBoundary>
			</div>
			<div style={{ marginTop: "4rem" }}>
				<h4 className="homeSubTitle">Alumni Network</h4>
				<div className="alumniSubtitle">
					Our Alumni work all across the globe and provide the team with an invaluable networking resource.
				</div>
				<ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
					<Suspense fallback={<Loading style={{ height: "120px" }} />}>
						<AlumniNetwork />
					</Suspense>
				</ErrorBoundary>
			</div>

		</div>
	)
}


function useLayout() {
	const [layout, setLayout] = useState("desktop");
	useEffect(() => {
		function updateLayout() {
			setLayout(window.innerWidth > window.innerHeight ? "desktop" : "mobile");
		}
		window.addEventListener('resize', updateLayout);
		updateLayout();
		return () => window.removeEventListener('resize', updateLayout);
	}, []);
	return layout;
}

function Carousel() {
	const [photos, setPhotos] = useState([])
	const [loading, setLoading] = useState(true)
	const [activePhoto, setActivePhoto] = useState(0)

	const handleError = useErrorHandler()
	const layout = useLayout()

	const slideTo = (i) => setActivePhoto(i)
	const slideNext = () => setActivePhoto(i => (i + 1) % photos[layout].length)
	const slidePrev = () => setActivePhoto(i => (i - 1) % photos[layout].length)

	const getPhotos = async () => {
		try {
			const { data } = await axios.get("/data/slideshow.json")
			setPhotos(data)
			setLoading(false)
		} catch (error) {
			console.log(error)
			handleError(error)
		}
	}

	useEffect(() => {
		getPhotos()
		// eslint-disable-next-line
	}, [])

	if (loading) {
		return (
			<Loading isMobile={layout === "mobile"} />
		)
	} else if (photos[layout].length === 0) {
		return <div />
	} else return (
		<>
			<div className="carouselContainer">
				<img
					className="arrow"
					onClick={() => slidePrev()}
					alt="arrow"
					src={`${process.env.PUBLIC_URL}/icons/left.svg`}
				/>

				<div className={`slideshowContainer${layout === "mobile" ? " mobile" : ""}`}>
					<AliceCarousel
						autoPlayInterval={5000}
						autoPlay={true}
						fadeOutAnimation={true}
						stopAutoPlayOnHover={false}
						buttonsDisabled={true}
						dotsDisabled={true}
						slideToIndex={activePhoto}
						onSlideChanged={e => slideTo(e.item)}
					>
						{photos[layout].map((link) => {
							return (
								<Image
									key={link}
									width="100%"
									height={layout === "mobile" ? "105vw" : "30vw"}
									src={`${process.env.PUBLIC_URL}/bannerPhotos/${link}`}
									alt="slideshow"
									className={`pictureSlides${layout === "mobile" ? " mobile" : ""}`}
								/>
							)
						})}
					</AliceCarousel>
				</div>
				<img
					className="arrow"
					alt="arow"
					onClick={() => slideNext()}
					src={`${process.env.PUBLIC_URL}/icons/right.svg`}
				/>
			</div>
			<div className="dotsHolder">
				{(Array.from(Array(photos[layout].length))).map((_, value) => {
					return (
						<div onClick={() => setActivePhoto(value)} key={value} className={`carouselDot${activePhoto === value ? " active" : ""}`} />
					)
				})}
			</div>
		</>
	)
}

function Updates() {
	const [updates, setUpdates] = useState()
	const [loading, setLoading] = useState(true)
	const handleError = useErrorHandler()

	const getUpdates = async () => {
		try {
			const { data } = await axios.get("/data/news.json")
			setUpdates(data.news.slice(0, 3))
			setLoading(false)
		} catch (error) {
			console.log(error)
			handleError(error)
		}
	}

	useEffect(() => {
		getUpdates()
		// eslint-disable-next-line
	}, [])

	if (loading) {
		return (
			<>
				<Loading />
			</>
		)
	} else return (
		<>
			<h4 className="homeSubTitle">Recent Updates</h4>
			{updates.map((post, index) => {
				return (
					<div className="homeUpdateContainer" key={index}>
						<Post
							date={post.date}
							title={post.title}
							index={index}
						>
							{post.content}
						</Post>
					</div>
				);
			})}
		</>
	)
}

