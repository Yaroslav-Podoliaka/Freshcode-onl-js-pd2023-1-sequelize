import createError from "http-errors";
import { Book, Genre, sequelize } from "../db/models";

class BookController {
  async getBooks(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allBooks = await Book.findAll({
        attributes: ["id", "title"],
        include: {
          model: Genre,
          attributes: ["title"],
        },
        raw: true,
        limit,
        offset,
      });
      if (allBooks) {
        console.log(`Result is: ${JSON.stringify(allBooks, null, 2)}`);
        res.status(200).json(allBooks);
      } else {
        next(createError(404, "Any books has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getBookById(req, res, next) {
    try {
      const id = req.params.id;
      const bookById = await Book.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (bookById) {
        console.log(`Result is: ${JSON.stringify(bookById, null, 2)}`);
        res.status(200).json(bookById);
      } else {
        console.log("Bad request");
        next(createError(404, "This book has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createBook(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdBook = await Book.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdBook) {
        console.log(`Result is: ${JSON.stringify(createdBook, null, 2)}`);
        res.status(200).json(createdBook);
      } else {
        console.log("Bad request");
        next(createError(400, "Bad request"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async updateBook(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedBook = await Book.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title", "genre_id", "shelf_id"],
      });
      if (updatedBook) {
        console.log(`Result is: ${JSON.stringify(updatedBook, null, 2)}`);
        res.status(200).json(updatedBook);
      } else {
        next(createError(404, "This book has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfBook(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedBooksCount, [updatedBook]] = await Book.update(body, {
        where: {
          id: id,
        },
        transaction: t,
        raw: true,
        returning: ["title", "genre_id"],
      });
      if (updatedBooksCount > 0) {
        console.log(updatedBook);
        res.status(200).json(updatedBook);
      } else {
        next(createError(404, "This book has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteBook(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // const id = Number(req.params.id);
      const id = req.params.id;
      const deletedBook = await Book.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedBook) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This book has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new BookController();
