import sharp, { fit } from "sharp";
const img = "./test123.jpg"
sharp(img)
.resize(1000,1000, {fit: "contain"})
.toFile("output.jpg")
