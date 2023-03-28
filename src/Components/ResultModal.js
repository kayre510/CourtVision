import React, { useState, useEffect } from "react";

export const ResultModal = (playerResult) => {
  const [result, setResult] = useState("");
  console.log(playerResult.result)


  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <p className="card-text">
            {playerResult.result}
          </p>
        </div>
      </div>
    </div>
  );
};
