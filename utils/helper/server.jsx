import axios from 'axios'
import { toast } from 'react-toastify'
import { SERVER_BASEURL } from '../constants/constants'

const axiosClient = axios.create({
    baseURL: SERVER_BASEURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('loginToken')}`
    },
})

axiosClient.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if(error.response.data.message === "Forbidden"){
            location.href = "/auth/signin"
        }else{
            toast.error("Some thing went wrong. Please Try Again Later", {
                position: toast.POSITION.TOP_CENTER,
            })
            return Promise.reject(error)
        }
    },
)

export default axiosClient