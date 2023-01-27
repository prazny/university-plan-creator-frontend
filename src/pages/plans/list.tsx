import React from "react";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  ShowButton,
  GridToolbar,
} from "@pankod/refine-mui";
import { useMany } from "@pankod/refine-core";
import { IPlans, IField } from "../../interfaces";

enum Form {
  fulltime = "Full time",
  parttime = "Part time",
}

const columns: GridColumns<IPlans> = [
  { field: "field_name", headerName: "Field", flex: 1, minWidth: 200 },
  { field: "field_level", headerName: "Level", flex: 1, minWidth: 200 },
  { field: "year", headerName: "Year", flex: 1, minWidth: 200 },
  { field: "form", headerName: "Form", flex: 1, minWidth: 200 },
  { field: "lang", headerName: "Language", flex: 1, minWidth: 200 },
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
  },
];

export const PlansList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPlans>();

  const {
    rows,
    sortingMode,
    sortModel,
    onSortModelChange,
    filterMode,
    filterModel,
    onFilterModelChange,
    ...restDataGridProps
  } = dataGridProps;

  const { data } = useMany<IField>({
    resource: "fields",
    ids: rows.map((row) => row.field_id),
  });

  const rows_edited = rows.map((row) => {
    const field = data?.data.find((elem) => elem.id == row.field_id);
    return {
      ...row,
      field_name:
        (field?.name as string).charAt(0).toUpperCase() +
        (field?.name as string).slice(1),
      field_level:
        (field?.level as string).charAt(0).toUpperCase() +
        (field?.level as string).slice(1),
      form: row.form == "fulltime" ? Form.fulltime : Form.parttime,
      lang:
        (row.lang as string).charAt(0).toUpperCase() +
        (row.lang as string).slice(1),
    };
  });

  return (
    <>
      <List>
        <DataGrid
          {...restDataGridProps}
          rows={rows_edited}
          columns={columns}
          autoHeight
          filterModel={filterModel}
          onFilterModelChange={onFilterModelChange}
          sortModel={sortModel}
          onSortModelChange={onSortModelChange}
          components={{ Toolbar: GridToolbar }}
        />
      </List>
    </>
  );
};
