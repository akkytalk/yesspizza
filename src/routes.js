import React from "react";
import Loadable from "react-loadable";
import Loader from "./components/loader/Loader";
import Fulllayout from "./layouts/fulllayout.jsx";
import Expense from "./views/Components/Expense Management/Expense";
import AddExpense from "./views/Components/Expense Management/AddExpense";
import ExpenseType from "./views/Components/Expense Management/ExpenseType/ExpenseType";

function Loading() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}

const Dashboard = Loadable({
  loader: () => import("./views/starter/starter.jsx"),
  loading: Loading,
});

const Category = Loadable({
  loader: () => import("./views/Components/Category/Category"),
  loading: Loading,
});

const Company = Loadable({
  loader: () => import("./views/Components/Company/Company"),
  loading: Loading,
});

const Product = Loadable({
  loader: () => import("./views/Components/Product/Product"),
  loading: Loading,
});

const Client = Loadable({
  loader: () => import("./views/Components/Client/Client"),
  loading: Loading,
});

const Report = Loadable({
  loader: () => import("./views/Components/Report/Report"),
  loading: Loading,
});

const Inventory = Loadable({
  loader: () => import("./views/Components/Inventory/Inventory"),
  loading: Loading,
});

const Billing = Loadable({
  loader: () => import("./views/Components/Billing/Billing"),
  loading: Loading,
});

const BillHistory = Loadable({
  loader: () => import("./views/Components/Billing/BillHistory"),
  loading: Loading,
});

const PrintPage = Loadable({
  loader: () => import("./views/Components/Billing/PrintModal"),
  loading: Loading,
});

const Supplier = Loadable({
  loader: () => import("./views/Components/Supplier/Supplier"),
  loading: Loading,
});

const Export = Loadable({
  loader: () => import("./views/Components/Export/Export"),
  loading: Loading,
});

const CompanyProfile = Loadable({
  loader: () => import("./views/Components/Profile/CompanyProfile"),
  loading: Loading,
});

const routes = [
  { path: "/", exact: true, name: "Home", component: Fulllayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/category", exact: true, name: "Category", component: Category },
  { path: "/company", exact: true, name: "Company", component: Company },
  { path: "/product", exact: true, name: "Product", component: Product },
  { path: "/report", exact: true, name: "Report", component: Report },
  { path: "/client", exact: true, name: "Client", component: Client },
  { path: "/inventory", exact: true, name: "Inventory", component: Inventory },
  { path: "/billing", exact: true, name: "Billing", component: Billing },
  {
    path: "/billhistory",
    exact: true,
    name: "BillHistory",
    component: BillHistory,
  },
  { path: "/print/:id", exact: true, name: "PrintPage", component: PrintPage },
  { path: "/supplier", exact: true, name: "Supplier", component: Supplier },
  { path: "/export", exact: true, name: "Export", component: Export },
  {
    path: "/profile",
    exact: true,
    name: "CompanyProfile",
    component: CompanyProfile,
  },
  {
    path: "/expenses-type",
    exact: true,
    name: "ExpenseType",
    component: ExpenseType,
  },
  {
    path: "/expense",
    exact: true,
    name: "ExpenseMangement",
    component: Expense,
  },
];

export default routes;
