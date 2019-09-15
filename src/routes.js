import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

// admin components
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Users = React.lazy(() => import("./views/Users/Users"));
const AllUsers = React.lazy(() => import("./views/AllUsers/AllUsers"));
const Fabricants = React.lazy(() => import("./views/Fabricants/Fabricants"));
const Brands = React.lazy(() => import("./views/Brands/Brands"));
const User = React.lazy(() => import("./views/Users/User"));

// manufacturer components
const manufacturer_Dashboard = React.lazy(() =>
  import("./views/Dashboard/Dashboard")
);
const Colors = React.lazy(() => import("./views/Colors/Colors"));
const Options = React.lazy(() => import("./views/Options/Options"));
const Models = React.lazy(() => import("./views/Modeles/Modeles"));
const Versions = React.lazy(() => import("./views/Versions/Versions"));
const Commandes = React.lazy(() => import("./views/Commandes"));
const Stock = React.lazy(() => import("./views/Stock/Stock"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: "/",
    exact: true,
    name: "Accueil",
    component: DefaultLayout,
    roles: ["admin", "manufacturer"]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    roles: ["admin", "manufacturer"]
  },

  {
    path: "/fabricants/:id",
    exact: true,
    name: "Utilisateurs",
    component: Users,
    roles: ["admin"]
  },
  {
    path: "/users",
    exact: true,
    name: "Utilisateurs",
    component: AllUsers,
    roles: ["admin"]
  },
  {
    path: "/fabricants",
    exact: true,
    name: "Fabricants",
    component: Fabricants,
    roles: ["admin"]
  },
  // {
  //   path: "/users/:id",
  //   exact: true,
  //   name: "User Details",
  //   component: User,
  //   roles: ["admin"]
  // },
  // {
  //   path: "/users",
  //   exact: true,
  //   name: "Users",
  //   component: Users,
  //   roles: ["admin"]
  // },

  {
    path: "/brands",
    exact: true,
    name: "Brands",
    component: Brands,
    roles: ["admin"]
  },
  // { path: "/brands", exact: true, name: "Marques", component: Brands },
  // { path: "/users/:id", exact: true, name: "User Details", component: User },
  {
    path: "/users/:id",
    exact: true,
    name: "User Details",
    component: User,
    roles: ["admin"]
  },
  {
    path: "/colors/",
    exact: true,
    name: "Couleurs",
    component: Colors,
    roles: ["manufacturer"]
  },
  {
    path: "/commandes/",
    exact: true,
    name: "Commandes",
    component: Commandes,
    roles: ["manufacturer"]
  },
  {
    path: "/options/",
    exact: true,
    name: "Options",
    component: Options,
    roles: ["manufacturer"]
  },
  {
    path: "/manufacturerDashboard",
    exact: true,
    name: "Dashboard Fabricant",
    component: manufacturer_Dashboard,
    roles: ["manufacturer"]
  },
  {
    path: "/models",
    exact: true,
    name: "Models",
    component: Models,
    roles: ["manufacturer"]
  },
  {
    path: "/models/:id",
    exact: true,
    name: "Model Versions",
    component: Versions,
    roles: ["manufacturer"]
  },
  {
    path: "/stock",
    exact: true,
    name: "Manufacturer stock",
    component: Stock,
    roles: ["manufacturer"]
  }
];

export default routes;
