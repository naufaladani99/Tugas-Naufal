import React, { useState, useEffect } from "react";
import JobApi from "../../api/JobApi";

export default function FormEditJobApi(props) {
  const [Job, setJob] = useState([]);
  const [values, setValues] = useState({
    jobId: undefined,
    jobTitle: undefined,
    minSalary: undefined,
    maxSalary: undefined,
  });
  useEffect(() => {
    JobApi.FindOne(props.id).then((data) => {
      setJob(data);
    });
  }, []);
  const HandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onEdit = async () => {
    const payload = {
      jobId: props.id,
      jobTitle: values.jobTitle,
      minSalary: values.minSalary,
      maxSalary: values.maxSalary,
    };
    await JobApi.Update(payload).then(() => {
      props.setRefresh(true);
      window.alert("Data Successfully Updated");
    });
  };
  return (
    <div>
      <h2>Edit Job</h2>
      <form onSubmit={onEdit}>
        <div>
          <label>Job ID : </label>
          <input
            type="text"
            defaultValue={Job.jobId}
            onChange={HandleChange("jobId")}
            disabled
          ></input>
        </div>
        <div>
          <label>Job Title : </label>
          <input
            type="text"
            placeholder="Job Title"
            onChange={HandleChange("jobTitle")}
          ></input>
        </div>
        <div>
          <label>Min Salary : </label>
          <input
            type="number"
            placeholder="Min Salary"
            onChange={HandleChange("minSalary")}
          ></input>
        </div>
        <div>
          <label>Max Salary : </label>
          <input
            type="number"
            placeholder="Max Salary"
            onChange={HandleChange("maxSalary")}
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
