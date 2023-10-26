import { Router } from "express";
import shelfCtrl from "../controllers/shelfControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const shelfRouter = new Router();

shelfRouter
  .route("/")
  .get(paginateBooks, shelfCtrl.getShelves)
  .post(shelfCtrl.createShelf)
  .put(shelfCtrl.updateShelf);

shelfRouter
  .route("/:id")
  .get(shelfCtrl.getShelfById)
  .delete(shelfCtrl.deleteShelf)
  .patch(shelfCtrl.changePartOfShelf);

export default shelfRouter;
