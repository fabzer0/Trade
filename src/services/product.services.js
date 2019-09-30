/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import { ProductCategory, Category, Product } from '../database/models';

class ProductServices {
  static async _getAllProducts(query) {
    const products = await Product.findAndCountAll(query);

    return products;
  }

  static async _getProductCategory(product_id) {
    const category = await ProductCategory.findOne({
      where: { product_id },
      include: [{ model: Category, as: 'category' }],
    });

    return category.dataValues;
  }

  static async _getDepartmentCategories(department_id) {
    const categories = await Category.findAll({
      where: { department_id },
      raw: true,
    });

    return categories;
  }
}

export default ProductServices;
