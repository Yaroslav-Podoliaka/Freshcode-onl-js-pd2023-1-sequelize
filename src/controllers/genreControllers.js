import createError from "http-errors";
import { Genre, sequelize } from "../db/models";

class GenreController {
  async getGenres(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allGenres = await Genre.findAll({
        attributes: ["id", "title"],
        raw: true,
        limit,
        offset,
      });
      if (allGenres) {
        console.log(`Result is: ${JSON.stringify(allGenres, null, 2)}`);
        res.status(200).json(allGenres);
      } else {
        next(createError(404, "Any genres has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getGenreById(req, res, next) {
    try {
      const id = req.params.id;
      const genreById = await Genre.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (genreById) {
        console.log(`Result is: ${JSON.stringify(genreById, null, 2)}`);
        res.status(200).json(genreById);
      } else {
        console.log("Bad request");
        next(createError(404, "This genre has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createGenre(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdGenre = await Genre.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdGenre) {
        console.log(`Result is: ${JSON.stringify(createdGenre, null, 2)}`);
        res.status(200).json(createdGenre);
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

  async updateGenre(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedGenre = await Genre.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title"],
      });
      if (updatedGenre) {
        console.log(`Result is: ${JSON.stringify(updatedGenre, null, 2)}`);
        res.status(200).json(updatedGenre);
      } else {
        next(createError(404, "This genre has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfGenre(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedGenresCount, [updatedGenre]] = await Genre.update(body, {
        where: {
          id: id,
        },
        transaction: t,
        raw: true,
        returning: ["title"],
      });
      if (updatedGenresCount > 0) {
        console.log(updatedGenre);
        res.status(200).json(updatedGenre);
      } else {
        next(createError(404, "This genre has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteGenre(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const deletedGenre = await Genre.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedGenre) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This genre has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new GenreController();
