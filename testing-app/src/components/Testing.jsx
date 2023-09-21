import React, { useState } from 'react';

function Testing() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleValidate = () => {
    const lines = inputValue.split('\n');
    const addressMap = new Map();

    for (const line of lines) {
      const [address, amount] = line.split(/[=,`,`,\s]/).filter(Boolean);

      if (isNaN(amount) || Number(amount) < 0) {
        setOutputValue('Invalid amount');
        return;
      }

      if (!addressMap.has(address)) {
        addressMap.set(address, Number(amount));
      } else {
        addressMap.set(address, addressMap.get(address) + Number(amount));
      }
    }

    let result = '';
    for (const [address, amount] of addressMap.entries()) {
      result += `${address}=${amount}\n`;
    }

    setOutputValue('Success:\n' + result.trim());
  };

  return (
    <>
    <div className="p-4 space-y-4 w-1/3 mt-16 flex items-center justify-center flex-col">
     <h1 className='font-extrabold text-3xl font'>Testing App</h1>
      <textarea
        className="w-full h-40 border border-gray-300 rounded-lg p-2"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter addresses and amounts here..."
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleValidate}
      >
        Validate
      </button>
      <div>
        <h3 className="text-xl font-bold">Output:</h3>
        <pre className="whitespace-pre-wrap">{outputValue}</pre>
      </div>
    </div>
    </>
  );
}

export default Testing;
