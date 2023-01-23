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
} from "@pankod/refine-mui";
import { IPlans, IOpinion, IUser } from "../../interfaces";


export const OpinionShow: React.FC = () => {
  const { queryResult } = useShow<IOpinion>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const user_data = useOne<IUser>({
    resource: "users",
    id: record?.user_id,
  });
  const plan_data = useOne<IPlans>({
    resource: "plans",
    id: record?.plan_id,
  });

  const user_details = user_data.data?.data;
  const plan_details = plan_data.data?.data;
  console.log(user_details);
  console.log(plan_details);
  const show = [];

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
