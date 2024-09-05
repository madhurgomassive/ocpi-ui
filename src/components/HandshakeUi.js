// import React, { useState } from "react";
// import axios from "axios";

// const HandshakeUI = () => {
//   const [tokenA, setTokenA] = useState("");
//   const [url_endpoint, setUrl_endpoint] = useState("");
//   const [copySuccess, setCopySuccess] = useState("");
//   const [isSender, setIsSender] = useState(null);

//   const fetchTokenA = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/2.1/credentials`
//       );
//       console.log("TokenA", response.data.token);
//       setTokenA(response.data.token);
//       setUrl_endpoint(response.data.url);
//     } catch (error) {
//       console.error("Error fetching Token A:", error);
//     }
//   };

//   const handleCopyClick = async () => {
//     try {
//       // Copy text to clipboard
//       await navigator.clipboard.writeText(tokenA);
//       setCopySuccess("Copied!");
//     } catch (err) {
//       console.log("Failed to copy", err);
//       setCopySuccess("Failed to copy!");
//     }
//   };

//   const [versionDetails, setVersionDetails] = useState()
//   const [dataFound, setDataFound] = useState(false)
//   const [serverURL, setServerURL] = useState("");
//   const [inputTokenA, setInputTokenA] = useState("");

//   const fetchTokenB = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/2.1/credentials/generate-b`,
//         { tokenA: inputTokenA, url: serverURL }
//       );

//       setVersionDetails(response.data)
//       setDataFound(true)
//     } catch (error) {
//       console.error("Error fetching Token B:", error);
//     }
//   };



//   const handleRole = (state) => {
//     setIsSender(state);
//   };

//   return (
//     <div className="p-5">
//       <h1>Operator:-  &nbsp; {process.env.REACT_APP_API_URL}</h1>
//       {isSender == null ? (
//         <div>
//           <h2>Act as a</h2>
//           <button className="me-2" onClick={() => handleRole(true)}>
//             sender
//           </button>
//           <button onClick={() => handleRole(false)}>reciever</button>
//         </div>
//       ) : (
//         <button className="mb-4" onClick={() => handleRole(null)}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="25"
//             height="25"
//             fill="currentColor"
//             class="bi bi-arrow-left"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </button>
//       )}
//       {isSender == false ? (
//         <div>
//           <div>
//             <button onClick={fetchTokenA}>Generate Token A</button>
//             <h2>Token A:</h2>
//             <p>{tokenA}</p>{" "}
//             {tokenA && (
//               <button onClick={handleCopyClick}>Copy to Clipboard</button>
//             )}
//             {copySuccess && <p>{copySuccess}</p>}
//             <h2>URL:</h2>
//             <p>{url_endpoint}</p>
//           </div>
//         </div>
//       ) : null}
//       {isSender == true ? (
//         <div>
//           <div>
//             <h2>Exchange Token B</h2>
//             <div style={{ width: "100%", padding: "0 20px" }}>
//               <textarea
//                 value={inputTokenA}
//                 onChange={(e) => setInputTokenA(e.target.value)}
//                 placeholder="Enter Token A here"
//                 style={{
//                   width: "50%",
//                   padding: "10px",
//                   margin: "5px 0",
//                   boxSizing: "border-box",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   fontSize: "16px",
//                   minHeight: "100px", // Set a minimum height for the textarea
//                 }}
//               />
//             </div>
//             <div style={{ width: "100%", padding: "0 20px" }}>
//               <input
//                 type="text"
//                 value={serverURL}
//                 onChange={(e) => setServerURL(e.target.value)}
//                 placeholder="Enter URL Given by "
//                 style={{
//                   width: "50%",
//                   padding: "10px",
//                   margin: "5px 0",
//                   boxSizing: "border-box",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   fontSize: "16px",
//                 }}
//               />
//             </div>
//             <div style={{ width: "100%", padding: "0 20px" }}>
//               <button
//                 onClick={fetchTokenB}
//                 disabled={!serverURL && !inputTokenA}
//               >
//                 Submit Token A
//               </button>
//             </div>

//             {dataFound &&
//               <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//                 <h2>Operator Details</h2>
//                 {console.log(versionDetails)
//                 }           {/* Operator Name */}
//                 <div>
//                   <strong>Operator Name:</strong> {versionDetails?.operatorDetails?.operatorName}
//                 </div>

//                 {/* Version List */}
//                 <div style={{ marginTop: '20px' }}>
//                   <h3>Version List</h3>
//                   <ul>
//                     {versionDetails?.operatorDetails?.versionList?.map((version) => (
//                       <li key={version?._id}>
//                         <strong>Version:</strong> {version?.version} -
//                         <a href={version?.url} target="_blank" rel="noopener noreferrer"> {version?.url}</a>
//                       </li>
//                     ))}
//                     <div> timestapm :-{versionDetails?.operatorDetails?.versionListTimestamp} </div>
//                   </ul>
//                 </div>

//                 {/* Version Details */}
//                 <div style={{ marginTop: '20px' }}>
//                   <h3>Version Details</h3>
//                   {versionDetails?.operatorDetails?.versionDetails?.map((details, index) => (
//                     <div key={index}>
//                       {details._id?.map((versionDetail, idx) => (
//                         <div key={idx}>
//                           <strong>Version:</strong> {versionDetail?.version}
//                           <ul>
//                             {versionDetail?.endpoints?.map((endpoint) => (
//                               <li key={endpoint?.url}>
//                                 <strong>Identifier:</strong> {endpoint?.identifier} <br />

//                                 <strong>URL:</strong>
//                                 <a href={endpoint?.url} target="_blank" rel="noopener noreferrer">
//                                   {endpoint?.url}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                   <div> timestapm :-{versionDetails?.operatorDetails?.versionDetailsTimestamp} </div>

//                 </div>
//               </div>

//             }
//             <div></div>

//             <h2>Token B:</h2>
//             <p>{versionDetails?.tokenB?.tokenB}</p>    <span>{versionDetails?.tokenB?.timestamp}</span>
//           </div>


// {/* from here 3rd party operator details show */}


//           {dataFound &&
//               <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//                 <h2>Operator Details</h2>
//                 {console.log(versionDetails)
//                 }           {/* Operator Name */}
//                 <div>
//                   <strong>Operator Name:</strong> {versionDetails?.thirdPartyOPerator?.data?.operatorName}
//                 </div>

//                 {/* Version List */}
//                 <div style={{ marginTop: '20px' }}>
//                   <h3>Version List</h3>
//                   <ul>
//                     {versionDetails?.thirdPartyOPerator?.data?.versionList?.versionList?.map((version) => (
//                       <li key={version?._id}>
//                         <strong>Version:</strong> {version?.version} -
//                         <a href={version?.url} target="_blank" rel="noopener noreferrer"> {version?.url}</a>
//                       </li>
//                     ))}
//                     <div> timestapm :-{versionDetails?.thirdPartyOPerator?.data?.versionList?.versionListTimestamp} </div>
//                   </ul>
//                 </div>

//                 {/* Version Details */}
//                 <div style={{ marginTop: '20px' }}>
//                   <h3>Version Details</h3>
//                   {versionDetails?.thirdPartyOPerator?.data?.versionList?.versionDetails?.map((details, index) => (
//                     <div key={index}>
//                       {details._id?.map((versionDetail, idx) => (
//                         <div key={idx}>
//                           <strong>Version:</strong> {versionDetail?.version}
//                           <ul>
//                             {versionDetail?.endpoints?.map((endpoint) => (
//                               <li key={endpoint?.url}>
//                                 <strong>Identifier:</strong> {endpoint?.identifier} <br />

//                                 <strong>URL:</strong>
//                                 <a href={endpoint?.url} target="_blank" rel="noopener noreferrer">
//                                   {endpoint?.url}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                   <div> timestapm :-{versionDetails?.thirdPartyOPerator?.data?.versionList?.versionDetailsTimestamp} </div>

//                 </div>
//               </div>

//             }
//             <div></div>



//           <div>
//             <h2>Token C:</h2>
//             <p>{versionDetails?.tokenC?.tokenC}</p> <span>{versionDetails?.tokenC?.timestamp}</span>
//           </div>

//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default HandshakeUI;



import React, { useState } from "react";
import axios from "axios";

const HandshakeUI = () => {
  const [tokenA, setTokenA] = useState("");
  const [url_endpoint, setUrl_endpoint] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [isSender, setIsSender] = useState(null);
  const [versionDetails, setVersionDetails] = useState();
  const [dataFound, setDataFound] = useState(false);
  const [serverURL, setServerURL] = useState("");
  const [inputTokenA, setInputTokenA] = useState("");

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}.${date.getMilliseconds()}`;
  };

  const fetchTokenA = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/2.1/credentials`
      );
      console.log("TokenA", response.data.token);
      setTokenA(response.data.token);
      setUrl_endpoint(response.data.url);
    } catch (error) {
      console.error("Error fetching Token A:", error);
    }
  };

  const handleCopyClick = async () => {
    try {
      // Copy text to clipboard
      await navigator.clipboard.writeText(tokenA);
      setCopySuccess("Copied!");
    } catch (err) {
      console.log("Failed to copy", err);
      setCopySuccess("Failed to copy!");
    }
  };

  const fetchTokenB = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/2.1/credentials/generate-b`,
        { tokenA: inputTokenA, url: serverURL }
      );
      setVersionDetails(response.data);
      setDataFound(true);
    } catch (error) {
      console.error("Error fetching Token B:", error);
    }
  };

  const handleRole = (state) => {
    setIsSender(state);
  };

  return (
    <div className="p-5">
      <h1>Operator:-  &nbsp; {process.env.REACT_APP_API_URL}</h1>
      {isSender == null ? (
        <div>
          <h2>Act as a</h2>
          <button className="me-2" onClick={() => handleRole(true)}>
            sender
          </button>
          <button onClick={() => handleRole(false)}>reciever</button>
        </div>
      ) : (
        <button className="mb-4" onClick={() => handleRole(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
      )}
      {isSender == false ? (
        <div>
          <div>
            <button onClick={fetchTokenA}>Generate Token A</button>
            <h2>Token A:</h2>
            <p>{tokenA}</p>{" "}
            {tokenA && (
              <button onClick={handleCopyClick}>Copy to Clipboard</button>
            )}
            {copySuccess && <p>{copySuccess}</p>}
            <h2>URL:</h2>
            <p>{url_endpoint}</p>
            <div>Timestamp: {tokenA && formatTimestamp(tokenA)}</div>
          </div>
        </div>
      ) : null}
      {isSender == true ? (
        <div>
          <div>
            <h2>Exchange Token B</h2>
            <div style={{ width: "100%", padding: "0 20px" }}>
              <textarea
                value={inputTokenA}
                onChange={(e) => setInputTokenA(e.target.value)}
                placeholder="Enter Token A here"
                style={{
                  width: "50%",
                  padding: "10px",
                  margin: "5px 0",
                  boxSizing: "border-box",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  minHeight: "100px", // Set a minimum height for the textarea
                }}
              />
            </div>
            <div style={{ width: "100%", padding: "0 20px" }}>
              <input
                type="text"
                value={serverURL}
                onChange={(e) => setServerURL(e.target.value)}
                placeholder="Enter URL Given by "
                style={{
                  width: "50%",
                  padding: "10px",
                  margin: "5px 0",
                  boxSizing: "border-box",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ width: "100%", padding: "0 20px" }}>
              <button
                onClick={fetchTokenB}
                disabled={!serverURL && !inputTokenA}
              >
                Submit Token A
              </button>
            </div>

            {dataFound && (
              <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h2>Operator Details</h2>
                <div>
                  <strong>Operator Name:</strong>{" "}
                  {versionDetails?.operatorDetails?.operatorName}
                </div>
                {/* <div>
                  Timestamp:{" "}
                  {versionDetails?.operatorDetails?.versionListTimestamp &&
                    formatTimestamp(
                      versionDetails?.operatorDetails?.versionListTimestamp
                    )}
                </div> */}
                <div style={{ marginTop: "20px" }}>
                  <h3>Version List</h3>
                  <ul>
                    {versionDetails?.operatorDetails?.versionList?.map(
                      (version) => (
                        <li key={version?._id}>
                          <strong>Version:</strong> {version?.version} -{" "}
                          <a
                            href={version?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {version?.url}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  {console.log(versionDetails?.operatorDetails?.versionDetailsTimestamp)}
                 Timestamp:{" "}
                  {versionDetails?.operatorDetails?.versionDetailsTimestamp &&
                    formatTimestamp(
                      versionDetails?.operatorDetails?.versionDetailsTimestamp
                    )}
                </div>

                {/* Version Details */}
                <div style={{ marginTop: "20px" }}>
                  <h3>Version Details</h3>
                  {versionDetails?.operatorDetails?.versionDetails?.map(
                    (details, index) => (
                      <div key={index}>
                        {details._id?.map((versionDetail, idx) => (
                          <div key={idx}>
                            <strong>Version:</strong> {versionDetail?.version}
                            <ul>
                              {versionDetail?.endpoints?.map((endpoint) => (
                                <li key={endpoint?.url}>
                                  <strong>Identifier:</strong>{" "}
                                  {endpoint?.identifier} <br />
                                  <strong>URL:</strong>
                                  <a
                                    href={endpoint?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {endpoint?.url}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
                <div>
            
                 Timestamp:{" "}
                  {versionDetails?.operatorDetails?.versionDetailsTimestamp &&
                    formatTimestamp(
                      versionDetails?.operatorDetails?.versionDetailsTimestamp
                    )}
                </div>
              </div>
            )}
            <h2>Token B:</h2>
            <p>{versionDetails?.tokenB?.tokenB}</p>{" "}
            <span>
            Timestamp:{" "}  {versionDetails?.tokenB?.timestamp &&
                formatTimestamp(versionDetails?.tokenB?.timestamp)}
            </span>
          </div>
<hr/>
          {/* Third-party operator details */}
          {dataFound && (
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
         
              <div>
                <strong>Operator Name:</strong>{" "}
                {versionDetails?.thirdPartyOPerator?.data?.versionList?.operatorName}
              </div>
              {/* <div>
                Timestamp:{" "}
                {versionDetails?.thirdPartyOPerator?.data.versionList.versionListTimestamp &&
                  formatTimestamp(
                    versionDetails?.thirdPartyOPerator?.data.versionList.versionListTimestamp
                  )}
              </div> */}
              <div style={{ marginTop: "20px" }}>
                <h3>Version List</h3>
                <ul>
                  {versionDetails?.thirdPartyOPerator?.data?.versionList
                    ?.versionList?.map((version) => (
                      <li key={version?._id}>
                        <strong>Version:</strong> {version?.version} -{" "}
                        <a
                          href={version?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {version?.url}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                Timestamp:{" "}
                {versionDetails?.thirdPartyOPerator?.data.versionList.versionDetailsTimestamp &&
                  formatTimestamp(
                    versionDetails?.thirdPartyOPerator?.data.versionList.versionDetailsTimestamp
                  )}
              </div>

              <div style={{ marginTop: "20px" }}>
                  <h3>Version Details</h3>
                  {versionDetails?.thirdPartyOPerator?.data.versionList?.versionDetails?.map(
                    (details, index) => (
                      <div key={index}>
                        {details._id?.map((versionDetail, idx) => (
                          <div key={idx}>
                            <strong>Version:</strong> {versionDetail?.version}
                            <ul>
                              {versionDetail?.endpoints?.map((endpoint) => (
                                <li key={endpoint?.url}>
                                  <strong>Identifier:</strong>{" "}
                                  {endpoint?.identifier} <br />
                                  <strong>URL:</strong>
                                  <a
                                    href={endpoint?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {endpoint?.url}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
                <div>
            
                 Timestamp:{" "}
                  {versionDetails?.operatorDetails?.versionDetailsTimestamp &&
                    formatTimestamp(
                      versionDetails?.operatorDetails?.versionDetailsTimestamp
                    )}
                </div>
            </div>
          )}

          {/* Token C */}
          <h2>Token C:</h2>
          <p>{versionDetails?.tokenC?.tokenC}</p>{" "}
          <span>
          Timestamp:{" "}   {versionDetails?.tokenC?.timestamp &&
              formatTimestamp(versionDetails?.tokenC?.timestamp)}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default HandshakeUI;
