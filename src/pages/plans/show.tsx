import { useShow, useOne, useMany } from "@pankod/refine-core";
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
} from "@pankod/refine-mui";
import { IPlans, IField, ICourse, ISemester } from "../../interfaces";
import { TreeView, TreeItem } from "@mui/lab";
import { JsxElement } from "typescript";

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

  let index = 0;
  rows_semester.forEach((semester) => {
    const show_activities = [] as Array<JSX.Element>;
    (semester.activities as Array<ICourse>).forEach((activity) => {
      let text = `Name: ${activity.name} ECTS: ${activity.ects}`;
      show_activities.push(
        <TreeItem nodeId={`${index++}`} label={text}></TreeItem>
      );
    });

    show_semesters.push(
      <TreeItem nodeId={`${index++}`} label={semester.semester_number}>
        {show_activities}
      </TreeItem>
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
            <TreeView
              aria-label="semesters view"
              defaultCollapseIcon={<GridExpandMoreIcon />}
              defaultExpandIcon={<GridKeyboardArrowRight />}
              sx={{
                height: 240,
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              {show_semesters}
            </TreeView>
          </Grid>
        </Grid>
      </Show>
    </>
  );
};
