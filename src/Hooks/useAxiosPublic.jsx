import axios from "axios"

export default function useAxiosPublic() {
    const axiosPublic = axios.create({
        baseURL : "https://task-tracker-server-steel.vercel.app"
    })
  return axiosPublic;
}
