import AboutProjects from "../Components/AboutProjects/AboutProjects";
import Documents from "../Components/Documents/Documents";
import MainPage from "../Components/MainPage/MainPage";
import About from '../Components/About/About'
import AboutWriters from "../Components/AboutWriters/AboutWriters";
import AboutWorks from "../Components/AboutWorks/AboutWorks";
import Biography from "../Components/Biography/Biography";
import Settings from "../Components/Settings/Settings";
import AddNewWritter from "../Components/AddNewWritter/AddNewWritter";
import AddNewProject from "../Components/AddNewProject/AddNewProject";
import SettingsProject from "../Components/SettingsProject/SettingsProject";
import AddNewPremie from "../Components/MainPage/Premie/AddNewPremie/AddNewPremie";
import ProjectInfo from "../Components/ProjectInfo/ProjectInfo";
import ShowPremies from "../Components/MainPage/Premie/ShowPremies/ShowPremies";
import AddNewPhoto from "../Components/MainPage/Gallery/AddNewPhoto/AddNewPhoto";

export const routes = [
  { path: "/", element: <MainPage /> },
  // { path: "/", element: <AddNewWritter /> },
  { path: "/documents", element: <Documents /> },
  { path: "/about-us", element: <About /> },
  { path: "writers", element: <AboutWriters /> },
  { path: "writers-works", element: <AboutWorks /> },
  { path: `writers/biography/:id`, element: <Biography /> },
  { path: "settings/:id", element: <Settings /> },
  { path: "settings-project/:id", element: <SettingsProject /> },
  { path: "addNewWritter", element: <AddNewWritter /> },
  { path: "addNewProject", element: <AddNewProject /> },
  { path: "addNewPremie", element: <AddNewPremie /> },
  { path: "project-info/:id", element: <ProjectInfo /> },
  { path: "all-awards", element: <ShowPremies /> },
  { path: "add-photo", element: <AddNewPhoto /> },
];
