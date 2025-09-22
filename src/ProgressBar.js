import React from 'react';

const ProgressBar = ({ value = 60 }) => (
  <div className="w-full bg-gray-100 rounded-full h-3">
    <div className="bg-primary h-3 rounded-full" style={{ width: `${value}%` }} />
  </div>
);

export default ProgressBar;
