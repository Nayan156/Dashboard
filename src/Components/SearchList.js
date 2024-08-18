import { useContext, useEffect, useState } from "react";
import DataContext from "../context/context";
import WidgetCard from "./WidgetCard";
import BulletChart from "./BulletChart";

const SearchList = ({addWidget , setDialogCategoryID}) => {
    const dataContext = useContext(DataContext);
    const searchText = dataContext.searchText;
    const CSPM = dataContext.CSPM;
    const CWPP = dataContext.CWPP;
    const Registory = dataContext.Registory;
    const didAPICall = dataContext.didAPICall;
    


    return(
        <div className="search bg-slate-100 h-full min-h-screen w-screen pl-10 pr-1 pb-4">
            {/* Search List Header */}
            <div className="flex justify-between py-5">
            <div className="text-xl font-bold">Dashboard Search</div>
            <div className="flex pr-4">
                <button className="flex border-[1.5px] border-slate-300 rounded-md px-3 bg-white text-base text-slate-500" onClick={()=> {addWidget(); setDialogCategoryID('1')}}>
                    Add Widge
                </button>
                <button className="border-[1.5px] border-slate-300 rounded-md px-1 mx-2 bg-white text-slate-500" onClick={()=>{}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                </button>
                <button className="flex border-[1.5px] border-indigo-700 rounded-md px-1 mx-2 bg-white text-indigo-700">
                    <div className="mr-1 pr-1 border-r border-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div>
                        Last 2 days
                    </div>
                </button>
            </div>
            </div>
            {/* search body */}
            <div className="search-dashboard-body">
            <div className="pl-2 pt-3 text-xl flex font-bold"><div>Searched Title:</div> <div className="ml-3">{(searchText.length===0?"All Widgets":searchText.toUpperCase())}</div></div>
            <div className="widget-container flex flex-wrap no-scrollbar py-3">
            {CSPM.data.filter((value)=> value.title.toLowerCase().includes(searchText.toLowerCase())).map((value)=> <div className='mr-2 mt-2' key={value.id}><WidgetCard dataValue={value} category={CSPM.category}/></div>)}
            {CWPP.data.filter((value)=> value.title.toLowerCase().includes(searchText.toLowerCase())).map((value)=> <div className='mr-2 mt-2' key={value.id}><WidgetCard dataValue={value} category={CWPP.category}/></div>)}
            {Registory.data.filter((value)=> value.title.toLowerCase().includes(searchText.toLowerCase())).map((value) => <div className='mr-2 mt-2' key={value.id}><BulletChart dataValue={value}/></div>)}
            </div>
            </div>
        </div>
    )
}

export default SearchList;