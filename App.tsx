
import React, { useState, useCallback } from 'react';
import { EQUIPMENT_LIST } from './constants';
import type { Equipment } from './types';
import { getEquipmentDescription, getEquipmentImage } from './services/geminiService';
import EquipmentList from './components/EquipmentList';
import EquipmentDetail from './components/EquipmentDetail';
import { LabIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleSelectEquipment = useCallback(async (equipment: Equipment) => {
    if (selectedEquipment?.name === equipment.name) return;

    setSelectedEquipment(equipment);
    
    // Reset states
    setIsLoading(true);
    setIsImageLoading(true);
    setError(null);
    setImageError(null);
    setDescription('');
    setImageUrl(null);
    
    try {
      // Fetch description and image concurrently
      const [descResult, imageResult] = await Promise.allSettled([
        getEquipmentDescription(equipment.name),
        getEquipmentImage(equipment.name),
      ]);

      // Handle description result
      if (descResult.status === 'fulfilled') {
        setDescription(descResult.value);
      } else {
        setError('Failed to fetch description.');
        console.error(descResult.reason);
      }

      // Handle image result
      if (imageResult.status === 'fulfilled') {
        setImageUrl(imageResult.value);
      } else {
        setImageError('Failed to find an image.');
        console.error(imageResult.reason);
      }

    } catch (err) {
      setError('An unexpected error occurred.');
      setImageError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsImageLoading(false);
    }
  }, [selectedEquipment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans">
      <header className="p-6 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <LabIcon className="w-10 h-10 text-cyan-400" />
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Interactive Lab Equipment Viewer
            </h1>
            <p className="text-slate-400">Select an item to see its details powered by Gemini</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <EquipmentList
            equipmentList={EQUIPMENT_LIST}
            selectedEquipment={selectedEquipment}
            onSelectEquipment={handleSelectEquipment}
          />
        </div>

        <div className="md:col-span-2">
          <EquipmentDetail
            equipment={selectedEquipment}
            description={description}
            isLoading={isLoading}
            error={error}
            imageUrl={imageUrl}
            isImageLoading={isImageLoading}
            imageError={imageError}
          />
        </div>
      </main>
    </div>
  );
};

export default App;