/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/**
 * Check each method in the shopping cart controller and add code to implement
 * the functionality or fix any bug.
 * The static methods and their function include:
 *
 * - generateUniqueCart - To generate a unique cart id
 * - addItemToCart - To add new product to the cart
 * - getCart - method to get list of items in a cart
 * - updateCartItem - Update the quantity of a product in the shopping cart
 * - emptyCart - should be able to clear shopping cart
 * - removeItemFromCart - should delete a product from the shopping cart
 * - createOrder - Create an order
 * - getCustomerOrders - get all orders of a customer
 * - getOrderSummary - get the details of an order
 * - processStripePayment - process stripe payment
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */

/**
 *
 *
 * @class shoppingCartController
 */
import uuid from 'uuid/v4';
import ShoppingCartServices from '../services/shoppingCart.services';

class ShoppingCartController {
  /**
   * generate random unique id for cart identifier
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart_id
   * @memberof shoppingCartController
   */
  static generateUniqueCart(_, res) {
    const uniqueID = uuid();
    return res.status(200).json({
      cart_id: uniqueID,
    });
  }

  /**
   * adds item to a cart with cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async addItemToCart(req, res, next) {
    const {
      body: { cart_id, product_id, attributes, quantity },
    } = req;
    try {
      const cart = await ShoppingCartServices._addItemToCart(
        cart_id,
        product_id,
        attributes,
        quantity
      );

      if (cart) {
        return res.status(200).json(cart);
      }

      return res.status(400).json({
        message: 'Could not complete this request',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get shopping cart using the cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async getCart(req, res, next) {
    const { cart_id } = req.params;
    try {
      const cart = await ShoppingCartServices._getCart(cart_id);
      if (cart) {
        return res.status(200).json(cart);
      }

      return res.status(404).json({
        success: false,
        message: 'This cart has no items.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update cart item quantity using the item_id in the request param
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async updateCartItem(req, res, next) {
    const {
      params: { item_id },
      body: { quantity },
    } = req;
    try {
      const newItem = await ShoppingCartServices._updateCartItemQuantity(item_id, quantity);
      if (!newItem === 'Not Found') {
        return res.status(200).json(newItem);
      }

      return res.status(400).json({
        message: 'Could not complete request',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * removes all items in a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async emptyCart(req, res, next) {
    const { cart_id } = req.params;
    try {
      const result = await ShoppingCartServices._emptyCart(cart_id);
      if (result === 1) {
        return res.status(200).json([]);
      }
      return res.status(400).json({
        message: 'Could not empty the cart',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * remove single item from cart
   * cart id is obtained from current session
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with message
   * @memberof ShoppingCartController
   */
  static async removeItemFromCart(req, res, next) {
    const { item_id } = req.params;
    try {
      const result = await ShoppingCartServices._removeItemFromCart(item_id);

      if (result === 1) {
        return res.status(200).json({
          message: 'Success',
        });
      }

      return res.status(400).json({
        message: 'Request was not successful',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * create an order from a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with created order
   * @memberof ShoppingCartController
   */
  static async createOrder(req, res, next) {
    const {
      body: { cart_id, shipping_id, tax_id },
    } = req;
    try {
      const order = await ShoppingCartServices._createOrder(cart_id, shipping_id, tax_id);

      if (order) {
        return res.status(201).json(order);
      }

      return res.status(400).json({
        message: 'Could not complete this request',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with customer's orders
   * @memberof ShoppingCartController
   */
  static async getCustomerOrders(req, res, next) {
    const { customer_id } = req.params; // eslint-disable-line
    try {
      const orders = await ShoppingCartServices._getCustomerOrders(customer_id);
      if (!orders.length === 0) {
        return res.status(200).json(orders);
      }

      return res.status(404).json({
        success: false,
        message: `No order history for this customer`,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with order summary
   * @memberof ShoppingCartController
   */
  static async getOrderSummary(req, res, next) {
    const { order_id } = req.params; // eslint-disable-line
    try {
      const order = await ShoppingCartServices._getOrderSummary(order_id);
      if (order) {
        return res.status(200).json(order);
      }

      return res.status(404).json({
        message: `Order with id ${order_id} is not available.`,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getOrderShortDetails(req, res, next) {
    const { order_id } = req.params;
    try {
      const details = await ShoppingCartServices._getOrderShortDetails(order_id);
      if (details) {
        return res.status(200).json(details);
      }

      return res.status(404).json({
        success: false,
        message: `No details for order with id ${order_id}`,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async processStripePayment(req, res, next) {
    const { email, stripeToken, order_id } = req.body; // eslint-disable-line
    const { customer_id } = req; // eslint-disable-line
    try {
      // implement code to process payment and send order confirmation email here
    } catch (error) {
      return next(error);
    }
  }
}

export default ShoppingCartController;
