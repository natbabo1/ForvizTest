import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Test01 from "../tests/Test01/Test01";
import Test02 from "../tests/Test02/Test02";
import Test03 from "../tests/Test03/Test03";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/test-01" replace={true} />} />
        <Route path="/test-01" element={<Test01 />} />
        <Route path="/test-02" element={<Test02 />} />
        <Route
          path="/test-03"
          element={
            <Navigate
              to="/test-03/bookings/thisweek?roomId=A101"
              replace={true}
            />
          }
        />
        <Route path="/test-03/bookings/:period" element={<Test03 />} />
      </Route>
    </Routes>
  );
}

export default Router;
