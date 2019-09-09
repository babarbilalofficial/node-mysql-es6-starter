import { execQuery } from "../../../db";
import TABLES from "../tables";
import SQLString from "sqlstring";

const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;
const model = {};
const TABLE_NAME = TABLES.LOGIN.TITLE;
const COLUMNS = TABLES.LOGIN.COLUMNS;

const getSafeUserColumns = () => {
  let TEMP_COLUMNS = Object.keys(COLUMNS);
  TEMP_COLUMNS.splice(TEMP_COLUMNS.indexOf(TEMP_COLUMNS.password), 1);
  return TEMP_COLUMNS.join(",");
}

const SAFE_COLUMNS = getSafeUserColumns();

model.getUsers = async (params = {}) => {
  let START = params.start || DEFAULT_START;
  let LIMIT = params.limit || DEFAULT_LIMIT;
  const result = await execQuery(`select ${SAFE_COLUMNS} from ${TABLE_NAME} LIMIT ${START}, ${LIMIT}`);
  return result;
}

model.getUserById = async (id) => {
  const result = await execQuery(SQLString.format(`select ${getSafeUserColumns} 
  from ${TABLE_NAME}
  where ${COLUMNS.id} = ?`, [id]));
  return result;
}

model.getUserByLogin = async (login) => {
  const result = await execQuery(SQLString.format(`select * from ${TABLE_NAME}
  where ${COLUMNS.login} = ?`, [login]));
  return result.length ? result[0] : null;
}

model.getUserByEmail = async (email) => {
  const result = await execQuery(SQLString.format(`select ${getSafeUserColumns()}
  from ${TABLE_NAME}
  where ${COLUMNS.email} = `, [email]));
  return result;
}

model.getUserByLoginOrEmail = async (login, email) => {
  const result = await execQuery(SQLString.format(`select ${getSafeUserColumns()}
  from ${TABLE_NAME}
  where ${COLUMNS.login} = ?
  OR ${COLUMNS.email} = ?`, [login, email]));
  return result;
}

model.createUser = async (data) => {
  const save = await execQuery(SQLString.format(`insert into ${TABLE_NAME} SET ?`, data));
  const result = await model.getUserByLogin(data.login);
  return result;
}

export default model;

