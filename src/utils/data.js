// export const dataSet =[
//     { 
//         data: [
//             { label: 'Connected', value: 2 },
//             { label: 'Not Connected', value: 2 },
//         ],
//         title: "Cloud Accounts",
//         isVisible: true,
//         id: 101
// },{
//     data: [
//         { label: 'Failed', value: 1689 },
//         { label: 'Warning', value: 681 },
//         { label: 'Not Available', value: 36 },
//         { label: 'Passed', value: 7253 },
//     ],
//     title: "Cloud Account Risk Assesment",
//     isVisible: true,
//     id: 102
// }];

export const CSPM = {
    id: '1',
    title: 'CSPM Executive Dashboard',
    data: [
        { 
            data: [
                { label: 'Connected', value: 2 },
                { label: 'Not Connected', value: 2 },
            ],
            title: "Cloud Accounts",
            isVisible: true,
            id: 101
    },{
        data: [
            { label: 'Failed', value: 1689 },
            { label: 'Warning', value: 681 },
            { label: 'Not Available', value: 36 },
            { label: 'Passed', value: 7253 },
        ],
        title: "Cloud Account Risk Assesment",
        isVisible: true,
        id: 102
    }]
}

export const CWPP = {
    id: '2',
    title: 'CWPP Dashboard',
    data: [
        { 
            data: [
                { label: 'Named Alerts', value: 2 },
                { label: 'Unnamed Alerts', value: 4 },
                { label: 'Intermitent Alerts', value: 16 },
                { label: 'Not-Found Alerts', value: 4 },
                { label: 'Warning Alert', value: 25 },
            ],
            title: "Top 5 Namespace Specific Alerts",
            isVisible: true,
            id: 201
    },{
        data: [
            // { label: 'Failed Alert', value: 30 },
            // { label: 'Not Available Alert', value: 13 },
        ],
        title: "Workload Alerts",
        isVisible: true,
        id: 202
    }]
}

export const Registory = {
    id: '3',
    title: 'Registory Scan',
    data: [{
        data: [
            { label: 'Critical', value: 10, color: 'bg-red-950' },
            { label: 'High', value: 20, color: 'bg-red-700' },
            { label: 'Medium', value: 30, color: 'bg-orange-400' },
            { label: 'Low', value: 30, color: 'bg-slate-500' },
        ],
        title: "Image Risk Assessmet",
        isVisible: true,
        id: 301
    },{
        data: [
    
        ],
        title: "Image Security",
        isVisible: false,
        id: 302
    }
    ]
}

// export const dataBullet = [{
//     data: [
//         { label: 'Critical', value: 10, color: 'bg-red-950' },
//         { label: 'High', value: 20, color: 'bg-red-700' },
//         { label: 'Medium', value: 30, color: 'bg-orange-400' },
//         { label: 'Low', value: 30, color: 'bg-slate-500' },
//     ],
//     title: "Image Risk Assessmet",
//     isVisible: true,
//     emptyData: false,
//     id: 201
// },{
//     data: [

//     ],
//     title: "Image Security",
//     isVisible: false,
//     emptyData: true,
//     id: 202
// }
// ]