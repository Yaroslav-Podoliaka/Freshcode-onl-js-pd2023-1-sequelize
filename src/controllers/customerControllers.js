import createError from "http-errors";
import { Customer, sequelize } from "../db/models";

class CustomerController {
  async getCustomers(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allCustomers = await Customer.findAll({
        attributes: ["id", "full_name", "email", "phone"],
        raw: true,
        limit,
        offset,
      });
      if (allCustomers) {
        console.log(`Result is: ${JSON.stringify(allCustomers, null, 2)}`);
        res.status(200).json(allCustomers);
      } else {
        next(createError(404, "Any customers has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const id = req.params.id;
      const customerById = await Customer.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (customerById) {
        console.log(`Result is: ${JSON.stringify(customerById, null, 2)}`);
        res.status(200).json(customerById);
      } else {
        console.log("Bad request");
        next(createError(404, "This customer has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createCustomer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdCustomer = await Customer.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdCustomer) {
        console.log(`Result is: ${JSON.stringify(createdCustomer, null, 2)}`);
        res.status(200).json(createdCustomer);
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

  async updateCustomer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedCustomer = await Customer.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["full_name", "email", "phone", "password"],
      });
      if (updatedCustomer) {
        console.log(`Result is: ${JSON.stringify(updatedCustomer, null, 2)}`);
        res.status(200).json(updatedCustomer);
      } else {
        next(createError(404, "This customer has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfCustomer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedCustomersCount, [updatedCustomer]] = await Customer.update(
        body,
        {
          where: {
            id: id,
          },
          transaction: t,
          raw: true,
          returning: ["full_name", "email", "phone", "password"],
        }
      );
      if (updatedCustomersCount > 0) {
        console.log(updatedCustomer);
        res.status(200).json(updatedCustomer);
      } else {
        next(createError(404, "This customer has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteCustomer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const deletedCustomer = await Customer.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedCustomer) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This customer has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new CustomerController();
