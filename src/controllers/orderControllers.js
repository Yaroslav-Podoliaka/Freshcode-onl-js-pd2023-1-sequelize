import createError from "http-errors";
import { Order, Customer, sequelize } from "../db/models";

class OrderController {
  async getOrders(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const allOrders = await Order.findAll({
        attributes: ["id", "title", "order_date"],
        include: {
          model: Customer,
          attributes: ["full_name"],
        },
        raw: true,
        limit,
        offset,
      });
      if (allOrders) {
        console.log(`Result is: ${JSON.stringify(allOrders, null, 2)}`);
        res.status(200).json(allOrders);
      } else {
        next(createError(404, "Any oreders has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const id = req.params.id;
      const orederById = await Order.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (orederById) {
        console.log(`Result is: ${JSON.stringify(orederById, null, 2)}`);
        res.status(200).json(orederById);
      } else {
        console.log("Bad request");
        next(createError(404, "This oreder has not been found"));
      }
    } catch (error) {
      next(error.message);
    }
  }

  async createOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const body = req.body;
      const createdOrder = await Order.create(body, {
        transaction: t,
        returning: ["id"],
      });
      if (createdOrder) {
        console.log(`Result is: ${JSON.stringify(createdOrder, null, 2)}`);
        res.status(200).json(createdOrder);
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

  async updateOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { body } = req;
      const updatedOrder = await Order.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        transaction: t,
        returning: ["title", "order_date", "customer_id"],
      });
      if (updatedOrder) {
        console.log(`Result is: ${JSON.stringify(updatedOrder, null, 2)}`);
        res.status(200).json(updatedOrder);
      } else {
        next(createError(404, "This oreder has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async changePartOfOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        params: { id },
        body,
      } = req;
      const [updatedOrdersCount, [updatedOrder]] = await Order.update(body, {
        where: {
          id: id,
        },
        transaction: t,
        raw: true,
        returning: ["title", "order_date", "customer_id"],
      });
      if (updatedOrdersCount > 0) {
        console.log(updatedOrder);
        res.status(200).json(updatedOrder);
      } else {
        next(createError(404, "This oreder has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }

  async deleteOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const deletedOrder = await Order.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      if (deletedOrder) {
        res.send(res.statusCode);
      } else {
        next(createError(404, "This oreder has not been found"));
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error.message);
    }
  }
}

export default new OrderController();
