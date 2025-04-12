import { Outlet } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default App;
