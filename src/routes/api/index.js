import { Router } from 'express';
import welcomeRoute from './welcome.route';
import customerRoute from './customer.route';
import productRoute from './product.route';
import shoppingCartRoute from './shoppingCart.route';
import shippingRoute from './shipping.route';
import taxRoute from './tax.route';
import attributeRoute from './attribute.route';

const routes = Router();

const apiPrefix = '/api/v1';

routes.use(welcomeRoute);
routes.use(apiPrefix, customerRoute);
routes.use(apiPrefix, productRoute);
routes.use(apiPrefix, shoppingCartRoute);
routes.use(apiPrefix, shippingRoute);
routes.use(apiPrefix, taxRoute);
routes.use(apiPrefix, attributeRoute);

export default routes;
