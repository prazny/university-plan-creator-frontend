import React from "react";
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";
import { ISemester } from "../../interfaces";

const columns: GridColumns<ISemester> = [
  { field: "semester_number", headerName: "Numer semestru", flex: 1, minWidth: 200 },
  { field: "max_ects_deficit", headerName: "Maks. deficyt ECTS", flex: 1, minWidth: 200 },
  { field: "field_id", headerName: "Field Id", flex: 1, minWidth: 200 },
];

export const SemestersList: React.FC = () => {
  const { dataGridProps } = useDataGrid<ISemester>();

  return (
    <>
      <List>
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </List>
    </>
  );
};
