import React from 'react';

const TopCard = ({ title, value, date }) => {
  return (
    <div className="bg-[#C62E2E] p-4 rounded-[16px] shadow">
      <h3 className="font-bold text-white text-lg">{title}</h3>
      <p className="text-white">{value}</p>
    </div>
  );
};

export default TopCard;
