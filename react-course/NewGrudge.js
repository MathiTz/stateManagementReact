import React, { useState } from "react";

const NewGrudge = React.memo(({ onSubmit }) => {
  const [person, setPerson] = useState("");
  const [reason, setReason] = useState("");

  const handleChange = event => {
    event.preventDefault();
    onSubmit({ person, reason });
  };

  return (
    <form onSubmit={handleChange}>
      <input
        type="text"
        placeholder="Person"
        value={person}
        onChange={event => setPerson(event.target.value)}
      />
      <input
        placeholder="Reason"
        type="text"
        value={reason}
        onChange={event => setReason(event.target.value)}
      />
      <input type="submit" />
    </form>
  );
});

export default NewGrudge;
