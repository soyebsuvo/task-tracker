import { BsThreeDotsVertical } from "react-icons/bs";
import useAllTasks from "../../Hooks/useAllTasks";
import Loader from "../Loader/Loader";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form"
import moment from "moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
// import { useState } from "react";
export default function AllTasks() {
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [start_date, setStart_date] = useState("");
    const [end_date, setEnd_date] = useState("");
    const [isPending, , tasks, refetch] = useAllTasks(assignee, priority, start_date, end_date);
    // const [task , setTask] = useState({});
    const axiosPublic = useAxiosPublic();
    console.log(tasks?.pending?.data)
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const time = moment().format('L');
        const mainTime = time.split("/").join("-");
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

    if (isPending) {
        return <Loader></Loader>
    }
    return (
        <div className="mx-auto h-full max-w-7xl px-20">
            <div className="border-2 border-white rounded-2xl h-full">
                <div className="flex justify-between items-center pr-4">
                    <div className="px-6 py-4 flex gap-3">
                        <div>
                            Filter By : <input value={assignee} onChange={(e) => {setAssignee(e.target.value) ; refetch()}} className="rounded bg-[#F9F7FC] px-1" type="text" name="name" id="name" placeholder="Assignee Name" />
                        </div>
                        <select value={priority} onChange={(e) => {setPriority(e.target.value);refetch()}} className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                            <option value="">Priority</option>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                        <div>
                            From : <input value={start_date} onClick={(e) => {setStart_date(e.target.value) ; refetch()}} className="rounded bg-[#F9F7FC] px-1" type="date" name="date" id="date" />
                        </div>
                        <div>
                            To : <input value={end_date} onClick={(e) => {setEnd_date(e.target.value); refetch()}} className="rounded bg-[#F9F7FC] px-1" type="date" name="date" id="date" />
                        </div>
                    </div>
                    <div>
                        {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
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
                                            <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Reset</button>
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
                </div>
                <div className="px-6">
                    <div>Sort By Priority: <select onChange={(e) => {setPriority(e.target.value); refetch()}} className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                        {/* <option value="">Priority</option> */}
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 h-full p-3">
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#8C8B90] text-white rounded-t-2xl sticky top-0 z-50">Pending</h3>
                        {/* tasks */}
                        <div>
                            {
                                tasks?.pending?.data?.map(item => <div key={item?._id} className="p-2">
                                    <div className="p-3 bg-[#EEE] rounded">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold">{item?.title}</h3>
                                            <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">{item?.priority}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ fontSize: "12px" }} className="">{item?.desc}</p>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <h3>@<span className="font-semibold text-sm">{item?.assignee}</span></h3>
                                            {/* <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button> */}

                                            <details className="dropdown">
                                                <summary className="btn btn-xs hover:bg-[#256796] bg-[#256796] text-white"><BsThreeDotsVertical /></summary>
                                                <ul className="p-2 shadow dropdown-content bg-base-100 rounded-lg w-24 absolute -right-2 top-8">
                                                    <li onClick={() => document.getElementById(`${item?._id}2`).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Delete</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={`${item?._id}2`} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Delete Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <h3 className="font-semibold">Do You Wish to delete Task?</h3>
                                                                <h2 className="text-xl font-bold my-3">{item?.title}</h2>
                                                                <div className="flex justify-end gap-3 items-center">
                                                                    <button onClick={() => handleDelete(item?._id)} className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Yes</button>
                                                                    <form method="dialog">
                                                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">No</button>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                            <div className="modal-action">
                                                                <form method="dialog" className="absolute top-3 right-4">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button><IoMdClose /></button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                    <hr />
                                                    <li onClick={() => document.getElementById(item?._id).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Edit</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={item?._id} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Edit Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <form onSubmit={(event) => handleUpdate(event, item?._id)}>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Title : </span><input defaultValue={item?.title} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="title" id="title" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Description : </span><input defaultValue={item?.desc} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="desc" id="desc" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Team : </span><input defaultValue={item?.teamName} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="teamName" id="team" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Assignee : </span><input defaultValue={item?.assignee} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="assignee" id="assignee" /></div>
                                                                    <div className="mt-5 flex gap-2 items-center">
                                                                        Priority : <select defaultValue={item?.priority} required className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                                                                            {/* <option value="">Priority</option> */}
                                                                            <option value="P0">P0</option>
                                                                            <option value="P1">P1</option>
                                                                            <option value="P2">P2</option>
                                                                        </select>
                                                                        Status : <select defaultValue={item?.status} required className="rounded bg-[#F9F7FC] px-1" name="status" id="status">
                                                                            <option value="Pending">Pending</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                            <option value="Completed">Completed</option>
                                                                            <option value="Deployed">Deployed</option>
                                                                            <option value="Deferred">Deferred</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex justify-end items-center gap-2 mt-2">
                                                                        <button type="submit" className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Update</button>
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
                                                </ul>
                                            </details>


                                        </div>
                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">{item?.status}</button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#E89924] text-white rounded-t-2xl sticky top-0 z-50">In Progress</h3>
                        <div>
                            {
                                tasks?.inProgress?.data?.map(item => <div key={item?._id} className="p-2">
                                    <div className="p-3 bg-[#EEE] rounded">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold">{item?.title}</h3>
                                            <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">{item?.priority}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ fontSize: "12px" }} className="">{item?.desc}</p>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <h3>@<span className="font-semibold text-sm">{item?.assignee}</span></h3>
                                            {/* <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button> */}
                                            <details className="dropdown">
                                                <summary className="btn btn-xs hover:bg-[#256796] bg-[#256796] text-white"><BsThreeDotsVertical /></summary>
                                                <ul className="p-2 shadow dropdown-content bg-base-100 rounded-lg w-24 absolute -right-2 top-8">
                                                    <li onClick={() => document.getElementById(`${item?._id}2`).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Delete</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={`${item?._id}2`} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Delete Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <h3 className="font-semibold">Do You Wish to delete Task?</h3>
                                                                <h2 className="text-xl font-bold my-3">{item?.title}</h2>
                                                                <div className="flex justify-end gap-3 items-center">
                                                                    <button onClick={() => handleDelete(item?._id)} className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Yes</button>
                                                                    <form method="dialog">
                                                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">No</button>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                            <div className="modal-action">
                                                                <form method="dialog" className="absolute top-3 right-4">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button><IoMdClose /></button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                    <hr />
                                                    <li onClick={() => document.getElementById(item?._id).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Edit</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={item?._id} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Edit Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <form onSubmit={(event) => handleUpdate(event, item?._id)}>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Title : </span><input defaultValue={item?.title} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="title" id="title" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Description : </span><input defaultValue={item?.desc} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="desc" id="desc" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Team : </span><input defaultValue={item?.teamName} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="teamName" id="team" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Assignee : </span><input defaultValue={item?.assignee} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="assignee" id="assignee" /></div>
                                                                    <div className="mt-5 flex gap-2 items-center">
                                                                        Priority : <select defaultValue={item?.priority} required className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                                                                            {/* <option value="">Priority</option> */}
                                                                            <option value="P0">P0</option>
                                                                            <option value="P1">P1</option>
                                                                            <option value="P2">P2</option>
                                                                        </select>
                                                                        Status : <select defaultValue={item?.status} required className="rounded bg-[#F9F7FC] px-1" name="status" id="status">
                                                                            <option value="Pending">Pending</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                            <option value="Completed">Completed</option>
                                                                            <option value="Deployed">Deployed</option>
                                                                            <option value="Deferred">Deferred</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex justify-end items-center gap-2 mt-2">
                                                                        <button type="submit" className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Update</button>
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
                                                </ul>
                                            </details>


                                        </div>
                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">{item?.status}</button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#42A81E] text-white rounded-t-2xl sticky top-0 z-50">Completed</h3>
                        <div>
                            {
                                tasks?.completed?.data?.map(item => <div key={item?._id} className="p-2">
                                    <div className="p-3 bg-[#EEE] rounded">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold">{item?.title}</h3>
                                            <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">{item?.priority}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ fontSize: "12px" }} className="">{item?.desc}</p>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <h3>@<span className="font-semibold text-sm">{item?.assignee}</span></h3>
                                            {/* <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button> */}
                                            <details className="dropdown">
                                                <summary className="btn btn-xs hover:bg-[#256796] bg-[#256796] text-white"><BsThreeDotsVertical /></summary>
                                                <ul className="p-2 shadow dropdown-content bg-base-100 rounded-lg w-24 absolute -right-2 top-8">
                                                    <li onClick={() => document.getElementById(`${item?._id}2`).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Delete</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={`${item?._id}2`} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Delete Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <h3 className="font-semibold">Do You Wish to delete Task?</h3>
                                                                <h2 className="text-xl font-bold my-3">{item?.title}</h2>
                                                                <div className="flex justify-end gap-3 items-center">
                                                                    <button onClick={() => handleDelete(item?._id)} className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Yes</button>
                                                                    <form method="dialog">
                                                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">No</button>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                            <div className="modal-action">
                                                                <form method="dialog" className="absolute top-3 right-4">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button><IoMdClose /></button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                    <hr />
                                                    <li onClick={() => document.getElementById(item?._id).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Edit</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={item?._id} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Edit Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <form onSubmit={(event) => handleUpdate(event, item?._id)}>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Title : </span><input defaultValue={item?.title} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="title" id="title" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Description : </span><input defaultValue={item?.desc} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="desc" id="desc" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Team : </span><input defaultValue={item?.teamName} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="teamName" id="team" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Assignee : </span><input defaultValue={item?.assignee} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="assignee" id="assignee" /></div>
                                                                    <div className="mt-5 flex gap-2 items-center">
                                                                        Priority : <select defaultValue={item?.priority} required className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                                                                            {/* <option value="">Priority</option> */}
                                                                            <option value="P0">P0</option>
                                                                            <option value="P1">P1</option>
                                                                            <option value="P2">P2</option>
                                                                        </select>
                                                                        Status : <select defaultValue={item?.status} required className="rounded bg-[#F9F7FC] px-1" name="status" id="status">
                                                                            <option value="Pending">Pending</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                            <option value="Completed">Completed</option>
                                                                            <option value="Deployed">Deployed</option>
                                                                            <option value="Deferred">Deferred</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex justify-end items-center gap-2 mt-2">
                                                                        <button type="submit" className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Update</button>
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
                                                </ul>
                                            </details>


                                        </div>
                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">{item?.status}</button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#353976] text-white rounded-t-2xl sticky top-0 z-50">Deployed</h3>
                        <div>
                            {
                                tasks?.deployed?.data?.map(item => <div key={item?._id} className="p-2">
                                    <div className="p-3 bg-[#EEE] rounded">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold">{item?.title}</h3>
                                            <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">{item?.priority}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ fontSize: "12px" }} className="">{item?.desc}</p>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <h3>@<span className="font-semibold text-sm">{item?.assignee}</span></h3>
                                            {/* <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button> */}
                                            <details className="dropdown">
                                                <summary className="btn btn-xs hover:bg-[#256796] bg-[#256796] text-white"><BsThreeDotsVertical /></summary>
                                                <ul className="p-2 shadow dropdown-content bg-base-100 rounded-lg w-24 absolute -right-2 top-8">
                                                    <li onClick={() => document.getElementById(`${item?._id}2`).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Delete</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={`${item?._id}2`} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Delete Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <h3 className="font-semibold">Do You Wish to delete Task?</h3>
                                                                <h2 className="text-xl font-bold my-3">{item?.title}</h2>
                                                                <div className="flex justify-end gap-3 items-center">
                                                                    <button onClick={() => handleDelete(item?._id)} className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Yes</button>
                                                                    <form method="dialog">
                                                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">No</button>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                            <div className="modal-action">
                                                                <form method="dialog" className="absolute top-3 right-4">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button><IoMdClose /></button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                    <hr />
                                                    <li onClick={() => document.getElementById(item?._id).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Edit</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={item?._id} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Edit Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <form onSubmit={(event) => handleUpdate(event, item?._id)}>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Title : </span><input defaultValue={item?.title} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="title" id="title" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Description : </span><input defaultValue={item?.desc} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="desc" id="desc" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Team : </span><input defaultValue={item?.teamName} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="teamName" id="team" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Assignee : </span><input defaultValue={item?.assignee} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="assignee" id="assignee" /></div>
                                                                    <div className="mt-5 flex gap-2 items-center">
                                                                        Priority : <select defaultValue={item?.priority} required className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                                                                            {/* <option value="">Priority</option> */}
                                                                            <option value="P0">P0</option>
                                                                            <option value="P1">P1</option>
                                                                            <option value="P2">P2</option>
                                                                        </select>
                                                                        Status : <select defaultValue={item?.status} required className="rounded bg-[#F9F7FC] px-1" name="status" id="status">
                                                                            <option value="Pending">Pending</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                            <option value="Completed">Completed</option>
                                                                            <option value="Deployed">Deployed</option>
                                                                            <option value="Deferred">Deferred</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex justify-end items-center gap-2 mt-2">
                                                                        <button type="submit" className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Update</button>
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
                                                </ul>
                                            </details>


                                        </div>
                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">{item?.status}</button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#F68871] text-white rounded-t-2xl sticky top-0 z-50">Deffered</h3>
                        <div>
                            {
                                tasks?.deferred?.data?.map(item => <div key={item?._id} className="p-2">
                                    <div className="p-3 bg-[#EEE] rounded">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold">{item?.title}</h3>
                                            <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">{item?.priority}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p style={{ fontSize: "12px" }} className="">{item?.desc}</p>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <h3>@<span className="font-semibold text-sm">{item?.assignee}</span></h3>
                                            {/* <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button> */}
                                            <details className="dropdown">
                                                <summary className="btn btn-xs hover:bg-[#256796] bg-[#256796] text-white"><BsThreeDotsVertical /></summary>
                                                <ul className="p-2 shadow dropdown-content bg-base-100 rounded-lg w-24 absolute -right-2 top-8">
                                                    <li onClick={() => document.getElementById(`${item?._id}2`).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Delete</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={`${item?._id}2`} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Delete Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <h3 className="font-semibold">Do You Wish to delete Task?</h3>
                                                                <h2 className="text-xl font-bold my-3">{item?.title}</h2>
                                                                <div className="flex justify-end gap-3 items-center">
                                                                    <button onClick={() => handleDelete(item?._id)} className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Yes</button>
                                                                    <form method="dialog">
                                                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">No</button>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                            <div className="modal-action">
                                                                <form method="dialog" className="absolute top-3 right-4">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button><IoMdClose /></button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                    <hr />
                                                    <li onClick={() => document.getElementById(item?._id).showModal()} className="py-1 cursor-pointer"><a className="font-semibold">Edit</a></li>
                                                    {/* <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button> */}
                                                    <dialog id={item?._id} className="modal modal-bottom sm:modal-middle">
                                                        <div style={{ padding: '0px' }} className="modal-box scrollbar-hide">
                                                            <h3 className="font-bold text-lg p-3">Edit Task</h3>
                                                            <div className="bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] p-5">
                                                                <form onSubmit={(event) => handleUpdate(event, item?._id)}>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Title : </span><input defaultValue={item?.title} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="title" id="title" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Description : </span><input defaultValue={item?.desc} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="desc" id="desc" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Team : </span><input defaultValue={item?.teamName} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="teamName" id="team" /></div>
                                                                    <div className="flex flex-col gap-2"><span className="text-sm mt-3">Assignee : </span><input defaultValue={item?.assignee} readOnly className="rounded bg-[#F9F7FC] px-1 py-1" type="text" name="assignee" id="assignee" /></div>
                                                                    <div className="mt-5 flex gap-2 items-center">
                                                                        Priority : <select defaultValue={item?.priority} required className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                                                                            {/* <option value="">Priority</option> */}
                                                                            <option value="P0">P0</option>
                                                                            <option value="P1">P1</option>
                                                                            <option value="P2">P2</option>
                                                                        </select>
                                                                        Status : <select defaultValue={item?.status} required className="rounded bg-[#F9F7FC] px-1" name="status" id="status">
                                                                            <option value="Pending">Pending</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                            <option value="Completed">Completed</option>
                                                                            <option value="Deployed">Deployed</option>
                                                                            <option value="Deferred">Deferred</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex justify-end items-center gap-2 mt-2">
                                                                        <button type="submit" className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Update</button>
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
                                                </ul>
                                            </details>


                                        </div>
                                        <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">{item?.status}</button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
