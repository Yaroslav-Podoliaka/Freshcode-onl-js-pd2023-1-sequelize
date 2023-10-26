import createError from "http-errors";
import { Nationality, sequelize } from "../db/models";

class NationalityController {
  async getNationalities(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allNationalities = await Nationality.findAll({
        attributes: ["id", "title", "description"],
        raw: true,
        limit,
        offset,
      });
      if (allNationalities) {
        console.log(`Result is: ${JSON.stringify(allNationalities, null, 2)}`);
        res.status(200).json(allNationalities);
      } else {
        next(createError(404, "Any nationalities has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getNationalityById(req, res, next) {
    try {
      const id = req.params.id;
      const nationalityById = await Nationality.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (nationalityById) {
        console.log(`Result is: ${JSON.stringify(nationalityById, null, 2)}`);
        res.status(200).json(nationalityById);
      } else {
        console.log("Bad request");
        next(createError(404, "This nationality has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createNationality(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdNationality = await Nationality.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdNationality) {
        console.log(
          `Result is: ${JSON.stringify(createdNationality, null, 2)}`
        );
        res.status(200).json(createdNationality);
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

  async updateNationality(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedNationality = await Nationality.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title", "description"],
      });
      if (updatedNationality) {
        console.log(
          `Result is: ${JSON.stringify(updatedNationality, null, 2)}`
        );
        res.status(200).json(updatedNationality);
      } else {
        next(createError(404, "This nationality has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfNationality(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedNationalitiesCount, [updatedNationality]] =
        await Nationality.update(body, {
          where: {
            id: id,
          },
          transaction: t,
          raw: true,
          returning: ["title", "description"],
        });
      if (updatedNationalitiesCount > 0) {
        console.log(updatedNationality);
        res.status(200).json(updatedNationality);
      } else {
        next(createError(404, "This nationality has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteNationality(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const deletedNationality = await Nationality.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedNationality) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This nationality has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new NationalityController();
