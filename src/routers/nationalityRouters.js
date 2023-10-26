import { Router } from "express";
import nationalityCtrl from "../controllers/nationalityControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const nationalityRouter = new Router();

nationalityRouter
  .route("/")
  .get(paginateBooks, nationalityCtrl.getNationalities)
  .post(nationalityCtrl.createNationality)
  .put(nationalityCtrl.updateNationality);

nationalityRouter
  .route("/:id")
  .get(nationalityCtrl.getNationalityById)
  .delete(nationalityCtrl.deleteNationality)
  .patch(nationalityCtrl.changePartOfNationality);

export default nationalityRouter;
