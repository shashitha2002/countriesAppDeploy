import React from "react";

const TranslationsNMisc = (props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
  <div className="p-6 max-w-md w-full">
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">🌍 Translations</h2>
    {props.country.translations ? (
      <ul className="space-y-2">
        {Object.entries(props.country.translations).map(([key, value]) => (
          <li key={key} className="flex justify-between items-center border-b pb-1">
            <span className="text-sm font-medium text-gray-600 uppercase">{key}</span>
            <span className="text-sm text-gray-800">{value.common}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">No translations available.</p>
    )}
  </div>
</div>


  );
};

export default TranslationsNMisc;
