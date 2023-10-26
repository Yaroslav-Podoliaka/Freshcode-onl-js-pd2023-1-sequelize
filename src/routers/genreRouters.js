import { Router } from "express";
import genreCtrl from "../controllers/genreControllers";
import { paginateBooks } from "../middleware/pagination.mw";

const genreRouter = new Router();

genreRouter
  .route("/")
  .get(paginateBooks, genreCtrl.getGenres)
  .post(genreCtrl.createGenre)
  .put(genreCtrl.updateGenre);

genreRouter
  .route("/:id")
  .get(genreCtrl.getGenreById)
  .delete(genreCtrl.deleteGenre)
  .patch(genreCtrl.changePartOfGenre);

export default genreRouter;
