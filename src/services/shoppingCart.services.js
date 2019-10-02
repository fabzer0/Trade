/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Order, OrderDetail, Product, ShoppingCart } from '../database/models';

class ShoppingCartServices {
  static async _addItemToCart(cart_id, product_id, attributes, quantity) {
    const cart = await ShoppingCart.create({
      cart_id,
      product_id,
      attributes,
      quantity,
    });

    return cart.dataValues;
  }

  static async _getOrderSummary(order_id) {
    const order = await Order.findOne({
      where: { order_id },
      // eslint-disable-next-line prettier/prettier
      include: [{ model: OrderDetail, as: 'order_items' }],
    });

    return order;
  }

  static async _createOrder(cart_id, shipping_id, tax_id) {
    const order = await Order.create({
      cart_id,
      shipping_id,
      tax_id,
    });

    return order.dataValues;
  }

  static async _getCustomerOrders(customer_id) {
    const orders = await Order.findAll({
      where: { customer_id },
      raw: true,
    });

    return orders;
  }

  static async _getOrderShortDetails(order_id) {
    const details = await Order.findOne({
      where: { order_id },
      attributes: ['order_id', 'total_amount', 'created_on', 'shipped_on', 'status'],
    });

    return details;
  }

  static async _getCart(cart_id) {
    const cartItems = await ShoppingCart.findOne({
      where: { cart_id },
      attributes: ['item_id', 'cart_id', 'attributes', 'product_id', 'quantity'],
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['name', 'image', 'price', 'discounted_price'],
        },
      ],
    });

    return cartItems;
  }

  static async _removeItemFromCart(item_id) {
    const result = await ShoppingCart.destroy({
      where: { item_id },
    });

    return result;
  }

  static async _emptyCart(cart_id) {
    const result = await ShoppingCart.destroy({
      where: { cart_id },
    });

    return result;
  }

  static async _updateCartItemQuantity(item_id, quantity) {
    try {
      const item = await ShoppingCart.findOne({
        where: { item_id },
      });
      item.update({ quantity });

      return item.dataValues;
    } catch (error) {
      return 'Not Found';
    }
  }
}

export default ShoppingCartServices;
