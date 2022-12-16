import axios from "axios";
import config from "../Config/config";

const list = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/job/`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};
const Delete = async (id) => {
  try {
    const result = await axios.delete(`${config.domain}/api/job/${id}`);
    return result;
  } catch (error) {
    return await error.message;
  }
};
const Create = async (payload) => {
  try {
    const result = await axios.post(`${config.domain}/api/job/`, payload);
    console.log(payload);
    return result;
  } catch (error) {
    return await error.message;
  }
};
const Update = async (data) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/job/${data.jobId}`,
      data
    );
    return result;
  } catch (error) {
    return await error.message;
  }
};
const UpdateFile = async (data) => {
  const id = parseInt(data.get("job"));
  try {
    const result = await axios.put(`${config.domain}/api/job/${id}`, data);
    return result;
  } catch (error) {
    return await error.message;
  }
};
const FindOne = async (id) => {
  try {
    const result = await axios.get(`${config.domain}/api/job/${id}`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};
export default { list, Delete, Create, Update, FindOne, UpdateFile };