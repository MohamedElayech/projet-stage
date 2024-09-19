import React, { useState } from 'react';
import './pic.css';
export default function Add() {
  const [inputFields, setInputFields] = useState([
    { id: 1, label: 'New Criterea 1', value: '', intensity: '',weight:'' },
  ]);

  const handleAddInputField = (event) => {
    event.preventDefault();
    const newInputField = {
      id: inputFields.length + 1,
      label: `New Criterea ${inputFields.length + 1}`,
      value: '',
      intensity: '',
      weight:''
    };
    setInputFields([...inputFields, newInputField]);
  };

  const handleInputChange = (id, value, label, intensity, weight) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value, label, intensity, weight } : field
      )
    );
  };
  const handleWeightChange = (id, value, label, intensity, weight) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value, label, intensity, weight } : field
      )
    );}
  return (
    < >
      {inputFields.map((inputField, index) => (
        <div key={inputField.id} className="Star" >
          <input type="checkbox"></input>
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
          <label className="label">Poids:</label>
          <input
            className="weight"
            type="number"
            value={inputField.weight}
            onChange={(e) =>
              handleWeightChange(inputField.id, inputField.value, inputField.label, inputField.intensity, e.target.value)
            }/>
        </div>
      ))}
      <button onClick={handleAddInputField} className="submit">Add Input Field</button>
    </>
  );
}