const TABLE_NAMES = {
  LOGIN: {
    TITLE: "login",
    COLUMNS: { 
      id: "id",
      first_name: "first_name",
      last_name: "last_name",
      login: "login",
      password: "password",
      email: "email",
      login_role_id: "login_role_id",
      status_id: "status_id"
    }
  },
  LOGIN_STATUS: {
    TITLE: "login_status",
    COLUMNS: {
      id: "id",
      status: "status",
      is_active: "is_active"
    }
  },
  LOGIN_LOG: {
    TITLE: "login_log",
    COLUMNS: {
      id: "id",
      login_id: "login_id",
      ip: "ip",
      continent: "continent",
      country: "country",
      city: "city",
      isp: "isp",
      lat: "lat",
      lng: "lng",
      flag: "flag",
      browser: "browser",
      is_active: "is_active"
    }
  }
};

export default TABLE_NAMES;
