import { BsThreeDotsVertical } from "react-icons/bs";

export default function AllTasks() {
    
    return (
        <div className="mx-auto h-full max-w-7xl px-20">
            <div className="border-2 border-white rounded-2xl h-full">
                <div className="flex justify-between items-center pr-4">
                    <div className="px-6 py-4 flex gap-3">
                        <div>
                            Filter By : <input className="rounded bg-[#F9F7FC] px-1" type="text" name="name" id="name" placeholder="Assignee Name" />
                        </div>
                        <select className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                            <option value="">Priority</option>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                        <div>
                            From : <input className="rounded bg-[#F9F7FC] px-1" type="date" name="date" id="date" />
                        </div>
                        <div>
                            To : <input className="rounded bg-[#F9F7FC] px-1" type="date" name="date" id="date" />
                        </div>
                    </div>
                    <div>
                        <button className="bg-[#216A9E] text-white py-1 px-5 rounded">Add New Task</button>
                    </div>
                </div>
                <div className="px-6">
                    <div>Sort By : <select className="rounded bg-[#F9F7FC] px-1" name="priority" id="priority">
                        <option value="">Priority</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 h-full p-3">
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#8C8B90] text-white rounded-t-2xl sticky top-0">Pending</h3>
                        {/* tasks */}
                        <div>
                            <div className="p-2">
                                <div className="p-3 bg-[#EEE] rounded">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold">Title</h3>
                                        <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">P0</h3>
                                    </div>
                                    <hr />
                                    <div>
                                        <p style={{ fontSize: "12px" }} className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem.</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <h3>@<span className="font-semibold text-sm">Assighneee</span></h3>
                                        <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button>
                                    </div>
                                    <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Assign</button>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="p-3 bg-[#EEE] rounded">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold">Title</h3>
                                        <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">P0</h3>
                                    </div>
                                    <hr />
                                    <div>
                                        <p style={{ fontSize: "12px" }} className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem.</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <h3>@<span className="font-semibold text-sm">Assighneee</span></h3>
                                        <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button>
                                    </div>
                                    <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Assign</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#E89924] text-white rounded-t-2xl">In Progress</h3>
                        <div>
                            <div className="p-2">
                                <div className="p-3 bg-[#EEE] rounded">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold">Title</h3>
                                        <h3 className="bg-[#256796] py-0 px-1 text-white font-bold text-sm rounded">P0</h3>
                                    </div>
                                    <hr />
                                    <div>
                                        <p style={{ fontSize: "12px" }} className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem.</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <h3>@<span className="font-semibold text-sm">Assighneee</span></h3>
                                        <button className="bg-[#256796] py-1 px-1 text-white font-bold rounded"> <BsThreeDotsVertical /></button>
                                    </div>
                                    <button className="bg-[#216A9E] text-white px-5 rounded py-1 text-sm mt-1">Assign</button>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#42A81E] text-white rounded-t-2xl">Completed</h3>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#353976] text-white rounded-t-2xl">Deployed</h3>
                    </div>
                    <div className="bg-white h-[340px] rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h3 className="text-center py-1 font-bold bg-[#F68871] text-white rounded-t-2xl">Deffered</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
