import createError from "http-errors";
import { Author, Nationality, sequelize } from "../db/models";

class AuthorController {
  async getAuthors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allAuthors = await Author.findAll({
        attributes: ["id", "full_name", "email"],
        include: {
          model: Nationality,
          attributes: ["title"],
        },
        raw: true,
        limit,
        offset,
      });
      if (allAuthors) {
        console.log(`Result is: ${JSON.stringify(allAuthors, null, 2)}`);
        res.status(200).json(allAuthors);
      } else {
        next(createError(404, "Any authors has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const authorById = await Author.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (authorById) {
        console.log(`Result is: ${JSON.stringify(authorById, null, 2)}`);
        res.status(200).json(authorById);
      } else {
        console.log("Bad request");
        next(createError(404, "This author has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createAuthor(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdAuthor = await Author.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdAuthor) {
        console.log(`Result is: ${JSON.stringify(createdAuthor, null, 2)}`);
        res.status(200).json(createdAuthor);
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

  async updateAuthor(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedAuthor = await Author.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["full_name", "email", "nationality_id"],
      });
      if (updatedAuthor) {
        console.log(`Result is: ${JSON.stringify(updatedAuthor, null, 2)}`);
        res.status(200).json(updatedAuthor);
      } else {
        next(createError(404, "This author has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfAuthor(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedAuthorsCount, [updatedAuthor]] = await Author.update(body, {
        where: {
          id: id,
        },
        transaction: t,
        raw: true,
        returning: ["full_name", "email", "nationality_id"],
      });
      if (updatedAuthorsCount > 0) {
        console.log(updatedAuthor);
        res.status(200).json(updatedAuthor);
      } else {
        next(createError(404, "This author has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteAuthor(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const deletedAuthor = await Author.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedAuthor) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This author has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new AuthorController();
