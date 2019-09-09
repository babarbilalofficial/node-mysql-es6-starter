const id = "id";
const first_name = "first_name";
const last_name = "last_name";
const login = "login";
const email = "email";
const password = "password";
const login_role_id = "login_role_id";
const status_id = "status_id";
const status = "status";
const is_active = "is_active";
const login_id = "login_id";
const ip = "ip";
const continent = "continent";
const country = "country";
const city = "city";
const isp = "isp";
const lat = "lat";
const lng = "lng";
const flag = "flag";
const browser = "browser";


const TABLE_NAMES = {
  LOGIN: {
    TITLE: "login",
    COLUMNS: { id, first_name, last_name, login, password, email, login_role_id, status_id }
  },
  LOGIN_STATUS: {
    TITLE: "login_status",
    COLUMNS: { id, status, is_active }
  },
  LOGIN_LOG: {
    TITLE: "login_log",
    COLUMNS: { id, login_id, ip, continent, country, city, isp, lat, lng, flag, browser, is_active }
  }
};

export default TABLE_NAMES;
