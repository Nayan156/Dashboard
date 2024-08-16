import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import { useEffect, useState } from "react";
import FullHeightDialog from "./src/Components/FullHeightDialog";

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
            <div className="">
            <Header />
            </div>
            <Body addWidget={handleClickOpen} setDialogCategoryID={setDialogCategoryID}/>
            <FullHeightDialog open={open} onClose={handleClose} dialogCategoryID={dialogCategoryID}/>
        </div>
    )
}

export default App;