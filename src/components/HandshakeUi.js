import React, { useState } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";

const HandshakeUI = () => {
  const [tokenA, setTokenA] = useState("");
  const [tokenATime, setTokenATime] = useState("");
  const [urlEndpoint, setUrlEndpoint] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [isSender, setIsSender] = useState(null);
  const [versionDetails, setVersionDetails] = useState();
  const [dataFound, setDataFound] = useState(false);
  const [serverURL, setServerURL] = useState("");
  const [inputTokenA, setInputTokenA] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}.${date.getMilliseconds()}`;
  };

  const fetchTokenA = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/2.1/credentials`
      );
      setTokenA(response.data.token);
      setUrlEndpoint(response.data.url);
      setTokenATime(new Date());
    } catch (error) {
      setError("Failed to fetch Token A. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
      setCopySuccess("Failed to copy!");
    }
    document.body.removeChild(textArea);
  };

  const handleCopyClick = async (text) => {
    console.log("text to copy", text);

    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
    } catch (err) {
      console.log("handleCopyClick err", err);
      unsecuredCopyToClipboard(text);
      // setCopySuccess("Failed to copy!");
    }
  };

  const fetchTokenB = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/2.1/credentials/generate-b`,
        { tokenA: inputTokenA, url: serverURL }
      );
      setVersionDetails(response.data);
      setDataFound(true);
    } catch (error) {
      setError(
        "Failed to submit Token A. Please check the inputs and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRole = (state) => {
    setIsSender(state);
    setTokenA("");
    setCopySuccess("");
    setUrlEndpoint("");
    setVersionDetails(null);
    setDataFound(false);
    setError("");
  };

  const Loader = () => (
    <div className="mx-5 my-3">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <div className="container mt-5">
      {/* Operator Information */}
      <div className="mb-4">
        <h1 className="display-6">
          <span className="fw-bold">Operator:</span>{" "}
          {process.env.REACT_APP_OPERATOR}{" "}
        </h1>
        <div>
          <span className="text-muted">API URL:</span>{" "}
          <a
            href={process.env.REACT_APP_API_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="badge bg-info">
              {process.env.REACT_APP_API_URL}
            </span>
          </a>
        </div>
      </div>

      {/* Error Handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {isSender == null ? (
        <div className="text-center">
          <h2 className="mb-4">Act as a</h2>
          <div>
            <button
              className="btn btn-primary me-3"
              onClick={() => handleRole(true)}
            >
              Sender
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleRole(false)}
            >
              Receiver
            </button>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-outline-primary mb-4"
          onClick={() => handleRole(null)}
        >
          <i className="bi bi-arrow-left"></i> Go Back
        </button>
      )}

      {isSender === false && (
        <div>
          <h3>Generate Token A</h3>
          {loading ? (
            <Loader />
          ) : (
            <button className="btn btn-success my-2" onClick={fetchTokenA}>
              Generate Token A
            </button>
          )}
          {tokenA && (
            <div className="mt-3">
              <div className="input-group mb-2">
                <span className="input-group-text">Token A</span>
                <input
                  type="text"
                  className="form-control"
                  value={tokenA}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleCopyClick(tokenA)}
                >
                  Copy
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">URL:</span>
                <input
                  type="text"
                  className="form-control"
                  value={urlEndpoint}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleCopyClick(urlEndpoint)}
                >
                  Copy
                </button>
              </div>

              {copySuccess && <p className="text-success">{copySuccess}</p>}

              <div className="mt-3">
                <strong>Timestamp:</strong>{" "}
                {tokenATime && formatTimestamp(tokenATime)}
              </div>
            </div>
          )}
        </div>
      )}

      {isSender === true && (
        <div>
          <h3>Exchange Token A</h3>
          <div className="mb-3">
            <label htmlFor="inputTokenA" className="form-label">
              Enter Token A
            </label>
            <input
              type="text"
              className="form-control"
              id="inputTokenA"
              value={inputTokenA}
              onChange={(e) => setInputTokenA(e.target.value)}
              placeholder="Enter Token A here"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serverURL" className="form-label">
              Server URL
            </label>
            <input
              type="text"
              className="form-control"
              id="serverURL"
              value={serverURL}
              onChange={(e) => setServerURL(e.target.value)}
              placeholder="Enter URL given by the receiver"
            />
          </div>

          {!loading ? (
            <button
              className="btn btn-primary"
              onClick={fetchTokenB}
              disabled={!serverURL || !inputTokenA}
            >
              Submit Token A
            </button>
          ) : (
            <Loader />
          )}

          {dataFound && versionDetails && (
            <div className="mt-5">
              <h3>Other party Operator Details</h3>
              <p>
                <strong>Operator Name:</strong>{" "}
                {versionDetails?.operatorDetails?.operatorName}
              </p>

              <h4>Version List</h4>
              <ul className="list-group">
                {versionDetails?.operatorDetails?.versionList?.map(
                  (version) => (
                    <li key={version?._id} className="list-group-item">
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

              <div className="mt-3">
                <strong>Timestamp:</strong>{" "}
                {versionDetails?.operatorDetails?.versionDetailsTimestamp &&
                  formatTimestamp(
                    versionDetails?.operatorDetails?.versionDetailsTimestamp
                  )}
              </div>

              <h4 className="mt-4">Version Details</h4>
              {versionDetails?.operatorDetails?.versionDetails?.map(
                (details, index) => (
                  <div key={index}>
                    {details._id?.map((versionDetail, idx) => (
                      <div key={idx}>
                        <strong>Version:</strong> {versionDetail?.version}
                        <ul className="list-group mt-2">
                          {versionDetail?.endpoints?.map((endpoint) => (
                            <li key={endpoint?.url} className="list-group-item">
                              <strong>Identifier:</strong>{" "}
                              {endpoint?.identifier} <br />
                              <strong>URL:</strong>{" "}
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

              <div className="mt-3">
                <strong>Timestamp:</strong>{" "}
                {versionDetails?.operatorDetails?.versionDetailsTimestamp &&
                  formatTimestamp(
                    versionDetails?.operatorDetails?.versionDetailsTimestamp
                  )}
              </div>

              <h4 className="mt-4">Token B</h4>
              <p>{versionDetails?.tokenB?.tokenB}</p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {versionDetails?.tokenB?.timestamp &&
                  formatTimestamp(versionDetails?.tokenB?.timestamp)}
              </p>

              <hr />

              <h3>Own Operator Details</h3>
              <p>
                <strong>Operator Name:</strong>{" "}
                {
                  versionDetails?.thirdPartyOPerator?.data?.versionList
                    ?.operatorName
                }
              </p>

              <h4>Version List</h4>
              <ul className="list-group">
                {versionDetails?.thirdPartyOPerator?.data?.versionList?.versionList?.map(
                  (version) => (
                    <li key={version?._id} className="list-group-item">
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

              <div className="mt-3">
                <strong>Timestamp:</strong>{" "}
                {versionDetails?.thirdPartyOPerator?.data?.versionList
                  ?.versionDetailsTimestamp &&
                  formatTimestamp(
                    versionDetails?.thirdPartyOPerator?.data?.versionList
                      ?.versionDetailsTimestamp
                  )}
              </div>

              <h4 className="mt-4">Version Details</h4>
              {versionDetails?.thirdPartyOPerator?.data?.versionList?.versionDetails?.map(
                (details, index) => (
                  <div key={index}>
                    {details._id?.map((versionDetail, idx) => (
                      <div key={idx}>
                        <strong>Version:</strong> {versionDetail?.version}
                        <ul className="list-group mt-2">
                          {versionDetail?.endpoints?.map((endpoint) => (
                            <li key={endpoint?.url} className="list-group-item">
                              <strong>Identifier:</strong>{" "}
                              {endpoint?.identifier} <br />
                              <strong>URL:</strong>{" "}
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

              <div className="mt-3">
                <strong>Timestamp:</strong>{" "}
                {versionDetails?.thirdPartyOPerator?.data?.versionList
                  ?.versionDetailsTimestamp &&
                  formatTimestamp(
                    versionDetails?.thirdPartyOPerator?.data?.versionList
                      ?.versionDetailsTimestamp
                  )}
              </div>

              <h4 className="mt-4">Token C</h4>
              <p>{versionDetails?.tokenC?.tokenC}</p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {versionDetails?.tokenC?.timestamp &&
                  formatTimestamp(versionDetails?.tokenC?.timestamp)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HandshakeUI;
