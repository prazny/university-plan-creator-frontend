import React from "react";
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";
import { ISemester, IUser } from "../../interfaces";

const columns: GridColumns<IUser> = [
  { field: "id", headerName: "Numer użytkownika", flex: 1, minWidth: 200 },
  { field: "login", headerName: "Login", flex: 1, minWidth: 200 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 200 }
];

export const UsersList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IUser>();

  return (
    <>
      <List>
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </List>
    </>
  );
};
