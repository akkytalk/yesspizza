var AdminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt"
  },
  {
    path: "/company",
    name: "Company",
    icon: "fas fa-sticky-note"
  },
  {
    path: "/product",
    name: "Product",
    icon: "fas fa-box"
  },
  {
    path: "/billing",
    name: "Billing",
    icon: "fas fa-credit-card"
  },
  {
    path: "/billhistory",
    name: "Bill History",
    icon: "fas fa-history"
  },
  {
    path: "/profile",
    name: "Company Profile",
    icon: "fas fa-user"
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true }
];
export default AdminRoutes;
