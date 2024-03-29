
// import React, { useRef, useState } from 'react';
// import './Form.css';

// const Form = () => {
//   const zoneRef = useRef(null);
//   const organizationIdRef = useRef(null);
//   const totalDistanceRef = useRef(null);
//   const itemTypeRef = useRef(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [serverResponse, setServerResponse] = useState(null);
//   const [suggestions, setSuggestions] = useState(['perishable', 'non-perishable']);

//   const handleFocusItemType = () => {
//     // Set suggestions when focusing on Item Type input
//     setSuggestions(['perishable', 'non-perishable']);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrorMessage('');
//     setServerResponse(null);
//     const formData = {
//       zone: zoneRef.current.value,
//       organization_id: organizationIdRef.current.value,
//       total_distance: Number(totalDistanceRef.current.value),
//       item_type: itemTypeRef.current.value,
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/price', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (data.error) {
//         setErrorMessage(data.error);
//       } else {
//         setServerResponse(data); // Set the server response data here
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-container">
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       {serverResponse && (
//         <div className="server-response">
//           <pre>Total Price: {serverResponse.total_price} Euros.</pre>
//         </div>
//       )}
//       <label>
//         Zone:
//         <input type="text" name="zone" ref={zoneRef} />
//       </label>
//       <label>
//         Organization ID:
//         <input type="text" name="organization_id" ref={organizationIdRef} />
//       </label>
//       <label>
//         Total Distance:
//         <input type='number' name="total_distance" ref={totalDistanceRef} />
//       </label>
//       <label>
//         Item Type:
//         <input
//           type="text"
//           name="item_type"
//           ref={itemTypeRef}
//           onFocus={handleFocusItemType}
//           list="itemTypes"
//         />
//         <datalist id="itemTypes">
//           {suggestions.map((item, index) => (
//             <option key={index} value={item} />
//           ))}
//         </datalist>
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
// export default Form;
import React, { useRef, useState } from 'react';
import './Form.css';

const Form = () => {
  const zoneRef = useRef(null);
  const organizationIdRef = useRef(null);
  const totalDistanceRef = useRef(null);
  const itemTypeRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [serverResponse, setServerResponse] = useState(null);
  const [suggestions, setSuggestions] = useState({
    zones: ['central', 'suburban', 'rural'],
    organizationIds: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'],
  });

  const handleFocusItemType = () => {
    // Set suggestions for Item Type input
    setSuggestions({ ...suggestions, itemTypes: ['perishable', 'non-perishable'] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setServerResponse(null);
    const formData = {
      zone: zoneRef.current.value,
      organization_id: organizationIdRef.current.value,
      total_distance: Number(totalDistanceRef.current.value),
      item_type: itemTypeRef.current.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setServerResponse(data); // Set the server response data here
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {serverResponse && (
        <div className="server-response">
          <pre>Total Price: {serverResponse.total_price} Euros.</pre>
        </div>
      )}
      <label>
        Zone:
        <input type="text" name="zone" ref={zoneRef} list="zones" />
        <datalist id="zones">
          {suggestions.zones.map((zone, index) => (
            <option key={index} value={zone} />
          ))}
        </datalist>
      </label>
      <label>
        Organization ID:
        <input type="text" name="organization_id" ref={organizationIdRef} list="organizationIds" />
        <datalist id="organizationIds">
          {suggestions.organizationIds.map((orgId, index) => (
            <option key={index} value={orgId} />
          ))}
        </datalist>
      </label>
      <label>
        Total Distance:
        <input type='number' name="total_distance" ref={totalDistanceRef} />
      </label>
      <label>
        Item Type:
        <input
          type="text"
          name="item_type"
          ref={itemTypeRef}
          onFocus={handleFocusItemType}
          list="itemTypes"
        />
        <datalist id="itemTypes">
          {suggestions.itemTypes && suggestions.itemTypes.map((itemType, index) => (
            <option key={index} value={itemType} />
          ))}
        </datalist>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

