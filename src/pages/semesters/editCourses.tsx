import React from "react";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Create,
  TextField,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Edit,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  EditButton,
  Button,
  GridAddIcon,
  GridRemoveIcon,
  DeleteButton,
  CreateButton,
  Show,
  SaveButton,
  CloneButton,
  GridToolbar,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";
import { ICourse, ISemester } from "../../interfaces";
import {
  useApiUrl,
  useCustomMutation,
  useList,
  useNavigation,
  useOne,
  useShow,
  useTable,
  useUpdate,
} from "@pankod/refine-core";
import { axiosInstance } from "@pankod/refine-simple-rest";

const columns: GridColumns<ICourse> = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 350 },
];

export const SemesterEditCourses: React.FC = () => {
  const { tableQueryResult } = useTable<ICourse>({
    resource: "courses",
  });
  const { queryResult } = useShow<ISemester>();
  const { data, isLoading } = queryResult;

  const semester_id = data != undefined ? data.data.id : -1;
  const semester_activities =
    data != undefined
      ? (data.data.activities as Array<ICourse>)
      : ([] as Array<ICourse>);

  const rows_courses = tableQueryResult.data?.data ?? [];

  const apiUrl = useApiUrl();
  const addCourse = (semester_id: number, course_id: number) => {
    axiosInstance
      .patch(
        `${apiUrl}/semesters/${semester_id}/${course_id}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => window.location.reload());
  };

  const removeCourse = (semester_id: number, course_id: number) => {
    axiosInstance
      .delete(`${apiUrl}/semesters/${semester_id}/${course_id}`)
      .then((response) => window.location.reload());
  };

  const columns_courses: GridColumns<ICourse> = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
    { field: "code", headerName: "Code", flex: 1, minWidth: 100 },
    {
      field: "ects",
      headerName: "ECTS",
      flex: 1,
      minWidth: 100,
      type: "number",
    },
    {
      field: "cnps",
      headerName: "CNPS",
      flex: 1,
      minWidth: 100,
      type: "number",
    },
    {
      field: "zzu",
      headerName: "ZZU",
      flex: 1,
      minWidth: 100,
      type: "number",
    },
    {
      field: "bu",
      headerName: "BU",
      flex: 1,
      minWidth: 100,
      type: "number",
    },
    {
      field: "hours_count",
      headerName: "Hours count",
      flex: 1,
      minWidth: 100,
      type: "number",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "completing_form",
      headerName: "Completing form",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "course_form",
      headerName: "Course form",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: function render({ row }) {
        return (
          <>
            {semester_activities.find((activity) => activity.id == row.id) ==
            undefined ? (
              <CloneButton
                onClick={() => addCourse(semester_id, row.id)}
                hideText={true}
              ></CloneButton>
            ) : (
              <DeleteButton
                onClick={() => removeCourse(semester_id, row.id)}
                hideText={true}
              ></DeleteButton>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Show
        isLoading={isLoading}
        title="Edit activities in semester"
        canEdit={false}
      >
        <div style={{ height: 500 }}>
          <DataGrid
            rows={rows_courses}
            columns={columns_courses}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </Show>
    </>
  );
};
