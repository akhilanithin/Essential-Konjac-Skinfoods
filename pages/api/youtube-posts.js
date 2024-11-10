import axios from "axios"
import { GOOGLE_API_KEY, SHORTS_PLAYLIST_ID, VIDEOS_PLAYLIST_ID, YOUTUBE_URL } from "../../utils/constants/constants"

export default async function handler(req, res) {
    let playListId = VIDEOS_PLAYLIST_ID
    if(req.params && req.params.videoType && req.params.videoType == "Shorts"){
        playListId = SHORTS_PLAYLIST_ID
    }
    let resp = await axios.get(`${YOUTUBE_URL}?part=snippet&maxResults=${ 10 }&playlistId=${playListId}&key=${GOOGLE_API_KEY}`)
    res.status(200).json(resp.data.items.filter((item) => item.snippet.thumbnails !== undefined && item.snippet.title !== "Private video"))
}