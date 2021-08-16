import Image from "../image"

export default function introImage({ imagePath }) {
    return (
            <div>
                {imagePath && <div className="imageContainer">
                    <Image alt="welcome" width="100%" height="30vw" src={imagePath} />
                </div>}
            </div>
    )
}