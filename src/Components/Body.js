import AddWidgetCard from "./AddWidgetCard";
import BulletChart from "./BulletChart";
import WidgetCard from "./WidgetCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "../context/context";

const Body = ({addWidget , setDialogCategoryID}) => {

    const dataContext = useContext(DataContext)

    const CSPM = dataContext.CSPM;
    const CWPP = dataContext.CWPP;
    const Registory = dataContext.Registory;
    const didAPICall = dataContext.didAPICall;
    const setDidAPICall = dataContext.setDidAPICall

    return(
        <div className="body bg-slate-100 h-full min-h-screen w-screen pl-10 pr-1 pb-4">
            {/* Dashboard Header */}
            <div className="flex justify-between py-5">
            <div className="text-xl font-bold">CNAPP Dashboard</div>
            <div className="flex pr-4">
                <button className="flex border-[1.5px] border-slate-300 rounded-md px-3 bg-white text-base text-slate-500" onClick={()=> {addWidget(); setDialogCategoryID('1')}}>
                    Add Widge
                </button>
                <button className="border-[1.5px] border-slate-300 rounded-md px-1 mx-2 bg-white text-slate-500" onClick={()=>{setDidAPICall(!didAPICall)}}>
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

            {/* Dashboard Body */}
            <div className="dashboard-body">
            <div className="pl-2 pt-3 text-xl font-bold">{CSPM.title}</div>
            <div className="widget-container flex gap-2 overflow-x-scroll no-scrollbar py-3">
                {CSPM.data.map((value)=> <div key={value.id}><WidgetCard dataValue={value} category={CSPM.category}/></div>)}
                <AddWidgetCard addWidget={addWidget} id={CSPM.id} setDialogCategoryID={setDialogCategoryID}/>
            </div>

            <div className="pl-2 pt-3 text-xl font-bold">{CWPP.title}</div>
            <div className="widget-container flex gap-2 overflow-x-scroll no-scrollbar py-3">
                {CWPP.data.map((value)=> <div key={value.id}><WidgetCard dataValue={value} category={CWPP.category}/></div>)}
                <AddWidgetCard addWidget={addWidget} id={CWPP.id} setDialogCategoryID={setDialogCategoryID}/>
            </div>

            <div className="pl-2 pt-3 text-xl font-bold">{Registory.title}</div>
            <div className="widget-container flex gap-2 overflow-x-scroll no-scrollbar py-3">
                {Registory.data.map((value) => <div key={value.id}><BulletChart dataValue={value}/></div>)}
                <AddWidgetCard addWidget={addWidget} id={Registory.id} setDialogCategoryID={setDialogCategoryID}/>
            </div>
            </div>
        </div>
    )
}

export default Body;