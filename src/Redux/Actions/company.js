import Axios from "axios";

const URL_STRING = "http://localhost:8000/api/company/get/";

export const getCompany = (config, username) => {
  console.log(config)
  return {
    type: "GET_COMPANY",
    payload: Axios.get(URL_STRING + username, config)
  };
};
