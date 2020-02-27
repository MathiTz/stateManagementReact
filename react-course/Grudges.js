import React from "react";
import Grudge from "./Grudge";

const Grudges = ({ grudges = [], onForgive }) => {
  return (
    <section>
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map(grudge => (
        <Grudge key={grudge.id} grudge={grudge} onForgive={onForgive} />
      ))}
    </section>
  );
};

export default Grudges;
