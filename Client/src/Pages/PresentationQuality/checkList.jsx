import React, { useState } from 'react';
import Picture from './Picture';
function Checklist() {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((i) => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  return (
    <div>
      <h1>Checklist</h1>
      <div>
        <input
          type="checkbox"
          id="item1"
          checked={checkedItems.includes('item1')}
          onChange={() => handleCheck('item1')}
        />
        <label htmlFor="item1">Item 1</label>
        
      </div>
      <div>
        <input
          type="checkbox"
          id="item2"
          checked={checkedItems.includes('item2')}
          onChange={() => handleCheck('item2')}
        />
        <label htmlFor="item2">Item 2</label>
       
      </div>
      <div>
        <input
          type="checkbox"
          id="item3"
          checked={checkedItems.includes('item3')}
          onChange={() => handleCheck('item3')}
        />
        <label htmlFor="item3">Item 3</label>
        
      </div>
      {checkedItems.includes('item1') && <Picture/>}
      {checkedItems.includes('item2') && <div>Item 2 appears on screen</div>}
      {checkedItems.includes('item3') && <div>Item 3 appears on screen</div>}
    </div>
  );
}

export default Checklist;