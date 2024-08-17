import { useContext, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import DataContext from '../../context/context';

const CWPPAddWidget = () =>{
    const [formVisible, setFormVisible] = useState(false);
    const dataContext = useContext(DataContext);
    const CWPP = dataContext.CWPP;
    const didAPICall = dataContext.didAPICall;
    const setDidAPICall = dataContext.setDidAPICall;
    const [dataArray, setDataArray] = useState([])
    const [title, setTitle] = useState("");
    const [labelObject, setLabelObject] = useState({
        label: "",
        value: 0
    })

    const setBlank = () => {
        setDataArray([]);
        setTitle("");
        setLabelObject({
            label: "",
            value: 0
        })
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChange = (e) => {
        setLabelObject({
            ...labelObject,
            [e.target.name]: e.target.value
        })
    }

    const onAdd = () => {
        if(labelObject.label.length !== 0 && labelObject.label !== " "){
            if(labelObject.value>=0){
                setDataArray([...dataArray, {...labelObject}])
                setLabelObject({
                    label: "",
                    value: 0
                })
            }
            else{
                alert("Negative Value is not allowed");
            }
        }
        else{
            alert("Empty Label is not allowed");
        }
    }

    const onRemove = (index) => {
        setDataArray(dataArray.filter((value, i) => i!==index));
    }

    const onSubmit = () => {
        if(title.length!==0 && title !== ""){
            const finalObject = {
                "data": dataArray,
                "title": title,
                "isVisible": true
            }
            postWidget(finalObject);
        }
        else{
            alert("Widget name can not be Empty ");
        }
    }

    const postWidget = async (object) =>{
        try{
            const result = await axios.post('http://localhost:3000/CWPP',object);
            if(result.status === 201){
                setBlank();
                setDidAPICall(!didAPICall);
                setFormVisible(false);
            }
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteWidget = async (data) => {
        const result = await axios.delete('http://localhost:3000/CWPP/'+data.id);
        if(result.status === 200){
            setDidAPICall(!didAPICall);
        }
    }

    const handleChangeVissible = async (data) => {
        const result = await axios.put('http://localhost:3000/CWPP/'+data.id, {
            ...data,
            "isVisible": !data.isVisible
        })
        if(result.status === 200) setDidAPICall(!didAPICall);
    }

    return(
        <div>
            {formVisible?(<div>
                <div >
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
                        <div className='flex'>
                            <div className='mt-[2px]'>Widget Name: </div>
                            <input type='text' name='title' onChange={(e)=>{onChangeTitle(e)}} value={title} className='border-[1.5px] rounded-md w-72 h-7 ml-2 px-2'/>
                        </div>
                        <div className='w-96 h-80 px-2 pt-[1px] border rounded-sm ml-2 mt-5'>
                            {/* Map for data array will be placed here --Marker */}
                            {dataArray.length === 0?<div className='text-base text-slate-500 pl-2 pt-1'>All Labels Will Be Visible here...</div>:""}
                            {dataArray.map((data, index) => (<div key={data.label} className='flex py-1 px-2 bg-slate-200 rounded-md w-full justify-between my-2'>
                                <div className='text-sm'>{data.label}</div>
                                <button className='text-red-400 border border-red-400 rounded-md' onClick={()=>{onRemove(index)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>))}
                            
                        </div>
                        {(dataArray.length<8)?<div className='text-xs ml-2'>Fill Label and Value then click + button</div>:<div className='text-xs text-red-600 ml-2'>*Only 8 Labels are Allowed</div>}
                        <div className='mt-4 ml-2'>
                            <div className='flex mt-2'>
                                <div className='mt-[2px]'>Label:</div>
                                <input type='text' name='label' onChange={(e)=>{onChange(e)}} value={labelObject.label} className='border-[1.5px] rounded-md w-72 h-7 ml-2 px-2'/>
                            </div>
                            <div className='flex mt-2'>
                                <div className='mt-[2px]'>Value:</div>
                                <input type='number' name='value' onChange={(e)=>{onChange(e)}} value={labelObject.value} className='border-[1.5px] rounded-md w-40 h-7 ml-2 px-2'/>
                                <button className='border-[1.5px] rounded-md ml-24' onClick={onAdd} disabled={!(dataArray.length<8)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='mt-8 ml-64'>
                            <button className='border border-indigo-700 rounded-md py-1 px-5 text-base text-indigo-800 mr-2' onClick={()=>{setBlank();setFormVisible(false)}}>
                                Cancel
                            </button>
                            <button className='border border-indigo-700 rounded-md py-1 px-5 text-base text-white bg-indigo-700' onClick={()=>{onSubmit()}}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
                
                
            </div>):
            (<ul>
                {CWPP.data.map((data)=>
                (<li className='border-2 rounded-md flex justify-between my-2' key={data.id} >
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

export default CWPPAddWidget;