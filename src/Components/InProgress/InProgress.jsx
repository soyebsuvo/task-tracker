import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';
export default function InProgress({tasks , handleDelete , handleUpdate}) {
    return (
        <div>
            <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                <h3 className="text-center py-1 font-bold bg-[#E89924] text-white rounded-t-2xl sticky top-0 z-50">In Progress</h3>
                <div>
                    {
                        tasks?.inProgress?.data?.map(item => <div title={`From ${item?.start_date} To ${item?.end_date}`} key={item?._id} className="p-2">
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
    )
}

InProgress.propTypes = {
    tasks : PropTypes.object.isRequired,
    handleDelete : PropTypes.func.isRequired,
    handleUpdate : PropTypes.func.isRequired
}