import { useContext, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import DataContext from '../../context/context';

const RegistoryAddWidget = () =>{
    const [formVisible, setFormVisible] = useState(false);
    const dataContext = useContext(DataContext);
    const Registory = dataContext.Registory;
    const didAPICall = dataContext.didAPICall;
    const setDidAPICall = dataContext.setDidAPICall;
    const [title, setTitle] = useState("");
    const [critical, setCritical] = useState({
        label: "Critical",
        value: 0,
        color: "bg-red-950"
    })
    const [high, setHigh] = useState({
        label: "High",
        value: 0,
        color: "bg-red-700"
    })
    const [medium, setMedium] = useState({
        label: "Medium",
        value: 0,
        color: "bg-orange-400"
    })
    const [low, setLow] = useState({
        label: "Low",
        value: 0,
        color: "bg-slate-500"
    })


    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeCritical = (e) => {
        setCritical({
            ...critical,
            value: e.target.value
        })
    }

    const onChangeHigh = (e) => {
        setHigh({
            ...high,
            value: e.target.value
        })
    }

    const onChangeMedium = (e) => {
        setMedium({
            ...medium,
            value: e.target.value
        })
    }

    const onChangeLow = (e) => {
        setLow({
            ...low,
            value: e.target.value
        })
    }

    const setBlank = () => {
        setTitle("");
        setCritical({
            label: "Critical",
            value: 0,
            color: "bg-red-950"
        });
        setHigh({
            label: "High",
            value: 0,
            color: "bg-red-700"
        });
        setMedium({
            label: "Medium",
            value: 0,
            color: "bg-orange-400"
        });
        setLow({
            label: "Low",
            value: 0,
            color: "bg-slate-500"
        });
    }

    const onSubmit = () => {
        const finalObject = {
            "title": title,
            "data": [critical, high, medium, low],
            "isVisible": true
        }
        postWidget(finalObject);
    }

    const postWidget = async (object) => {
        try {const result = await axios.post('http://localhost:3000/Registory',object);
        if(result.status === 201){
            setBlank();
            setDidAPICall(!didAPICall);
            setFormVisible(false);
        }} catch(err){
            console.log(err);
        }
    }

    const deleteWidget = async (data) => {
        const result = await axios.delete('http://localhost:3000/Registory/'+data.id);
        if(result.status === 200){
            setDidAPICall(!didAPICall);
        }
    }

    const handleChangeVissible = async (data) => {
        const result = await axios.put('http://localhost:3000/Registory/'+data.id, {
            ...data,
            "isVisible": !data.isVisible
        })
        if(result.status === 200) setDidAPICall(!didAPICall);
    }

    return(
        <div>
            {formVisible?(<div>
                {/* Header */}
                <div className='flex gap-40'>
                        <div className='hover:cursor-pointer' onClick={()=>{setFormVisible(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                        <div className='text-lg'>Add New Widget</div>
                </div>
                {/* Body of Form */}
                <div className='mt-3 ml-9'>
                <div className='flex flex-col'>
                        <div className='flex'>
                        <div className='mt-[2px]'>Widget Name: </div>
                        <input type='text' min={0} name='title' onChange={(e)=>{onChangeTitle(e)}} value={title} className='border-[1.5px] rounded-md w-72 h-7 ml-2 px-2'/>
                        </div>
                        <div className='flex mt-5'>
                        <div className=''>Critical: </div>
                        <input type='number' min={0} name='Critical' onChange={(e)=>{onChangeCritical(e)}} value={critical.value} className='border-[1.5px] rounded-md w-72 h-7 ml-5 px-2'/>
                        </div>
                        <div className='flex mt-2'>
                        <div className=''>High: </div>
                        <input type='number' min={0} name='High' onChange={(e)=>{onChangeHigh(e)}} value={high.value} className='border-[1.5px] rounded-md w-72 h-7 ml-9 px-2'/>
                        </div>
                        <div className='flex mt-2'>
                        <div className=''>Medium: </div>
                        <input type='number' min={0} name='Medium' onChange={(e)=>{onChangeMedium(e)}} value={medium.value} className='border-[1.5px] rounded-md w-72 h-7 ml-3 px-2'/>
                        </div>
                        <div className='flex mt-2'>
                        <div className=''>Low: </div>
                        <input type='number' min={0} name='Low' onChange={(e)=>{onChangeLow(e)}} value={low.value} className='border-[1.5px] rounded-md w-72 h-7 ml-10 px-2'/>
                        </div>
                </div>
                <div className='mt-80 ml-64'>
                            <button className='border border-indigo-700 rounded-md py-1 px-5 text-base text-indigo-800 mr-2' onClick={()=>{setBlank();setFormVisible(false)}}>
                                Cancel
                            </button>
                            <button className='border border-indigo-700 rounded-md py-1 px-5 text-base text-white bg-indigo-700' onClick={()=>{onSubmit()}}>
                                Confirm
                            </button>
                        </div>
                </div>
                    
            </div>):
            (<ul>
                {Registory.data.map((data)=>
                (<li className='border-2 rounded-md flex my-2 justify-between' key={data.id} >
                <div className='flex hover:cursor-pointer' onClick={()=>{handleChangeVissible(data)}}>
                <Checkbox checked={data.isVisible}  color="default"/>
                <div className='mt-[9px] text-base text-slate-600'>{data.title}</div>
                </div>
                <button className='mr-2 text-red-600' onClick={()=>{deleteWidget(data)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                </li>))
                }
                <li className='border-2 rounded-md flex my-2 pb-2 pt-1 hover:cursor-pointer' onClick={()=>setFormVisible(true)}>
                <div className='mt-2 ml-3  text-slate-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <div className='mt-[6px] ml-3 text-base text-slate-600'>Add New Widget</div>
                </li>
            </ul>)}
        </div>
    )
}

export default RegistoryAddWidget;