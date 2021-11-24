import axios, { AxiosRequestConfig } from "axios";
import config from "../config/config";

const render = async (shortid: string, reportData: object) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: String(config.JSReport.hostname),
      responseType: "arraybuffer",
      data: {
        template: { shortid },
        option: { preview: true },
        data: reportData,
      },
      auth: {
        username: String(config.JSReport.username),
        password: String(config.JSReport.password),
      },
    };

    return axios(options);
  } catch (error) {
    return error;
  }
};

export default {
  render,
};
