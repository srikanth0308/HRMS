import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} p-3 rounded-lg`}>
      <p className="text-xs text-gray-600">{label}</p>
      <p className={`text-xl font-semibold ${textColor}`}>{value}</p>
    </div>
  );
};

export default StatCard;