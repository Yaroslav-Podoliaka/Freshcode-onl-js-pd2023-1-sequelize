import createError from "http-errors";
import { Shelf, sequelize } from "../db/models";

class ShelfController {
  async getShelves(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allShelves = await Shelf.findAll({
        attributes: ["id", "title", "description"],
        raw: true,
        limit,
        offset,
      });
      if (allShelves) {
        console.log(`Result is: ${JSON.stringify(allShelves, null, 2)}`);
        res.status(200).json(allShelves);
      } else {
        next(createError(404, "Any shelves has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getShelfById(req, res, next) {
    try {
      const id = req.params.id;
      const shelfById = await Shelf.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (shelfById) {
        console.log(`Result is: ${JSON.stringify(shelfById, null, 2)}`);
        res.status(200).json(shelfById);
      } else {
        console.log("Bad request");
        next(createError(404, "This shelf has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createShelf(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdShelf = await Shelf.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdShelf) {
        console.log(`Result is: ${JSON.stringify(createdShelf, null, 2)}`);
        res.status(200).json(createdShelf);
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

  async updateShelf(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedShelf = await Shelf.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title", "description"],
      });
      if (updatedShelf) {
        console.log(`Result is: ${JSON.stringify(updatedShelf, null, 2)}`);
        res.status(200).json(updatedShelf);
      } else {
        next(createError(404, "This shelf has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfShelf(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedShelvesCount, [updatedShelf]] = await Shelf.update(body, {
        where: {
          id: id,
        },
        transaction: t,
        raw: true,
        returning: ["title", "description"],
      });
      if (updatedShelvesCount > 0) {
        console.log(updatedShelf);
        res.status(200).json(updatedShelf);
      } else {
        next(createError(404, "This shelf has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteShelf(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const deletedShelf = await Shelf.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedShelf) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This shelf has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new ShelfController();
