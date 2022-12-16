import React, { useState, useEffect } from "react";
import DepartmentApi from "../../api/DepartmentApi";

export default function FormEditDepartmentApi(props) {
  const [department, setDepartment] = useState([]);
  const [values, setValues] = useState({
    departmentId: undefined,
    departmentName: undefined,
    managerId: undefined,
    locationId: undefined,
  });
  useEffect(() => {
    DepartmentApi.FindOne(props.id).then((data) => {
      setDepartment(data);
    });
  }, []);
  const HandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onEdit = async () => {
    const payload = {
      departmentId: props.id,
      departmentName: values.departmentName,
      managerId: values.employeeId,
      locationId: values.locationId,
    };
    await DepartmentApi.Update(payload).then(() => {
      props.setRefresh(true);
      window.alert("Data Successfully Updated");
    });
  };
  return (
    <div>
      <h2>Edit department</h2>
      <form onSubmit={onEdit}>
        <div>
          <label>department ID : </label>
          <input
            type="number"
            defaultValue={department.departmentId}
            onChange={HandleChange("departmentId")}
            disabled
          ></input>
        </div>
        <div>
          <label>department Name : </label>
          <input
            type="text"
            defaultValue={department.departmentName}
            onChange={HandleChange("departmentName")}
          ></input>
        </div>
        <div>
          <label>Manager ID : </label>
          <input
            type="number"
            defaultValue={department.managerId}
            onChange={HandleChange("managerId")}
          ></input>
        </div>
        <div>
          <label>Location ID : </label>
          <input
            type="number"
            defaultValue={department.locationId}
            onChange={HandleChange("locationId")}
          ></input>
        </div>
        <div>
          <button type="submit">Simpan</button>
          <button onClick={() => props.setDisplayEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
