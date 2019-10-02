/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import TaxServices from '../services/tax.services';

/**
 * Tax controller contains methods which are needed for all tax request
 * Implement the functionality for the methods
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
class TaxController {
  /**
   * This method get all taxes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllTax(req, res, next) {
    // write code to get all tax from the database here
    try {
      const taxes = await TaxServices._getAllTaxes();

      if (taxes) {
        return res.status(200).json(taxes);
      }

      return res.status(404).json({
        success: false,
        message: 'No history of taxes yet.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a single tax using the tax id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleTax(req, res, next) {
    const { tax_id } = req.params;
    try {
      const tax = await TaxServices._getSingleTax(tax_id);

      if (tax) {
        return res.status(200).json(tax);
      }

      return res.status(404).json({
        success: false,
        message: 'Tax with the given id was not found.',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default TaxController;
