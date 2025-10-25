import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Dashboard from "./component/Dashboard";
import AdminLogin from "./Pages/Login/AdminLogin";
import AddPatientPage from "./Pages/Faculty/AddPatientPage";
import ViewPatient from "./Pages/Faculty/ViewPatient/ViewPatient";
import EditPatient from "./Pages/Faculty/EditPatient/EditPatient";
import SoberPeriodPrediction from "./Pages/Faculty/PredictPatient/SoberPeriodPrediction";
import RiskLevelPrediction from "./Pages/Faculty/PredictPatient/RiskLevelPrediction";
import AAOPrediction from "./Pages/Faculty/PredictPatient/AAOPrediction";
import DashboardFaculty from "./component/FacultyPanel/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Topbar from "./component/Topbar/Topbar";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Topbar />
        <Routes>
          <Route path="/admin/:id" element={<Dashboard />}></Route>
          <Route path="/login" element={<AdminLogin />}></Route>
          <Route path="/patientadd/:id" element={<AddPatientPage />}></Route>
          <Route path="/admin/add-patient" element={<AddPatientPage />}></Route>
          <Route path="/patientview/:id" element={<ViewPatient />}></Route>
          <Route path="/patient/:id" element={<EditPatient />}></Route>
          <Route path="/faculty" element={<DashboardFaculty />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/predictSoberPeriod"
            element={<SoberPeriodPrediction />}
          ></Route>
          <Route
            path="/predictRiskLevel"
            element={<RiskLevelPrediction />}
          ></Route>
          <Route path="/predictAAO" element={<AAOPrediction />}></Route>
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
