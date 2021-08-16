import Spinner from "../spinner"
import "./style.css"
export default function Loading() {
    return (
        <div className = "loadingCenter">
            <Spinner size={100} thickness={140} speed={150} />
        </div>
    )
}