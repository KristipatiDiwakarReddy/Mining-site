import React, { useState } from "react";

const EditableText = ({ label, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  return (
    <div>
      <strong>{label}: </strong>
      {editing ? (
        <>
          <textarea value={temp} onChange={e => setTemp(e.target.value)} />
          <button onClick={() => { onChange(temp); setEditing(false); }}>Save</button>
        </>
      ) : (
        <>
          <span>{value}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EditableText;
