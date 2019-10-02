/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/**
 * The Product controller contains all static methods that handles product request
 * Some methods work fine, some needs to be implemented from scratch while others may contain one or two bugs
 * The static methods and their function include:
 *
 * - getAllProducts - Return a paginated list of products
 * - searchProducts - Returns a list of product that matches the search query string
 * - getProductsByCategory - Returns all products in a product category
 * - getProductsByDepartment - Returns a list of products in a particular department
 * - getProduct - Returns a single product with a matched id in the request params
 * - getAllDepartments - Returns a list of all product departments
 * - getDepartment - Returns a single department
 * - getAllCategories - Returns all categories
 * - getSingleCategory - Returns a single category
 * - getDepartmentCategories - Returns all categories in a department
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import {
  Product,
  ProductCategory,
  Department,
  AttributeValue,
  Attribute,
  Category,
  Sequelize,
} from '../database/models';
import { DEFAULT_PRODUCT_SIZE as defaultSize, DEFAULT_STARTING_PAGE as pageNo } from '../constants';
import ProductServices from '../services/product.services';

const { Op } = Sequelize;

/**
 *
 *
 * @class ProductController
 */
class ProductController {
  /**
   * get all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getAllProducts(req, res, next) {
    let { page, limit } = req.query;
    page = +page || pageNo;
    limit = +limit || defaultSize;
    const offset = +page * +limit - +limit;
    const sqlQueryMap = {
      limit,
      offset,
    };
    try {
      const { count, rows } = await ProductServices._getAllProducts(sqlQueryMap);
      const totalPages = Math.trunc(count / limit);
      const paginationMeta = {
        currentPage: page,
        currentPageSize: limit,
        totalPages,
        totalRecords: count,
      };
      return res.status(200).json({
        paginationMeta,
        rows,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * search all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async searchProduct(req, res, next) {
    const { query_string, all_words } = req.query; // eslint-disable-line
    // all_words should either be on or off
    // implement code to search product
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * get all products by category
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getProductsByCategory(req, res, next) {
    const { category_id } = req.params;
    let { query: { page, limit } } = req;
    page = +page || pageNo;
    limit = +limit || defaultSize;
    const offset = +page * +limit - +limit;
    try {
      // eslint-disable-line
      const products = await ProductServices._getAllProductsInCategory(category_id, limit, offset);

      if (products) {
        return res.status(200).json(products);
      }

      return res.status(404).json({
        message: 'There are not products in this category.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all products by department
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getProductsByDepartment(req, res, next) {
    // implement the method to get products by department
    const { department_id } = req.params;
    try {
      const products = await ProductServices._getAllProductsInDepartment(department_id);
      if (products) {
        return res.status(200).json(products);
      }

      return res.status(404).json({
        success: false,
        message: 'This category has no products yet.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get single product details
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product details
   * @memberof ProductController
   */
  static async getProduct(req, res, next) {
    const { product_id } = req.params; // eslint-disable-line
    try {
      const product = await ProductServices._getSingleProduct(product_id);
      if (product) {
        return res.status(200).json(product);
      }

      return res.status(404).json({
        success: false,
        message: `Product with id ${product_id} does not exist`,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all departments
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and department list
   * @memberof ProductController
   */
  static async getAllDepartments(_, res, next) {
    try {
      const departments = await Department.findAll();
      return res.status(200).json(departments);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get a single department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartment(req, res, next) {
    const { department_id } = req.params; // eslint-disable-line
    try {
      const department = await Department.findByPk(department_id);
      if (department) {
        return res.status(200).json(department);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `Department with id ${department_id} does not exist`, // eslint-disable-line
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get all categories
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllCategories(_, res, next) {
    // Implement code to get all categories here
    try {
      const categories = await Category.findAll();
      return res.status(200).json({
        rows: categories,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get a single category using the categoryId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleCategory(req, res, next) {
    const { category_id } = req.params; // eslint-disable-line
    // implement code to get a single category here
    try {
      const category = await Category.findByPk(category_id);
      if (category) {
        return res.status(200).json(category);
      }
      return res.status(404).json({
        error: {
          status: 404,
          // eslint-disable-next-line camelcase
          message: `Category with id ${category_id} does not exist`,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getProductCategory(req, res, next) {
    // This method returns a category of a particular product
    const { product_id } = req.params;
    try {
      const { category } = await ProductServices._getProductCategory(product_id);
      if (category) {
        return res.status(200).json({
          category_id: category.category_id,
          department_id: category.department_id,
          name: category.name,
        });
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `Product with id ${product_id} does not exist`,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get list of categories in a department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartmentCategories(req, res, next) {
    const { department_id } = req.params; // eslint-disable-line
    // implement code to get categories in a department here

    try {
      const categories = await ProductServices._getDepartmentCategories(department_id);
      if (categories) {
        return res.status(200).json({
          rows: categories,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async getProductReviews(req, res, next) {
    const { product_id } = req.params;
    try {
      const reviews = await ProductServices._getProductReviews(product_id);
      if (reviews.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'This product has not reviews yet.',
        });
      }

      return res.status(200).json(reviews);
    } catch (error) {
      return next(error);
    }
  }

  static async postReview(req, res, next) {
    const { headers: { customer_id }, body: { product_id, review, rating } } = req;
    try {
      const reviews = await ProductServices._postReview(customer_id, product_id, review, rating);

      if (reviews) {
        return res.status(201).json(reviews)
      }

      return res.status(400).json({
        message: 'Could not complete this request',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductController;
