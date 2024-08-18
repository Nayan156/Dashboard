import { useContext, useEffect, useState } from 'react';
import ShimmerCard from "./ShimmerCard";
import DataContext from '../context/context';
import axios from 'axios';

const BulletChart = ({dataValue}) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const dataContext = useContext(DataContext);
    const didAPICall = dataContext.didAPICall;
    const setDidAPICall = dataContext.setDidAPICall;

    useEffect(()=>{
        setTotal(dataValue.data.reduce((total,data)=>{
            return total+Number(data.value)
        },0));
        setData(dataValue.data);
    },[])

    const handleChangeVissible = async (data) => {
        try {const result = await axios.put('http://localhost:3000/Registory/'+data.id, {
              ...data,
              "isVisible": !data.isVisible
        })
        if(result.status === 200) setDidAPICall(!didAPICall);}
        catch(err){
            console.log(err);
        }
      }

    return !dataValue.isVisible?"":(
        <div className="widget-card flex flex-col bg-white rounded-3xl pt-1 h-60 min-w-[450px] max-w-[450px] hover:grow-1">
        
        <div className='flex justify-between ml-4 mt-1 '>
              <div className='text-base font-bold'>{dataValue.title}</div>
              <button className='mr-3' onClick={()=>{handleChangeVissible(dataValue)}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </button>
        </div>
        
        {data.length!==0?<div>
        <div className="flex flex-col mx-5 mt-2">
        <div className="text-sm pb-[8px] flex">
            <div className="font-bold pr-1">{total}</div> Total Vulnerabilities
        </div>
        <div className="flex">
            {data.map((dataSet, index) => {
                const value = ((Number(dataSet.value)/total)*100).toString()+"%";
                let round = "";
                if(index === 0) round = " rounded-l-xl"
                else if(index === data.length-1) round = " rounded-r-xl"
                
                return <div key={data.label??index} className={dataSet.color+" h-4 w-full"+round} style={{width:value}}></div>
            })}
        </div>
        </div>

        <div className="flex flex-wrap ml-5 mt-5">
            {
                data.map((data)=>{
                    const color = data.color
                    const label = data.label
                    const value = (Math.round(Number(data.value)/total + "e+2"))

                    return(
                        <div key={data.label} className="flex pl-6 pt-6 w-1/2">
                            <div className={color+" h-4 w-4 mt-[2px] rounded-sm"}></div>
                            <div className="text-sm ml-2">{label+" ("+value+"%"+")"}</div>
                        </div>
                    )
                })
            }
        </div>
        </div>:<ShimmerCard />}
        </div>
    )
}

export default BulletChart;