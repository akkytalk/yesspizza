import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/es/storage";
import { Login } from "./Reducer/login";
import { Billing } from "./Reducer/billing";
import { Category } from "./Reducer/category";
import { Company } from "./Reducer/company";
import { Client } from "./Reducer/client";
import { Dashboard } from "./Reducer/dashboard";
import { Product } from "./Reducer/product";
import { Supplier } from "./Reducer/supplier";
import { AddBilling } from "./Reducer/addBilling";
import { AddCategory } from "./Reducer/addCategory";
import { AddCompany } from "./Reducer/addCompany";
import { AddClient } from "./Reducer/addClient";
import { AddProduct } from "./Reducer/addProduct";
import { AddSupplier } from "./Reducer/addSupplier";

const config = {
  key: "root",
  storage
};

export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      addBilling: AddBilling,
      addCategory: AddCategory,
      addCompany: AddCompany,
      addClient: AddClient,
      addProduct: AddProduct,
      addSupplier: AddSupplier,
      login: Login,
      billing: Billing,
      category: Category,
      company: Company,
      client: Client,
      dashboard: Dashboard,
      product: Product,
      supplier: Supplier
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};