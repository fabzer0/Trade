/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import { ProductCategory, Category, Product, Review } from '../database/models';

class ProductServices {
  static async _getAllProducts(query) {
    const products = await Product.findAndCountAll(query);

    return products;
  }

  static async _getSingleProduct(product_id) {
    const product = await Product.findOne({
      where: { product_id }
    })

    return product;
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

  static async _getAllProductsInDepartment(department_id) {
    const products = await Category.findAll({
      where: { department_id },
      include: [ 
        { model: Product, as: 'products' }
      ]
    })

    return products;
  }

  static async _getAllProductsInCategory(category_id, limit, offset) {
    const products = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          where: {
            category_id,
          },
        }
      ],
      limit,
      offset,
    })

    return products;
  }

  static async _getProductReviews(product_id) {
    const reviews = await Review.findAll({
      where: { product_id },
      raw: true,
    })

    return reviews;
  }

  static async _postReview(customer_id, product_id, review, rating) {
    const productReview = await Review.create({
      customer_id,
      product_id,
      review,
      rating,
    });

    return productReview.dataValues;
  }

  static async _searchProduct() {
    
  }
}

export default ProductServices;
