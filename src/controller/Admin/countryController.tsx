import axios from "axios";

export const stateApi = async () => {
  try {
    const data: any = axios.get(
      "https://api.countrystatecity.in/v1/countries/IN/states",
      {
        headers: {
          "X-CSCAPI-KEY":
            "UDZYZHZ0eFJvTGdxdUdkTTVCcnlvdnQxemZuNHRBMVlObzhIdkZ1SQ==",
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const cityApi = async (value: any) => {
  try {
    const data: any = axios.get(
      `https://api.countrystatecity.in/v1/countries/IN/states/${value}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "UDZYZHZ0eFJvTGdxdUdkTTVCcnlvdnQxemZuNHRBMVlObzhIdkZ1SQ==",
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
