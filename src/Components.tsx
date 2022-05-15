import React from "react";

export const Section = ({ heading, text }) => (
  <div style={{ alignItems: "center" }}>
    {<h1>{heading}</h1>}
    {text !== undefined ? <div>{text}</div> : <div>Error loading data</div>}
  </div>
);

export const Image = ({ uri }) => {
  return uri?.length ? (
    <img src={uri} alt="Alternate Text" />
  ) : (
    <div>Error loading Image</div>
  );
};
