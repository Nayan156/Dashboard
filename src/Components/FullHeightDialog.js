import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CSPMAddWidget from './categoryWidgetAdd/CSPMAddWidget';
import CWPPAddWidget from './categoryWidgetAdd/CWPPAddWidget';
import RegistoryAddWidget from './categoryWidgetAdd/RegistoryAddWidget';

// Custom styles for the Dialog
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    width: '700px', // Adjust the width as needed
    borderRadius: 0, // Optional: Remove border radius if you want sharp edges
    boxShadow: theme.shadows[5], // Optional: Add shadow for better visibility
  },
}));

const FullHeightDialog = ({ open, onClose, dialogCategoryID }) => {
    const [value, setValue] = useState('1');

    useEffect(()=>{
        setValue(dialogCategoryID);
    },[dialogCategoryID])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      aria-labelledby="full-height-dialog-title"
    >
        {/* Header */}
        <div className='flex flex-row justify-between bg-indigo-700 px-3 py-2 text-white'>
            <div>Add Widget</div>
            <button onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <DialogContent>
        {/* Body */}
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="CSPM" value="1" />
                            <Tab label="CWPP" value="2" />
                            <Tab label="Registory" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CSPMAddWidget />
                    </TabPanel>
                    <TabPanel value="2">
                        <CWPPAddWidget />
                    </TabPanel>
                    <TabPanel value="3">
                        <RegistoryAddWidget />
                    </TabPanel>
                </TabContext>
            </Box>
        </DialogContent>
    </CustomDialog>
  );
};

export default FullHeightDialog;