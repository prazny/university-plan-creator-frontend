import React from "react";
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";
import { IPlans } from "../../interfaces";

const columns: GridColumns<IPlans> = [
  { field: "year", headerName: "Year", flex: 1, minWidth: 200 },
  { field: "form", headerName: "Form", flex: 1, minWidth: 200 },
  {
    field: "number_of_semesters",
    headerName: "Number of semsters",
    flex: 1,
    minWidth: 200,
  },
  { field: "lang", headerName: "Language", flex: 1, minWidth: 200 },
  { field: "field_id", headerName: "Field Id", flex: 1, minWidth: 200 },
];

export const PlansList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPlans>();

  return (
    <>
      <List>
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </List>
    </>
  );
};
