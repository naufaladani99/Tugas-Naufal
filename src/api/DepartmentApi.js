import axios from "axios";
import config from "../Config/config";

const list = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/department/`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};
const Delete = async (id) => {
  try {
    const result = await axios.delete(`${config.domain}/api/department/${id}`);
    return result;
  } catch (error) {
    return await error.message;
  }
};
const Create = async (payload) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/department/`,
      payload
    );
    console.log(payload);
    return result;
  } catch (error) {
    return await error.message;
  }
};
const Update = async (data) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/department/${data.departmentId}`,
      data
    );
    return result;
  } catch (error) {
    return await error.message;
  }
};
const UpdateFile = async (data) => {
  const id = parseInt(data.get("departmentId"));
  try {
    const result = await axios.put(
      `${config.domain}/api/department/${id}`,
      data
    );
    return result;
  } catch (error) {
    return await error.message;
  }
};
const FindOne = async (id) => {
  try {
    const result = await axios.get(`${config.domain}/api/department/${id}`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};
export default { list, Delete, Create, Update, FindOne, UpdateFile };
