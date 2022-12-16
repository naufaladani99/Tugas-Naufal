// import React, { useState, useEffect } from "react";
// import jobHistoryApi from "../../api/jobHistoryApi";
// import FormEditLocationApi from "./FormEditLocationApi";
// import FormJobHistoryApi from "./FormjobHistoryApi";

// export default function jobHistoryViewApi() {
//   const [jobHistory,setjobHistory] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const [id, setId] = useState();

//   const [display, setDisplay] = useState(false);
//   const [displayEdit, setDisplayEdit] = useState(false);

//   useEffect(() => {
//     jobHistoryApi.list().then((data) => {
//       console.log(data);
//       setjobHistory(data);
//     });
//     setRefresh(false);
//   }, [refresh]);

//   const onDelete = async (id) => {
//     jobHistoryApi.Delete(id).then((req) => {
//       console.log(req);
//       setRefresh(true);
//       window.alert("Data Successfully Delete");
//     });
//   };
//   const onClick = (id) => {
//     setDisplayEdit(true);
//     setId(id);
//   };
//   return (
//     <div>
//       {displayEdit ? (
//         <FormEditjobHistoryApi
//           id={id}
//           setRefresh={setRefresh}
//           setDisplayEdit={setDisplayEdit}
//         />
//       ) : display ? (
//         <FormjobHistoryApi setRefresh={setRefresh} setDisplay={setDisplay} />
//       ) : (
//         <>
//           <h2>List jobHistory/h2>
//           <button onClick={() => setDisplay(true)}>Add jobHistory/button>
//           <table>
//             <thead>
//               <tr>
//                 <th>employeeId </th>
//                 <th>startDate</th>
//                 <th>endDate</th>
//                 <th>job</th>

//               </tr>
//             </thead>
//             <tbody>
//               {jobHistory &&
//                 jobHistory.map((loc) => (
//                   <tr key={loc.employeeId}>
//                     <td>{loc.employeeId}</td>
//                     <td>{loc.startDate}</td>
//                     <td>{loc.endDate}</td>
//                     <td>{loc.job}</td>

//                     <td>
//                       <button onClick={() => onDelete(loc.locationId)}>
//                         Delete Location
//                       </button>
//                       <button onClick={() => onClick(loc.locationId)}>
//                         Edit Location
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// }
