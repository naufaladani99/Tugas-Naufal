import React, { useState, useEffect } from "react";
import DepartmentApi from "../../api/DepartmentApi";
import FormEditDepartmentApi from "./FormEditDepartmentApi";
import FormDepartmentApi from "./FormDepartmentApi";

export default function DepartmentViewApi() {
  const [department, setDepartment] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState();

  const [display, setDisplay] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);

  useEffect(() => {
    DepartmentApi.list().then((data) => {
      setDepartment(data);
    });
    setRefresh(false);
  }, [refresh]);

  const onDelete = async (id) => {
    DepartmentApi.Delete(id).then((req) => {
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
        <FormEditDepartmentApi
          id={id}
          setRefresh={setRefresh}
          setDisplayEdit={setDisplayEdit}
        />
      ) : display ? (
        <FormDepartmentApi setRefresh={setRefresh} setDisplay={setDisplay} />
      ) : (
        <>
          <h2>List department</h2>
          <button onClick={() => setDisplay(true)}>Add department</button>
          <table>
            <thead>
              <tr>
                <th>department ID</th>
                <th>department Name</th>
                <th>manager ID</th>
                <th>location ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {department &&
                department.map((dep) => (
                  <tr key={dep.departmentId}>
                    <td>{dep.departmentId}</td>
                    <td>{dep.departmentName}</td>
                    <td>{dep.manager?.employeeId}</td>
                    <td>{dep.location.locationId}</td>
                    <td>
                      <button onClick={() => onDelete(dep.departmentId)}>
                        Delete department
                      </button>
                      <button onClick={() => onClick(dep.departmentId)}>
                        Edit department
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
