/**
 * Tax controller contains methods which are needed for all tax request
 * Implement the functionality for the methods
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import db from '../database/models';

class TaxController {
  /**
   * This method get all taxes
   */
  static async getAllTax(req, res, next) {
    try {
      const taxes = await db.Tax.findAll();
      return res.status(200).send(taxes);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a single tax using the tax id
   */
  static async getSingleTax(req, res, next) {
    // eslint-disable-next-line camelcase
    const { tax_id } = req.params;
    try {
      const response = await db.Tax.findOne({
        where: {
          tax_id,
        },
      });
      return response
        ? res.status(200).send(response)
        : res.status(404).send({
            error: {
              status: 404,
              code: 'SHP_01',
              // eslint-disable-next-line camelcase
              message: `Tax with tax_id ${tax_id} not found`,
            },
          });
    } catch (error) {
      return next(error);
    }
  }
}

export default TaxController;
