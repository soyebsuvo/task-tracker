import { FaUser } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="max-w-7xl mx-auto px-24">
            <div className="flex justify-between">
                <div>Logo</div>
                <div><FaUser /></div>
            </div>
        </div>
    )
}
