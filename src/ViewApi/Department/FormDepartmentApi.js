import React, { useState } from "react";
import DepartmentApi from "../../api/DepartmentApi";

export default function FormDepartmentApi(props) {
  const [values, setValues] = useState({
    departmentId: undefined,
    departmentName: undefined,
    managerId: undefined,
    locationId: undefined,
  });
  const HandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onSubmit = async () => {
    const payload = {
      departmentId: values.departmentId,
      departmentName: values.departmentName,
      managerId: values.managerId,
      locationId: values.locationId,
    };
    await DepartmentApi.Create(payload).then(() => {
      props.setRefresh(true);
      window.alert("Data Successfully Insert");
    });
  };
  return (
    <div>
      <h2>Add department</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>department ID : </label>
          <input
            type="text"
            placeholder="department ID"
            onChange={HandleChange("departmentId")}
          ></input>
        </div>
        <div>
          <label>department Name : </label>
          <input
            type="text"
            placeholder="department Name"
            onChange={HandleChange("departmentName")}
          ></input>
        </div>
        <div>
          <label>Manager ID : </label>
          <input
            type="text"
            placeholder="Manager ID"
            onChange={HandleChange("managerId")}
          ></input>
        </div>
        <div>
          <label>Location ID : </label>
          <input
            type="text"
            placeholder="Location ID"
            onChange={HandleChange("locationId")}
          ></input>
        </div>
        <div>
          <button type="submit">Simpan</button>
          <button onClick={() => props.setDisplay(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
