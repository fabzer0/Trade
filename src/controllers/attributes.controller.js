/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import AttributeServices from '../services/attributes.services';

/**
 * The controller defined below is the attribute controller, highlighted below are the functions of each static method
 * in the controller
 *  Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 * NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
class AttributeController {
  /**
   * This method get all attributes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllAttributes(req, res, next) {
    // write code to get all attributes from the database here
    try {
      const attributes = await AttributeServices._getAllAttributes();
      if (attributes) {
        return res.status(200).json(attributes);
      }
      return res.status(404).json({
        success: false,
        message: 'You have no attributes yet.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    // Write code to get a single attribute using the attribute id provided in the request param
    const { attribute_id } = req.params;
    try {
      const attribute = await AttributeServices._getSingleAttribute(attribute_id);
      if (attribute) {
        return res.status(200).json(attribute);
      }

      return res.status(404).json({
        success: false,
        message: `Attribute with id ${attribute_id} does not exist`,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    // Write code to get all attribute values for an attribute using the attribute id provided in the request param
    // This function takes the param: attribute_id
    const { attribute_id } = req.params;
    try {
      const attributeValues = await AttributeServices._getAttributeValues(attribute_id);
      if (attributeValues) {
        return res.status(200).json(attributeValues);
      }
      return res.status(404).json({
        success: false,
        message: `Attribute with id ${attribute_id} does not have any values yet.`,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    // Write code to get all attribute values for a product using the product id provided in the request param
    const { product_id } = req.params;
    try {
      const attributes = await AttributeServices._getAllAttributesOfProduct(product_id);
      if (attributes) {
        const listOfAttributeObjects = [];
        attributes.map(attribute => {
          const attrObj = {
            attribute_name: attribute.attribute_value.attribute_type.name,
            attribute_value_id: attribute.attribute_value_id,
            attribute_value: attribute.attribute_value.value,
          };
          listOfAttributeObjects.push(attrObj);
        });

        return res.status(200).json(listOfAttributeObjects);
      }

      return res.status(404).json({
        success: false,
        message: 'This product has not attributes defined yet.',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default AttributeController;
