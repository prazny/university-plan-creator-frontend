import { useShow, useOne, useMany, useApiUrl } from "@pankod/refine-core";
import {
  Show,
  Typography,
  Stack,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  Divider,
  Card,
  CardContent,
  Grid,
  List,
  DataGrid,
  useDataGrid,
  GridColumns,
  minWidth,
  GridExpandMoreIcon,
  GridAddIcon,
  GridViewHeadlineIcon,
  GridFilterListIcon,
  GridKeyboardArrowRight,
  DeleteButton,
  CreateButton,
  EditButton,
  GridToolbar,
} from "@pankod/refine-mui";
import { IPlans, IField, ICourse, ISemester } from "../../interfaces";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { JsxElement } from "typescript";
import React from "react";
import { axiosInstance } from "@pankod/refine-simple-rest";

export const PlanShow: React.FC = () => {
  const { queryResult } = useShow<IPlans>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const data2 = useOne<IField>({
    resource: "fields",
    id: record?.field_id,
  });

  //   const rows_edited = rows.filter((row) =>
  //   });

  const field_data = data2.data?.data;

  const show = [];

  var field_name =
    field_data != undefined
      ? field_data.name.charAt(0).toUpperCase() + field_data.name.slice(1)
      : "";

  //   Add field name
  show.push(
    <Grid item xs={6} key="field_name">
      <Card
        sx={{ minWidth: 200 }}
        style={{ flex: 1, backgroundColor: "#353434" }}
      >
        <CardContent>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Field:
            </Typography>
            <TextField variant="h6" value={field_name} />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );

  var field_level =
    field_data != undefined
      ? field_data.level.charAt(0).toUpperCase() + field_data.level.slice(1)
      : "";

  //   Add field level
  show.push(
    <Grid item xs={6} key="field_level">
      <Card
        sx={{ minWidth: 200 }}
        style={{ flex: 1, backgroundColor: "#353434" }}
      >
        <CardContent>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Level:
            </Typography>
            <TextField variant="h6" value={field_level} />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );

  enum Form {
    fulltime = "Full time",
    parttime = "Part time",
  }

  for (var record_elem in record) {
    if (
      record_elem == "id" ||
      record_elem == "opinions" ||
      record_elem == "field_id" ||
      record_elem == "semesters"
    )
      continue;

    let value_record = record[record_elem as keyof typeof record];

    if (record_elem != "")
      record_elem = (record_elem as string).replaceAll("_", " ");

    if (record_elem == "form")
      value_record = Form[value_record as keyof typeof Form];

    if (record_elem == "lang") record_elem = "Language";

    show.push(
      <Grid item xs={6} key={record_elem}>
        <Card
          sx={{ minWidth: 200 }}
          style={{ flex: 1, backgroundColor: "#353434" }}
        >
          <CardContent>
            <Stack
              gap={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h5" fontWeight="bold">
                {record_elem.charAt(0).toUpperCase() + record_elem.slice(1)}:
              </Typography>
              <TextField variant="h6" value={value_record} />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  enum Profile {
    practical = "Practical",
    academic = "Academic",
  }

  show.push(
    <Grid item xs={6} key="field_profile">
      <Card
        sx={{ minWidth: 200 }}
        style={{ flex: 1, backgroundColor: "#353434" }}
      >
        <CardContent>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Profile:
            </Typography>
            <TextField
              variant="h6"
              value={Profile[field_data?.profile as keyof typeof Profile]}
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );

  if (record?.semesters != undefined) {
    (record?.semesters as Array<ISemester>).forEach((elem) =>
      console.log(elem.id)
    );
  }

  const rows_semester =
    record?.semesters != undefined
      ? (record.semesters as Array<ISemester>)
      : ([] as Array<ISemester>);

  const show_semesters = [] as Array<JSX.Element>;
  const show_activities = [] as Array<JSX.Element>;

  let index = 1;

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const apiUrl = useApiUrl();

  const removeCourse = (semester_id: number, course_id: number) => {
    axiosInstance
      .delete(`${apiUrl}/semesters/${semester_id}/${course_id}`)
      .then((response) => window.location.reload());
  };

  rows_semester
    .sort((elem1, elem2) => elem1.semester_number - elem2.semester_number)
    .forEach((semester) => {
      show_semesters.push(
        <Tab
          label={semester.semester_number + " semester"}
          value={`${index}`}
        />
      );

      const columns_activities: GridColumns<ICourse> = [
        { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
        { field: "ects", headerName: "ECTS", flex: 1, minWidth: 200 },
        {
          field: "actions",
          headerName: "Actions",
          renderCell: function render({ row }) {
            return (
              <>
                <DeleteButton
                  hideText
                  onClick={() => removeCourse(semester.id, row.id)}
                />
              </>
            );
          },
        },
      ];

      show_activities.push(
        <TabPanel value={`${index++}`}>
          <div style={{ height: 500 }}>
            <EditButton
              resourceNameOrRouteName="semesters"
              hideText={true}
              recordItemId={semester.id}
            />
            <Card>
              <CardContent>
                Max deficit of ects: {semester.max_ects_deficit}
              </CardContent>
            </Card>
            <DataGrid
              rows={semester.activities}
              columns={columns_activities}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </TabPanel>
      );
    });
  console.log(show_semesters);

  return (
    <>
      <Show isLoading={isLoading}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {show}
          <Grid item key="semesters" xs={12}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="semester tabs">
                  {show_semesters}
                </TabList>
              </Box>

              {show_activities}
            </TabContext>
          </Grid>
        </Grid>
      </Show>
    </>
  );
};
