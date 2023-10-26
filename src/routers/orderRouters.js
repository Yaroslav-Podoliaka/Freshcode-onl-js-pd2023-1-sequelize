import { Router } from "express";
import orderCtrl from "../controllers/orderControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const orderRouter = new Router();

orderRouter
  .route("/")
  .get(paginateBooks, orderCtrl.getOrders)
  .post(orderCtrl.createOrder)
  .put(orderCtrl.updateOrder);

orderRouter
  .route("/:id")
  .get(orderCtrl.getOrderById)
  .delete(orderCtrl.deleteOrder)
  .patch(orderCtrl.changePartOfOrder);

export default orderRouter;
