import { Router } from "express";
import authorRouters from "./authorRouters";
import bookRouters from "./bookRouters";
import customerRouters from "./customerRouters";
import genreRouters from "./genreRouters";
import nationalityRouters from "./nationalityRouters";
import orderRouters from "./orderRouters";
import shelfRouters from "./shelfRouters";

const router = new Router();

router.use("/authors", authorRouters);
router.use("/books", bookRouters);
router.use("/customers", customerRouters);
router.use("/genres", genreRouters);
router.use("/nationalities", nationalityRouters);
router.use("/orders", orderRouters);
router.use("/shelves", shelfRouters);

export default router;
