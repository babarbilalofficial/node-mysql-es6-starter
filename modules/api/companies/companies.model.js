import dbcon, { execQuery } from "../../../db";
import TABLES from "../../../db/tables";

const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;
const model = {};

const getSafeUserColumns = () => {
  let COLUMNS = Object.keys(TABLES.LOGIN.COLUMNS);
  COLUMNS.splice(COLUMNS.indexOf(TABLES.LOGIN.COLUMNS.password), 1);
  return COLUMNS.join(",");
}

model.getCompanies = async (params = {}) => {
  let START = params.start || DEFAULT_START;
  let LIMIT = params.limit || DEFAULT_LIMIT;
  const result = await execQuery(`select ${getSafeUserColumns()} from ${TABLES.LOGIN.TITLE} LIMIT ${START}, ${LIMIT}`);
  return result;
}


export default model;

