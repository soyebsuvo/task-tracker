import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useAllTasks(assignee, priority , start_date , end_date) {
    const parameter = `&assignee=${assignee}&priority=${priority}&start_date=${start_date}&end_date=${end_date}`;
    const { isPending, error, data : tasks , refetch} = useQuery({
        queryKey: [priority,assignee,start_date, end_date],
        queryFn: async () => {
            const pending = await axios.get(`http://localhost:5000/tasks?status=Pending${parameter}`)
            const inProgress = await axios.get(`http://localhost:5000/tasks?status=In Progress${parameter}`)
            const completed = await axios.get(`http://localhost:5000/tasks?status=Completed${parameter}`)
            const deployed = await axios.get(`http://localhost:5000/tasks?status=Deployed${parameter}`)
            const deferred = await axios.get(`http://localhost:5000/tasks?status=Deferred${parameter}`)
            return { pending, inProgress , completed , deployed , deferred };
        }
    })

    return [isPending, error, tasks , refetch]
}
