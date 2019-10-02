/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import { Customer } from '../database/models';

class CustomerServices {

  static async _getCustomerProfile(customer_id) {
    const customer = await Customer.findByPk(customer_id);

    return customer;
  }

  static async _updateCustomerAddress(
    customer_id,
    address_1,
    address_2,
    city,
    region,
    postal_code,
    shipping_region_id
  ) {
    try {
      const newCustomerDetails = await Customer.findOne({
        where: { customer_id },
      });

      newCustomerDetails.update({
        address_1,
        address_2,
        city,
        region,
        postal_code,
        shipping_region_id,
      });

      return newCustomerDetails.dataValues;
    } catch (error) {
      return 'Null';
    }
  }

  static async _updateCustomerDetails(customer_id, email, name, day_phone, eve_phone, mob_phone) {
    try {
      const newDetails = await Customer.findOne({
        where: { customer_id },
      });

      newDetails.update({ email, name, day_phone, eve_phone, mob_phone });

      return newDetails;
    } catch (error) {
      return 'Null';
    }
  }

  static async _updateCreditCard(customer_id, credit_card) {
    try {
      const newDetails = await Customer.findOne({
        where: { customer_id },
      });

      newDetails.update({ credit_card });

      return newDetails;
    } catch (error) {
      return 'Null';
    }
  }
}

export default CustomerServices;
