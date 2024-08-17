import { useContext, useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import ShimmerCard from './ShimmerCard';
import DataContext from '../context/context';
import axios from 'axios';

const WidgetCard = ({dataValue , category}) =>{

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const dataContext = useContext(DataContext);
    const didAPICall = dataContext.didAPICall;
    const setDidAPICall = dataContext.setDidAPICall;

    useEffect(()=>{
        setData(dataValue.data);
        if(dataValue.data.length>6){
            setLegend(true);
        }
        setTotal(dataValue.data.reduce((total, obj)=>{
            return total + Number(obj.value);
        },0))
    },[])

    const handleChangeVissible = async (data) => {
      try{const result = await axios.put('http://localhost:3000/'+category+'/'+data.id, {
            ...data,
            "isVisible": !data.isVisible
      })
      if(result.status === 200) setDidAPICall(!didAPICall);}
      catch(err){
        console.log(err);
      }
    }

    const size = {
        width: 400,
        height: 210,
      };
      
      const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
      }));
      
      function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
          </StyledText>
        );
      }
          
    // return(
    //     <div className="widget-card bg-white rounded-3xl pt-1 h-60 min-w-[450px] max-w-[450px] hover:grow-1">
    //         <div className='ml-10 font-bold text-base'>Title</div>
    //         <div className='flex'>
    //         <PieChart className={legend?'-mr-4':'-ml-14'} series={[{ data: data, innerRadius: 70 }]} slotProps={{ legend: { hidden: legend } }}{...size}>
    //             <PieCenterLabel>Total: {total}</PieCenterLabel>
    //         </PieChart> 
    //         {legend? 
    //         <div className='mt-14 -ml-16 mr-16  font-medium text-xl'>
    //             <div className='flex justify-center'>{data.length}</div>
    //             <div>Legends</div>
    //             <div>Available</div>
    //         </div> : ""
    //         }
    //         </div>
    //     </div>
    // )

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
            {dataValue.data.length!==0?<PieChart 
            margin={{top: 10, bottom: 10, left: -70}} 
            series={[{ data: data, innerRadius: 70 }]} slotProps={{ legend: { hidden: false, labelStyle: {fontSize: 13,fill: 'black'}, itemMarkWidth: 15, itemMarkHeight: 15, markGap: 5, itemGap: 7 }, title:'Title' }}{...size}>
            <PieCenterLabel>Total: {total}</PieCenterLabel>
            </PieChart>:<ShimmerCard />}
        </div>
    )
}

export default WidgetCard;