import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List, DeleteButton,
} from "@pankod/refine-mui";
import {IField} from "../../interfaces";


const columns: GridColumns<IField> = [
    {field: "name", headerName: "Name", flex: 1, minWidth: 350},
    {field: "profile", headerName: "Profile", flex: 1, minWidth: 350},
    {field: "level", headerName: "Level", flex: 1, minWidth: 350},
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

export const FieldList: React.FC = () => {
    const {dataGridProps} = useDataGrid<IField>();

    return (
        <>
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight/>
            </List>
        </>
    );
};