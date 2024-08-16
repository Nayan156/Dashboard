import { useState } from 'react';
import {CWPP} from '../utils/data'
import Checkbox from '@mui/material/Checkbox';

const CWPPAddWidget = () =>{
    // const [data, setData] = useState({});
    const [formVisible, setFormVisible] = useState(false);

    const handleChangeVissible = (id) => {
        console.log(id);
    }

    return(
        <div>
            {formVisible?(<div>
                <div className='flex gap-48'>
                    <div className='hover:cursor-pointer' onClick={()=>{setFormVisible(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div>
                        CWPP Form
                    </div>
                </div>
                <div>

                </div>
                
            </div>):
            (<ul>
                {CWPP.data.map((data)=>
                (<li className='border-2 rounded-md flex my-2 hover:cursor-pointer' key={data.id} onClick={()=>{handleChangeVissible(data.id)}}>
                <Checkbox checked={data.isVisible}  color="default"/>
                <div className='mt-[9px] text-base text-slate-600'>{data.title}</div>
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