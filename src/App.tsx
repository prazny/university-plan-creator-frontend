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
} from "@pankod/refine-mui";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { FacultyList, OpinionList, PlansList } from "./pages";
import { CustomLayout } from "./components/layout";
import { CustomSider } from "./components/layout/sider";
import {FacultyCreate} from "./pages/faculties/create";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
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
              name: "opinions",
              list: OpinionList,
            },
            {
              name: "plans",
              list: PlansList,
            },
          ]}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
