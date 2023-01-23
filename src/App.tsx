import { Refine } from "@pankod/refine-core";
import {
  ErrorComponent,
  ReadyPage,
  LightTheme,
  CssBaseline,
  ThemeProvider,
  GlobalStyles,
  RefineSnackbarProvider,
  notificationProvider,
  DarkTheme,
} from "@pankod/refine-mui";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { FacultyList, OpinionList, PlansList } from "./pages";
import { CustomLayout } from "./components/layout";
import { CustomSider } from "./components/layout/sider";

import { FacultyCreate } from "./pages/faculties/create";
import { FieldList } from "./pages/fields";
import { FieldCreate } from "./pages/fields/create";
import { PlanCreate } from "./pages/plans/create";
import { SemestersList } from "./pages/semesters";
import { SemesterCreate } from "./pages/semesters/create";
import { PlanShow } from "./pages/plans/show";
import { OpinionCreate } from "./pages/opinions/create";
import { UsersList } from "./pages/users";
import { UserCreate } from "./pages/users/create";
import { OpinionShow } from "./pages/opinions/show";



const App: React.FC = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("http://127.0.0.1:8000/api")}
          notificationProvider={notificationProvider}
          Layout={CustomLayout}
          ReadyPage={ReadyPage}
          Sider={CustomSider}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "faculties",
              list: FacultyList,
              create: FacultyCreate,
            },
            {
              name: "fields",
              list: FieldList,
              create: FieldCreate,
            },
            {
              name: "opinions",
              list: OpinionList,
              create: OpinionCreate,
              show: OpinionShow
            },
            {
              name: "plans",
              list: PlansList,
              show: PlanShow,
              create: PlanCreate,
            },
            {
              name: "semesters",
              list: SemestersList,
              create: SemesterCreate,
            },
            {
              name: "users",
              list: UsersList,
              create: UserCreate
            }
          ]}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
