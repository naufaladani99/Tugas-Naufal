import React, { useState, useEffect } from "react";
import JobApi from "../../api/JobApi";
import FormEditJobApi from "./FormEditJobApi";
import FormJobApi from "./FormJobApi";

export default function JobViewApi() {
  const [Job, setJob] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState();

  const [display, setDisplay] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);

  useEffect(() => {
    JobApi.list().then((data) => {
      setJob(data);
    });
    setRefresh(false);
  }, [refresh]);

  const onDelete = async (id) => {
    JobApi.Delete(id).then((req) => {
      console.log(req);
      setRefresh(true);
      window.alert("Data Successfully Delete");
    });
  };
  const onClick = (id) => {
    setDisplayEdit(true);
    setId(id);
  };
  return (
    <div>
      {displayEdit ? (
        <FormEditJobApi
          id={id}
          setRefresh={setRefresh}
          setDisplayEdit={setDisplayEdit}
        />
      ) : display ? (
        <FormJobApi setRefresh={setRefresh} setDisplay={setDisplay} />
      ) : (
        <>
          <h2>List Job</h2>
          <button onClick={() => setDisplay(true)}>Add Job</button>
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Job Title</th>
                <th>Min Salary</th>
                <th>Max Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Job &&
                Job.map((job) => (
                  <tr key={job.JobId}>
                    <td>{job.jobId}</td>
                    <td>{job.jobTitle}</td>
                    <td>{job.minSalary}</td>
                    <td>{job.maxSalary}</td>

                    <td>
                      <button onClick={() => onDelete(job.jobId)}>
                        Delete Job
                      </button>
                      <button onClick={() => onClick(job.jobId)}>
                        Edit Job
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
