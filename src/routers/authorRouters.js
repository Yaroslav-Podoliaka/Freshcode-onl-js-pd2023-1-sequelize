import { Router } from "express";
import authorCtrl from "../controllers/authorControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const authorRouter = new Router();

authorRouter
  .route("/")
  .get(paginateBooks, authorCtrl.getAuthors)
  .post(authorCtrl.createAuthor)
  .put(authorCtrl.updateAuthor);

authorRouter
  .route("/:id")
  .get(authorCtrl.getAuthorById)
  .delete(authorCtrl.deleteAuthor)
  .patch(authorCtrl.changePartOfAuthor);

export default authorRouter;
