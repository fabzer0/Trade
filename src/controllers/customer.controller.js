/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Customer } from '../database/models';
import CustomerServices from '../services/customer.services';

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof CustomerController
   */
  static async create(req, res, next) {
    // Implement the function to create the customer account
    return res.status(201).json({ message: 'this works' });
  }

  /**
   * log in a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof CustomerController
   */
  static async login(req, res, next) {
    // implement function to login to user account
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    const { headers: { customer_id } } = req;
    try {
      const customer = await CustomerServices._getCustomerProfile(customer_id);

      if (customer) {
        return res.status(200).json(customer);
      }

      return res.status(404).json({
        message: 'Customer does not exist',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    const {
      headers: { customer_id },
      body: { address_1, address_2, city, region, postal_code, shipping_region_id },
    } = req;
    try {
      const newDetails = await CustomerServices._updateCustomerAddress(
        customer_id,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        shipping_region_id
      );

      if (!newDetails === 'Null') {
        return res.status(200).json(newDetails);
      }

      return res.status(400).json({
        message: 'Could not complete this request',
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateCustomerDetails(req, res, next) {
    const {
      headers: { customer_id },
      body: { email, name, day_phone, eve_phone, mob_phone },
    } = req;
    try {
      const newDetails = await CustomerServices._updateCustomerDetails(
        customer_id,
        email,
        name,
        day_phone,
        eve_phone,
        mob_phone
      );

      if (!newDetails === 'Null') {
        return res.status(200).json(newDetails);
      }

      return res.status(400).json({
        message: 'Could not complete this request',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    const {
      headers: { customer_id },
      body: { credit_card },
    } = req;
    try {
      const newDetails = await CustomerServices._updateCreditCard(customer_id, credit_card);

      if (!newDetails === 'Null') {
        return res.status(200).json(newDetails);
      }

      return res.status(400).json({
        message: 'Could not complete this request',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default CustomerController;
