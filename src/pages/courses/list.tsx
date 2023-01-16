import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List,
} from "@pankod/refine-mui";
import {ICourse, IFaculty} from "../../interfaces";


const columns: GridColumns<ICourse> = [
    {field: "code", headerName: "Code", flex: 1, minWidth: 100},
    {field: "name", headerName: "Name", flex: 1, minWidth: 200},
    {field: "type", headerName: "Type", flex: 1, minWidth: 100},
    {field: "ects", headerName: "ECTS", flex: 1, minWidth: 50},
    {field: "cnps", headerName: "CNPS", flex: 1, minWidth: 50},
    {field: "zzu", headerName: "ZZU", flex: 1, minWidth: 50}
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