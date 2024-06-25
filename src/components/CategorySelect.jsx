// src/components/CategorySelect.jsx
import React from 'react';

const CategorySelect = ({ label, id, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option  key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
