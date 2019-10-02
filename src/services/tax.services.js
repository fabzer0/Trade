/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import { Tax } from '../database/models';

class TaxServices {
  static async _getAllTaxes() {
    const taxes = await Tax.findAndCountAll();

    return taxes;
  }

  static async _getSingleTax(tax_id) {
    const tax = await Tax.findOne({
      where: { tax_id },
    });

    return tax;
  }
}

export default TaxServices;
