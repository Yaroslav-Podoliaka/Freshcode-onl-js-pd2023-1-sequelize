import { Router } from "express";
import customerCtrl from "../controllers/customerControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const customerRouter = new Router();

customerRouter
  .route("/")
  .get(paginateBooks, customerCtrl.getCustomers)
  .post(customerCtrl.createCustomer)
  .put(customerCtrl.updateCustomer);

customerRouter
  .route("/:id")
  .get(customerCtrl.getCustomerById)
  .delete(customerCtrl.deleteCustomer)
  .patch(customerCtrl.changePartOfCustomer);

export default customerRouter;
