const AddWidgetCard = ({addWidget, setDialogCategoryID, id}) => {
    return(
        <div className="add-widget-card bg-white rounded-2xl h-60 min-w-[450px] flex flex-col justify-center hover:cursor-pointer" onClick={()=>{addWidget(); setDialogCategoryID(id)}}>
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div className="flex justify-center">
                Add Widget
            </div>
        </div>
    )
}

export default AddWidgetCard;