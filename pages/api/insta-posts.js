import axios from "axios"
import { FACEBOOK_ACCESS_TOKEN, INSTAGRAM_URL } from "../../utils/constants/constants"

export default async function handler(req, res) {
    let resp = await axios.get(`${INSTAGRAM_URL}&limit=${10}&access_token=${FACEBOOK_ACCESS_TOKEN}`)
    res.status(200).json(resp.data.data)
}