import Axios from "axios";

const URL_STRING = "http://localhost:8000/api/engineer";

export const getAllEngineer = (config) => {
  console.log(config)
  return {
    type: "GET_ALL_ENGINEER",
    payload: Axios.get(URL_STRING,config)
  };
};
