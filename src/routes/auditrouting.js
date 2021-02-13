var AuditRoutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      path: "/report",
      name: "Bill Report",
      icon: "fas fa-file-excel",
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
      path: "/billhistory",
      name: "Bill History",
      icon: "fas fa-history",
    },
    { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true }
  ];
  export default AuditRoutes;
  