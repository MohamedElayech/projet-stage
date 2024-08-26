import React, { useState } from 'react';
import InputPoids from './InputPoids';

export default function Add() {
  const [inputFields, setInputFields] = useState([
    { id: 1, label: 'New Criterea 1', value: '', intensity: '' },
  ]);

  const handleAddInputField = (event) => {
    event.preventDefault();
    const newInputField = {
      id: inputFields.length + 1,
      label: `New Criterea ${inputFields.length + 1}`,
      value: '',
      intensity: '',
    };
    setInputFields([...inputFields, newInputField]);
  };

  const handleInputChange = (id, value, label, intensity) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value, label, intensity } : field
      )
    );
  };

  return (
    <div>
      {inputFields.map((inputField, index) => (
        <div key={inputField.id}>
          <input
            type="text"
            value={inputField.label}
            onChange={(e) =>
              handleInputChange(inputField.id, inputField.value, e.target.value, inputField.intensity)
            }
          />
          <select
            value={inputField.intensity}
            onChange={(e) =>
              handleInputChange(inputField.id, inputField.value, inputField.label, e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="faible">Faible</option>
            <option value="moyen">Moyen</option>
            <option value="fort">Fort</option>
          </select>
          <InputPoids />
        </div>
      ))}
      <button onClick={handleAddInputField}>Add Input Field</button>
    </div>
  );
}