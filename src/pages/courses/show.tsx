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
  TextareaAutosize,
} from "@pankod/refine-mui";
import { IPlans, IOpinion, IUser, ICourse } from "../../interfaces";

export const CourseShow: React.FC = () => {
  const { queryResult } = useShow<ICourse>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const show = [];

  for (var record_elem in record) {
    if (record_elem == "id") continue;

    let value_record = record[record_elem as keyof typeof record];

    if (record_elem != "")
      record_elem = (record_elem as string).replaceAll("_", " ");

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
          <Grid item key="semesters" xs={12}></Grid>
        </Grid>
      </Show>
    </>
  );
};
