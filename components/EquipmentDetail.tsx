
import React from 'react';
import type { Equipment } from '../types';
import { LoadingSpinner, InfoIcon, ErrorIcon, ImageIcon } from './icons';

interface EquipmentDetailProps {
  equipment: Equipment | null;
  description: string;
  isLoading: boolean;
  error: string | null;
  imageUrl: string | null;
  isImageLoading: boolean;
  imageError: string | null;
}

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
        <InfoIcon className="w-16 h-16 text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-slate-300">Select Equipment</h3>
        <p className="text-slate-400 mt-2">Choose an item from the list to view its details and a generated image.</p>
    </div>
);

const EquipmentDetail: React.FC<EquipmentDetailProps> = ({ equipment, description, isLoading, error, imageUrl, isImageLoading, imageError }) => {
  if (!equipment) {
    return <Placeholder />;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700/50 min-h-[500px] flex flex-col">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4 pb-4 border-b border-slate-700">{equipment.name}</h2>
      
      <div className="aspect-w-4 aspect-h-3 w-full bg-slate-700 rounded-md overflow-hidden mb-6 shadow-inner flex items-center justify-center">
        {(() => {
          if (isImageLoading) {
            return <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
                <LoadingSpinner className="w-12 h-12 text-cyan-400" />
                <p>Generating 3D model...</p>
            </div>;
          }
          if (imageError) {
            return (
              <div className="text-center text-red-400 p-4">
                <ErrorIcon className="w-12 h-12 mx-auto mb-2" />
                <p>{imageError}</p>
              </div>
            );
          }
          if (imageUrl) {
            return (
              <img
                src={imageUrl}
                alt={equipment.name}
                className="object-cover w-full h-full"
              />
            );
          }
          return (
            <div className="text-center text-slate-500">
              <ImageIcon className="w-16 h-16 mx-auto mb-4" />
            </div>
          );
        })()}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center">
            <InfoIcon className="w-5 h-5 mr-2 text-cyan-400"/>
            Description
        </h3>
        <div className="bg-slate-900/70 p-4 rounded-md min-h-[80px] flex items-center justify-center">
            {isLoading && <LoadingSpinner className="w-8 h-8 text-cyan-400" />}
            {error && <p className="text-red-400 text-center flex items-center"><ErrorIcon className="w-5 h-5 mr-2" />{error}</p>}
            {!isLoading && !error && <p className="text-slate-300 leading-relaxed">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
