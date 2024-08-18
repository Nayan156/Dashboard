import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [CSPM, setCSPM] = useState({
        id: "1",
        title: 'CSPM Executive Dashboard',
        category: "CSPM",
        data: []
    })

    const [CWPP, setCWPP] = useState({
        id: '2',
        title: 'CWPP Dashboard',
        category: "CWPP",
        data: []
    })

    const [Registory, setRegistory] = useState({
        id: '3',
        title: 'Registory Scan',
        category: "Registory",
        data: []
    })

    const [didAPICall, setDidAPICall] = useState(false)

    const [searchText, setSeachText] = useState("");

    useEffect(()=>{
        fetchDataCSPM();
        fetchDataCWPP();
        fetchDataRegistory();
    },[didAPICall])

    const fetchDataCSPM = async () => {
        const data = await axios.get('http://localhost:3000/CSPM')
        setCSPM({
            ...CSPM,
            data: data.data
        })
    }

    const fetchDataCWPP = async () => {
        const data = await axios.get('http://localhost:3000/CWPP')
        setCWPP({
            ...CWPP,
            data: data.data
        })
    }

    const fetchDataRegistory = async () => {
        const data = await axios.get('http://localhost:3000/Registory')
        setRegistory({
            ...Registory,
            data: data.data
        })
    }

    const value = {
        CSPM,
        CWPP,
        Registory,
        didAPICall,
        setDidAPICall,
        searchText,
        setSeachText
    }

    return(
        <DataContext.Provider value={value}>{ children }</DataContext.Provider>
    )
}

export default DataContext;