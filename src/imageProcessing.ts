import sharp from "sharp";

interface sharpParams{
    source: string;
    target: string;
    width?: number,
    height?: number
}

const imageResize =async (params:sharpParams) => {
    await sharp(params.source)
    .resize(params.height,params.width, {fit: "contain"})
    .toFile(params.target)
}

export default imageResize;



