import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
	console.log("1", media);
	const imageUrl = media ? media.url : null;
	return imageUrl;
}
