
import React from 'react';
import type { Equipment } from '../types';

interface EquipmentListProps {
  equipmentList: Equipment[];
  selectedEquipment: Equipment | null;
  onSelectEquipment: (equipment: Equipment) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipmentList, selectedEquipment, onSelectEquipment }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700/50">
      <h2 className="text-xl font-semibold p-4 border-b border-slate-700/50 text-cyan-300">
        Equipment Index
      </h2>
      <div className="max-h-[65vh] overflow-y-auto">
        <ul className="divide-y divide-slate-700/50">
          {equipmentList.map((equipment) => {
            const isSelected = selectedEquipment?.name === equipment.name;
            return (
              <li key={equipment.name}>
                <button
                  onClick={() => onSelectEquipment(equipment)}
                  className={`w-full text-left p-4 text-sm transition-colors duration-200 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-cyan-300'
                  }`}
                >
                  {equipment.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EquipmentList;
