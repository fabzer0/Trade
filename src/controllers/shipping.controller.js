/* eslint-disable no-underscore-dangle */
/**
 * The Shipping Controller contains all the static methods that handles all shipping request
 * This piece of code work fine, but you can test and debug any detected issue
 *
 * - getShippingRegions - Returns a list of all shipping region
 * - getShippingType - Returns a list of shipping type in a specific shipping region
 *
 */
import ShippingServices from '../services/shipping.services';

class ShippingController {
  /**
   * get all shipping regions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and shipping regions data
   * @memberof ShippingController
   */
  static async getShippingRegions(req, res, next) {
    try {
      const regions = await ShippingServices._getAllShippingRegions();

      if (regions) {
        return res.status(200).json(regions)
      }

      return res.status(404).json({
        success: false,
        message: 'No regions to display yet.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get get shipping region shipping types
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and shipping types data
   * @memberof ShippingController
   */
  static async getShippingType(req, res, next) {
    const { shipping_region_id } = req.params; // eslint-disable-line
    try {
      const shippingTypes = await ShippingServices._getShippingType(shipping_region_id);
      if (shippingTypes.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'We have no shippings in this region yet.',
        });
      }

      return res.status(200).json(shippingTypes);
    } catch (error) {
      return next(error);
    }
  }
}

export default ShippingController;
