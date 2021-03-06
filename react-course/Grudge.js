import React from "react";

const Grudge = React.memo(({ grudge, onForgive }) => {
  const forgive = () => onForgive(grudge.id);

  return (
    <article>
      <h3>{grudge.person}</h3>
      <p>{grudge.reason}</p>
      <div>
        <label>
          <input type="checkbox" checked={grudge.forgiven} onChange={forgive} />{" "}
          Forgiven
        </label>
      </div>
    </article>
  );
});

export default Grudge;
