import axios from "axios";
// retailer

export const saveBooking = async (values: any) => {
 
  try {
    const { data } = await axios.post(`/api/admin/booking`, values);

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const updateBooking = async (values: any) => {


  try {
    const { data } = await axios.put(`/api/admin/booking`, values);

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const deleteBooking = async (id: any) => {
  // console.log(values);
  try {
    const { data } = await axios.delete(`/api/admin/booking?_id=${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
