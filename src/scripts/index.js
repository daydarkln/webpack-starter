import LocalStorageController from "./LocalStorageController";
import Form from "./Form";
import List from "./List";

import "../styles/index.scss";

const DB = new LocalStorageController();
const form = new Form("add-form", DB);
const list = new List('list', DB, Form);

[form, list].forEach(item => {
  item.start();
});
