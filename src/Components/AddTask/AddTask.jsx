import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import moment from 'moment';

export default function AddTask({ refetch }) {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const time = moment().format('L');
        const times = time.split("/");
        const mainTime = `${times[2]}-${times[0]}-${times[1]}`
        console.log(mainTime)
        const postDoc = {
            title: data.title,
            priority: data.priority,
            desc: data.desc,
            assignee: data.assignee,
            teamName: data.teamName,
            status: "Pending",
            // email: user?.email,
            start_date: mainTime,
            end_date: data.deadline
        }
        const res = await axiosPublic.post("/tasks", postDoc);
        if (res.data.insertedId) {
            reset()
            refetch()
            document.getElementById('my_modal_5').close();
            Swal.fire({
                title: "Done!",
                text: "Task Added Succesfully",
                icon: "success"
            });
        }
    }
    return (
        <div>
            <button className="bg-[#216A9E] text-white py-1 px-5 rounded" onClick={() => document.getElementById('my_modal_5').showModal()}>Add New Task</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                    <h3 className="font-bold text-lg p-3">Create New Task</h3>
                    <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2"><span className="text-sm mt-3">Title : </span><input {...register("title")} required className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="title" id="title" /></div>
                            <div className="flex flex-col gap-2"><span className="text-sm mt-3">Description : </span><input {...register("desc")} required className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="desc" id="desc" /></div>
                            <div className="flex flex-col gap-2"><span className="text-sm mt-3">Team : </span><input {...register("teamName")} required className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="teamName" id="team" /></div>
                            <div className="flex flex-col gap-2"><span className="text-sm mt-3">Assignee : </span><input {...register("assignee")} required className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="assignee" id="assignee" /></div>
                            <div className="mt-5 flex gap-2 items-center">
                                <select {...register("priority")} required className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                                    <option value="">Priority</option>
                                    <option value="P0">P0</option>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                                </select>
                                <div className="flex items-center gap-1"><span>Deadline</span><input {...register("deadline")} required type="date" name="deadline" id="deadline" /></div>
                            </div>
                            <div className="flex justify-end items-center gap-2 mt-2">
                                <button type="submit" className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Submit</button>
                                {/* <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Reset</button> */}
                            </div>
                        </form>

                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="absolute top-3 right-4">
                            {/* if there is a button in form, it will close the modal */}
                            <button><IoMdClose /></button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
AddTask.propTypes = {
    refetch: PropTypes.func.isRequired
}