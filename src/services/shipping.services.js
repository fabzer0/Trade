/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import { ShippingRegion, Shipping } from '../database/models';

class ShippingServices {
  static async _getAllShippingRegions() {
    const regions = await ShippingRegion.findAll();

    return regions;
  }

  static async _getShippingType(shipping_region_id) {
    const shippingTypes = await Shipping.findAll({
      where: { shipping_region_id },
    });

    return shippingTypes;
  }
}

export default ShippingServices;
