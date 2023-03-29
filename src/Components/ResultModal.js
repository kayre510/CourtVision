import React from "react";

export const ResultModal = (result) => {


  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <p className="card-text">
            {result.result}
          </p>
        </div>
      </div>
    </div>
  );
};
