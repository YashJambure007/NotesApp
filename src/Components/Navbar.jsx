import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-10">

        <NavLink
        to="/"
        >
            Home
        </NavLink>

        <NavLink
        to="/pastes"
        
        >
            Pastes
        </NavLink>
      
    </div>
  )
}

export default Navbar
