import AllTasks from "../Components/AllTasks/AllTasks";
import Navbar from "../Components/Navbar/Navbar";

export default function Home() {
  return (
    <div className='bg-gradient-to-br from-[#F4DAFA] to-[#D8DBFE] w-full min-h-screen'>
      <Navbar />
      <AllTasks />
    </div>
  )
}
