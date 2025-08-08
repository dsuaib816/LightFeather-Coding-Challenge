// components/SupervisorSelect.tsx
import React from 'react';

// Props interface for SupervisorSelect component
interface SupervisorSelectProps {
  supervisors: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export const SupervisorSelect: React.FC<SupervisorSelectProps> = ({
  supervisors,
  value,
  onChange,
  error
}) => {
  return (
    <div className="flex flex-col">
      <select
        className="text-gray-400 bg-gray-700 border-0 rounded-md p-2 mx-auto w-fit"
        name="supervisor"
        value={value}
        onChange={onChange}
      >
        <option value="">-- Select a Supervisor --</option>
        {supervisors.map((sup, index) => (
          <option key={index} value={sup}>{sup}</option>
        ))}
      </select>
      {error && <p className="mx-auto text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};