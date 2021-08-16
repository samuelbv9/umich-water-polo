import { useState, useEffect } from 'react';
import axios from "axios"
import ImageIntro from '../../components/imageHeader'
import Post from "../../components/post";
import parse from 'html-react-parser'
import Loading from '../../components/loading';
import { ErrorBoundary, useErrorHandler } from "react-error-boundary"
import ErrorFallback, { logger } from "../../components/error"
import './style.css';


export default function Fundraising() {
    return (
        <div className="fundraisingBody">
            <ImageIntro imagePath={`${process.env.PUBLIC_URL}/bannerPhotos/cheer.jpg`} />
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
                <FundraisingBody />
            </ErrorBoundary>
        </div>
    )
}

const FundraisingBody = () => {
    const [page, setPage] = useState({})
    const [loading, setLoading] = useState(true)
    const handleError = useErrorHandler()

    const getData = async () => {
        try {
            const { data } = await axios.get(`/data/fundraising.json`)
            setPage(data)
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

    if (loading) {
        return <Loading />
    }
    else return (

        <div className="fundraisingPostContainer">
            <Post>
                {parse(page.message)}
                <img alt="headshot" className="fundraisingHeadshot" src={`${process.env.PUBLIC_URL}/executiveHeadshots/${page.image}`}></img>
                <div>{page.name},</div>
                <div>{page.position}</div>
            </Post>
        </div>
    )
}