import React, { useState, useEffect } from "react";
import JobApi from "../../api/JobApi";

export default function FormEditJobApi(props) {
  const [job, setjob] = useState([]);
  const [values, setValues] = useState({
    jobId: undefined,
    streetAddress: undefined,
    postalCode: undefined,
    city: undefined,
    stateProvince: undefined,
    country: undefined,
  });
  useEffect(() => {
    JobApi.FindOne(props.id).then((data) => {
      setjob(data);
    });
  }, []);
  const HandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onEdit = async () => {
    const payload = {
      jobId: props.id,
      streetAddress: values.streetAddress,
      postalCode: values.postalCode,
      city: values.city,
      stateProvince: values.stateProvince,
      country: values.country,
    };
    await JobApi.Update(payload).then(() => {
      props.setRefresh(true);
      window.alert("Data Successfully Updated");
    });
  };
  return (
    <div>
      <h2>Edit job</h2>
      <form onSubmit={onEdit}>
        <div>
          <label>job ID : </label>
          <input
            type="text"
            defaultValue={job.jobId}
            onChange={HandleChange("jobId")}
            disabled
          ></input>
        </div>
        <div>
          <label>Street Address : </label>
          <input
            type="text"
            placeholder="Street Address"
            onChange={HandleChange("streetAddress")}
          ></input>
        </div>
        <div>
          <label>Postal Code : </label>
          <input
            type="text"
            placeholder="Postal Code"
            onChange={HandleChange("postalCode")}
          ></input>
        </div>
        <div>
          <label>City : </label>
          <input
            type="text"
            placeholder="City"
            onChange={HandleChange("city")}
          ></input>
        </div>
        <div>
          <label>State Province : </label>
          <input
            type="text"
            placeholder="State Province"
            onChange={HandleChange("stateProvince")}
          ></input>
        </div>
        <div>
          <label>Country : </label>
          <input
            type="text"
            placeholder="Country"
            onChange={HandleChange("country")}
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
