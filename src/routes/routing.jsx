var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
  },
  {
    path: "/category",
    name: "Category",
    icon: "fas fa-sticky-note",
  },
  {
    path: "/product",
    name: "Product",
    icon: "fas fa-box",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: "fas fa-credit-card",
  },

  {
    path: "/Expense",
    name: "Expense Management",
    icon: "fas fa-rupee-sign",
  },

  {
    path: "/expenses-type",
    name: "Expense Type",
    icon: "fas fa-rupee-sign",
  },
  {
    path: "/billhistory",
    name: "Bill History",
    icon: "fas fa-history",
  },
  {
    path: "/profile",
    name: "Company Profile",
    icon: "fas fa-user",
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];
export default ThemeRoutes;
