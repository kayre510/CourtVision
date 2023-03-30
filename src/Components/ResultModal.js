import React from "react";
import "./ResultModal.css"

export const ResultModal = (result) => {

  const handleCompare = () => {
    window.location.reload()
  }



  return (
    <div className="modalBackground">
    <div className="modalContainer" animation="fadeInAnimation ease 1s">
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <p className="card-text">
            {result.result}
          </p>
        </div>
        <button onClick={handleCompare}>Compare stats again</button>
      </div>
    </div>
    </div>
  );
};
