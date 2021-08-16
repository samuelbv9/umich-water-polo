import { useState } from "react"
import Spinner from "../spinner"

export default function Image({ src, width, height, alt, className }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div style={{ height, width, position:"relative" }} className = {className}>
            <img src={src}  onLoad={() => setIsLoaded(true)} style={isLoaded ? { objectFit: "cover", width, height } : { display: "none" }} alt={alt} />
            {!isLoaded && <div style={{ position: "absolute", width: "100px", height: "100px", top: "calc(50% - 50px)", left: "calc(50% - 50px)" }} >
            <Spinner size={100} thickness={140} speed={150} />
            </div>}
        </div>
    )
}
