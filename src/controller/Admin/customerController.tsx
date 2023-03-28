import axios from "axios";

// distributor

export const saveCustomer = async (values: any) => {
  var bcrypt = require("bcryptjs");
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(values.password, salt);

  values.password = hash;
  try {
    const { data } = await axios.post(`/api/admin/customer`, values);

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const updateCustomer = async (values: any) => {
  if (values.password) {
    var bcrypt = require("bcryptjs");
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(values.password, salt);
    values.password = hash;
  }
  try {
    const { data } = await axios.put(`/api/admin/customer`, values);

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};


export const deleteCustomer = async (id: any) => {
  // console.log(values);
  try {
    const { data } = await axios.delete(`/api/admin/customer?_id=${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
