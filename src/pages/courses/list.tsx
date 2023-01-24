import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List, DeleteButton, ShowButton,
} from "@pankod/refine-mui";
import {ICourse} from "../../interfaces";


const columns: GridColumns<ICourse> = [
    {field: "code", headerName: "Code", flex: 1, minWidth: 50},
    {field: "name", headerName: "Name", flex: 1, minWidth: 200},
    {field: "completing_form", headerName: "Completing Form", flex: 1, minWidth: 50},
    {field: "type", headerName: "Type", flex: 1, minWidth: 50},
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

export const CourseList: React.FC = () => {
    const {dataGridProps} = useDataGrid<ICourse>();

    return (
        <>
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight/>
            </List>
        </>
    );
};