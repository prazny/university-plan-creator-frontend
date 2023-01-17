import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List, DeleteButton,
} from "@pankod/refine-mui";
import {IFaculty} from "../../interfaces";


const columns: GridColumns<IFaculty> = [
    {field: "name", headerName: "Name", flex: 1, minWidth: 350},
    {
        field: "actions", headerName: "Actions", renderCell: function render({row}) {
            return (
                <>
                    <DeleteButton hideText recordItemId={row.id}/>
                </>
            );
        }
    }
];

export const FacultyList: React.FC = () => {
    const {dataGridProps} = useDataGrid<IFaculty>();

    return (
        <>
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight/>
            </List>
        </>
    );
};