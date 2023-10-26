import { Router } from "express";
import bookCtrl from "../controllers/bookControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const bookRouter = new Router();

bookRouter
  .route("/")
  .get(paginateBooks, bookCtrl.getBooks)
  .post(bookCtrl.createBook)
  .put(bookCtrl.updateBook);

bookRouter
  .route("/:id")
  .get(bookCtrl.getBookById)
  .delete(bookCtrl.deleteBook)
  .patch(bookCtrl.changePartOfBook);

export default bookRouter;
