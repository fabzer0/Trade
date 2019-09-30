/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import { Attribute, AttributeValue, ProductAttribute } from '../database/models';

class AttributeServices {
  static async _getAllAttributes() {
    const attributes = await Attribute.findAll();

    return attributes;
  }

  static async _getSingleAttribute(attribute_id) {
    const attribute = await Attribute.findOne({
      where: { attribute_id },
    });

    return attribute;
  }

  static async _getAttributeValues(attribute_id) {
    const attrValues = await AttributeValue.findAll({
      where: { attribute_id },
      raw: true,
    });

    return attrValues;
  }

  static async _getAllAttributesOfProduct(product_id) {
    const attributes = ProductAttribute.findAll({
      where: { product_id },
      include: [
        {
          model: AttributeValue, as: 'attribute_value',
          include: [{ model: Attribute, as: 'attribute_type' }],
        },
      ],
    });

    return attributes;
  }
}

export default AttributeServices;
