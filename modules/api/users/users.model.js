import dbcon, { execQuery } from "../../../db";
import TABLES from "../../../db/tables";
import SQLString from "sqlstring";

const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;
const model = {};

const getSafeUserColumns = () => {
  let COLUMNS = Object.keys(TABLES.LOGIN.COLUMNS);
  COLUMNS.splice(COLUMNS.indexOf(TABLES.LOGIN.COLUMNS.password), 1);
  return COLUMNS.join(",");
}

model.getUsers = async (params = {}) => {
  let START = params.start || DEFAULT_START;
  let LIMIT = params.limit || DEFAULT_LIMIT;
  const result = await execQuery(`select ${getSafeUserColumns()} from ${TABLES.LOGIN.TITLE} LIMIT ${START}, ${LIMIT}`);
  return result;
}

model.getUserById = async (id) => {
  const result = await execQuery(SQLString.format(`select ${getSafeUserColumns} 
  from ${TABLES.LOGIN.TITLE}
  where ${TABLES.LOGIN.COLUMNS.id} = ?`, [id]));
  return result;
}

model.getUserByLogin = async (login) => {
  const result = await execQuery(SQLString.format(`select * from ${TABLES.LOGIN.TITLE}
  where ${TABLES.LOGIN.COLUMNS.login} = ?`, [login]));
  return result.length ? result[0] : null;
}

model.getUserByEmail = async (email) => {
  const result = await execQuery(SQLString.format(`select ${getSafeUserColumns()}
  from ${TABLES.LOGIN.TITLE}
  where ${TABLES.LOGIN.COLUMNS.email} = `, [email]));
  return result;
}

model.getUserByLoginOrEmail = async (login, email) => {
  const result = await execQuery(SQLString.format(`select ${getSafeUserColumns()}
  from ${TABLES.LOGIN.TITLE}
  where ${TABLES.LOGIN.COLUMNS.login} = ?
  OR ${TABLES.LOGIN.COLUMNS.email} = ?`, [login, email]));
  return result;
}

model.createUser = async (data) => {
  const save = await execQuery(SQLString.format(`insert into ${TABLES.LOGIN.TITLE} SET ?`, data));
  const result = await model.getUserByLogin(data.login);
  return result;
}

export default model;

