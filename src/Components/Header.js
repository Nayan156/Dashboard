import { Link, useNavigate } from "react-router-dom";
import DataContext from "../context/context";
import { useContext, useState } from "react";

const Header = () => {
    const dataContext = useContext(DataContext);
    const searchText = dataContext.searchText;
    const setSeachText = dataContext.setSeachText;
    const [localSearchText, setLocalSearchText] = useState('')
    const [breadCrumbs, setBreadCrumbs] = useState(false)
    const navigate = useNavigate();

    const onChange = (e) => {
        setLocalSearchText(e.target.value);
    }

    const onSubmit = () => {
        setSeachText(localSearchText);
        navigate('/search');
        setLocalSearchText('');
        setBreadCrumbs(true)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          onSubmit();
        }
    };

    return(
        <div className="header flex flex-row mt-2 px-5 justify-between bg-white h-11 border-b-2">
            <div className="current-page p-1 text-bold">
                <Link to='/' onClick={()=>{setBreadCrumbs(false)}}>Home {">"}  Dashboard </Link>
                {breadCrumbs?"> Search":""}
            </div>
            <div className="search relative">
                <input className="border border-slate-300 rounded-md w-[500px] pl-10 pr-4 py-1 mr-2 bg-slate-100" placeholder="Search anything..." type="text" onKeyDown={handleKeyDown} onChange={(e)=>{onChange(e)}} value={localSearchText}/>
                <button className="absolute inset-y-0 left-0 pl-3 pb-1.5 flex items-center hover:cursor-pointer" onClick={onSubmit}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <div className="profile p-1 mr-1">
                {/* Your Profile */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>
    )
}

export default Header;