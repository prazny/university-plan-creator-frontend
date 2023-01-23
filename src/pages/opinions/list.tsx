import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    ShowButton
} from "@pankod/refine-mui";
import {IOpinion} from "../../interfaces";


const columns: GridColumns<IOpinion> = [
    {field: "is_approved", headerName: "Approved", flex: 1, minWidth: 100},
    {field: "status", headerName: "Status", flex: 1, minWidth: 100},
    {field: "user_id", headerName: "User identifier", flex: 1, minWidth: 100},
    {field: "plan_id", headerName: "Plan identifier", flex: 1, minWidth: 100},
    {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
    }
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