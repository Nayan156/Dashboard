import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import { useEffect, useState } from "react";
import FullHeightDialog from "./src/Components/FullHeightDialog";
import { DataContextProvider } from "./src/context/context";
import { Route, Routes } from "react-router-dom";
import SearchList from "./src/Components/SearchList";

const App = () => {
    const [open, setOpen] = useState(false);
    const [dialogCategoryID, setDialogCategoryID] = useState('1')

  useEffect(()=>{
    

    
  },[dialogCategoryID])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return(
        <div className="app">
          <DataContextProvider>
          <Header />
            <Routes>
              <Route path='/' element={<Body addWidget={handleClickOpen} setDialogCategoryID={setDialogCategoryID}/>} />
              <Route path='/search' element={<SearchList addWidget={handleClickOpen} setDialogCategoryID={setDialogCategoryID} />} />
            </Routes>
            <FullHeightDialog open={open} onClose={handleClose} dialogCategoryID={dialogCategoryID}/>
          </DataContextProvider>  
        </div>
    )
}

export default App;