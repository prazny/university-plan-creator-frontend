import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List
} from "@pankod/refine-mui";
import {IOpinion} from "../../interfaces";


const columns: GridColumns<IOpinion> = [
    {field: "user", headerName: "User", flex: 1, minWidth: 200},
    {field: "plan", headerName: "Plan", flex: 1, minWidth: 200},
    {field: "is_approved", headerName: "Approved", flex: 1, minWidth: 200},
    {field: "status", headerName: "Status", flex: 1, minWidth: 200}
];

export const OpinionList: React.FC = () => {
    const {dataGridProps} = useDataGrid<IOpinion>();

    return (
        <>
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight/>
            </List>
        </>
    );
};