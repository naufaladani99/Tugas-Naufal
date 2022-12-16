import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "./Layout/Dashboard";
import RegionViewApi from "./ViewApi/Region/RegionViewApi";
import CountryViewApi from "./ViewApi/Country/CountryViewApi";
import LocationViewApi from "./ViewApi/Location/LocationViewApi";
import FormikRegionViewApi from "./ViewApi/Region/FormikRegionViewApi";
import FormikRegionViewApiRedux from "./ViewReduxSaga/FormikRegionViewApi";
import FormikLocationViewApi from "./ViewApi/Location/FormikLocationViewApi";
import FormikCountryViewApi from "./ViewApi/Country/FormikCountryViewApi";
import DepartmentViewApi from "./ViewApi/Department/DepartmentViewApi";
import JobViewApi from "./ViewApi/Job/JobViewApi";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { path: "region", element: <RegionViewApi /> },
        { path: "country", element: <CountryViewApi /> },
        { path: "location", element: <LocationViewApi /> },
        { path: "regionformik", element: <FormikRegionViewApi /> },
        { path: "countryformik", element: <FormikCountryViewApi /> },
        { path: "locationformik", element: <FormikLocationViewApi /> },
        { path: "regionredux", element: <FormikRegionViewApiRedux /> },
        { path: "department", element: <DepartmentViewApi /> },
        { path: "job", element: <JobViewApi /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
