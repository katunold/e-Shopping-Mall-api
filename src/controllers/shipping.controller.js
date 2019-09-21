/**
 * The Shipping Controller contains all the static methods that handles all shipping request
 * This piece of code work fine, but you can test and debug any detected issue
 *
 * - getShippingRegions - Returns a list of all shipping region
 * - getShippingType - Returns a list of shipping type in a specific shipping region
 *
 */
import db from '../database/models';

class ShippingController {
  /**
   * get all shipping regions
   */
  static async getShippingRegions(req, res, next) {
    try {
      const shippingRegions = await db.ShippingRegion.findAll();
      return res.status(200).send({
        shippingRegions,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get get shipping region shipping types
   */
  static async getShippingType(req, res, next) {
    const { shipping_region_id } = req.params; // eslint-disable-line
    try {
      const shippingTypes = await db.Shipping.findAll({
        where: {
          shipping_region_id,
        },
      });

      return res.status(200).send({
        shippingTypes,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ShippingController;
