import useAllTasks from "../../Hooks/useAllTasks";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import Pending from "../Pending/Pending";
import InProgress from "../InProgress/InProgress";
import Completed from "../Completed/Completed";
import Deployed from "../Deployed/Deployed";
import Deferred from "../Deferred/Deferred";
import AddTask from "../AddTask/AddTask";
export default function AllTasks() {
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [start_date, setStart_date] = useState("");
    const [end_date, setEnd_date] = useState("");
    const [, , tasks, refetch] = useAllTasks(assignee, priority, start_date, end_date);
    console.log(assignee, priority, start_date, end_date)
    const axiosPublic = useAxiosPublic();
    console.log(tasks?.pending?.data)

    const handleUpdate = async (event, id) => {
        event.preventDefault();
        const priority = event.target.priority.value;
        const status = event.target.status.value;
        const res = await axiosPublic.patch(`/tasks/${id}`, { priority, status })
        console.log(res.data);
        if (res.data.modifiedCount) {
            refetch()
            document.getElementById(id).close()
            Swal.fire({
                title: "Done!",
                text: "Task Updated Succesfully",
                icon: "success"
            });
        }
    }

    const handleDelete = async (id) => {
        const info = await axiosPublic.get(`/tasks/completed/${id}`)
        // console.log(info.data.isCompleted)
        if(info.data.isCompleted){            
            document.getElementById(`${id}2`).close();
            Swal.fire({
                title: "Sorry",
                text: "Completed task can not be deleted",
                icon: "error"
            });
            return;
        }
        const res = await axiosPublic.delete(`/tasks/${id}`);
        if (res.data.deletedCount) {
            refetch();            
            document.getElementById(`${id}2`).close();
            Swal.fire({
                title: "Done!",
                text: "Task Deleted Succesfully",
                icon: "success"
            });
        }
    }

    return (
        <div className="mx-auto h-full max-w-7xl px-10 md:px-20">
            <div className="border-2 border-white rounded-2xl h-full">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center pr-4">
                    {/* filtering section starts from here  */}
                    <div className="px-6 py-4 flex flex-col md:flex-row gap-3">
                        <div>
                            <span className="py-4 md:py-0">Filter By</span> : <input value={assignee} onChange={(e) => setAssignee(e.target.value)} className="rounded bg-[#F9F7FC] px-1" type="text" name="name" id="name" placeholder="Assignee Name" />
                        </div>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                            <option value="">Priority</option>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                        <div>
                            From : <input onChange={(e) => {setStart_date(e.target.value)}} className="rounded bg-[#F9F7FC] px-1" type="date" name="date" id="date" />
                        </div>
                        <div>
                            To : <input onChange={(e) => {setEnd_date(e.target.value)}} className="rounded bg-[#F9F7FC] px-1" type="date" name="date" id="date" />
                        </div>
                    </div>
                    {/* filter ends here  */}
                    <div className="pt-5 md:pt-0">
                        {/* Add button with modal  */}
                        <AddTask refetch={refetch}></AddTask>
                    </div>
                </div>
                <div className="px-6">
                    {/* sort by priority  */}
                    <div>Sort By Priority: <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                        {/* <option value="">Priority</option> */}
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select></div>
                </div>
                {/* tasks  */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 h-full p-3">
                    <Pending tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    <InProgress tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    <Completed tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    <Deployed tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    <Deferred tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                </div>
            </div>
        </div>
    )
}
