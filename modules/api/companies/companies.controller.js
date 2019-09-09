import Companies from "./companies.model";
import logger from "../../logger";
import STATUS from "../../status.codes";

const controller = {};

controller.get = async(req, res) => {
  try {
    const users = await Companies.getCompanies();
    res.status(STATUS.SUCCESS).json(users);
  } catch (err) {
    logger.error("Error in getting users- " + err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
}

export default controller;
