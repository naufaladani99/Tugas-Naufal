import React, { useState, useEffect } from "react";
import LocationApi from "../../api/LocationApi";
import FormikAddLocationApi from "./FormikAddLocationApi";
import FormikEditLocationApi from "./FormikEditLocationApi";

export default function FormikLocationViewApi() {
  const [location, setLocation] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState();

  const [display, setDisplay] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);

  useEffect(() => {
    LocationApi.list().then((data) => {
      setLocation(data);
    });
    setRefresh(false);
  }, [refresh]);

  const onDelete = async (id) => {
    LocationApi.Delete(id).then(() => {
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
        <FormikEditLocationApi
          id={id}
          setDisplay={setDisplayEdit}
          closeAdd={() => setDisplayEdit(false)}
          onRefresh={() => setRefresh(true)}
        />
      ) : display ? (
        <FormikAddLocationApi
          setDisplay={setDisplay}
          closeAdd={() => setDisplay(false)}
          onRefresh={() => setRefresh(true)}
        />
      ) : (
        <>
          <h2>List Location</h2>
          <button onClick={() => setDisplay(true)}>Add Location</button>
          <table>
            <thead>
              <tr>
                <th>Location ID</th>
                <th>Street Address</th>
                <th>Postal Code</th>
                <th>City</th>
                <th>State Province</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {location &&
                location.map((loc) => (
                  <tr key={loc.locationId}>
                    <td>{loc.locationId}</td>
                    <td>{loc.streetAddress}</td>
                    <td>{loc.postalCode}</td>
                    <td>{loc.city}</td>
                    <td>{loc.stateProvince}</td>
                    <td>{loc.country.countryId}</td>
                    <td>
                      <button onClick={() => onDelete(loc.locationId)}>
                        Delete Location
                      </button>
                      <button onClick={() => onClick(loc.locationId)}>
                        Edit Location
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
