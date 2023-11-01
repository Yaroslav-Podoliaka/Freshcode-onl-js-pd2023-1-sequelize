import { Router } from "express";
import customerCtrl from "../controllers/customerControllers";
import { paginate, upload } from "../middleware";

const customerRouter = new Router();

customerRouter
  .route("/")
  .get(paginate.paginateBooks, customerCtrl.getCustomers)
  .post(customerCtrl.createCustomer)
  .put(customerCtrl.updateCustomer);

customerRouter
  .route("/:id")
  .get(customerCtrl.getCustomerById)
  .delete(customerCtrl.deleteCustomer)
  .patch(customerCtrl.changePartOfCustomer);

  customerRouter
  .route("/:id/avatars")
  .patch(upload.uploadCustomerAvatar.single('customerAvatar'), customerCtrl.changeCustomerAvatar);

export default customerRouter;
