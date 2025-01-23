import React, { useContext } from 'react';
import { useCustomContext, Context } from '../context.jsx';

function BeltMetadataSection() {
  const { getters } = useCustomContext(Context);

  // Metadata for belts
  const beltMetadata = {
    'Ironflow 01': {
      status: 'Active',
      flowRate: '500 kg/s',
      lastMaintenance: '12 Jan 2023',
      scheduledMaintenance: '15 Mar 2024',
      loadCapacity: '2000 kg',
      operatingHours: '5,000 hours',
      temperature: '45°C',
      faultHistory: '3 faults in the past year',
      energyConsumption: '150 kWh',
      speed: '2.5 m/s',
      material: 'Iron Ore',
      inspectionDue: '01 Apr 2024',
      currentLoad: '1,200 kg',
      beltType: 'Steel Cord',
      installationDate: '01 Jan 2020',
      expectedLifespan: '10 years',
      efficiency: '93%',
      maintenanceFrequency: 'Every 6 months',
      transportedMaterials: ['Iron Ore', 'Coal'],
      safetyRating: 'A',
      location: 'Pilbara Region, WA',
    },
    'RedEarth Conveyor': {
      status: 'Idle',
      flowRate: '300 kg/s',
      lastMaintenance: '10 Feb 2023',
      scheduledMaintenance: '20 Mar 2024',
      loadCapacity: '1800 kg',
      operatingHours: '4,200 hours',
      temperature: '40°C',
      faultHistory: '5 faults in the past year',
      energyConsumption: '120 kWh',
      speed: '2.0 m/s',
      material: 'Coal',
      inspectionDue: '05 Apr 2024',
      currentLoad: '900 kg',
      beltType: 'Fabric',
      installationDate: '15 Mar 2019',
      expectedLifespan: '8 years',
      efficiency: '85%',
      maintenanceFrequency: 'Every 4 months',
      transportedMaterials: ['Coal'],
      safetyRating: 'B',
      location: 'Red Earth Valley, WA',
    },
    'Pilbara Express': {
      status: 'Maintenance',
      flowRate: '250 kg/s',
      lastMaintenance: '22 Jan 2023',
      scheduledMaintenance: '28 Feb 2024',
      loadCapacity: '1500 kg',
      operatingHours: '3,600 hours',
      temperature: '38°C',
      faultHistory: '8 faults in the past year',
      energyConsumption: '110 kWh',
      speed: '1.8 m/s',
      material: 'Copper Ore',
      inspectionDue: '15 Mar 2024',
      currentLoad: '800 kg',
      beltType: 'Chevron',
      installationDate: '20 Dec 2018',
      expectedLifespan: '7 years',
      efficiency: '78%',
      maintenanceFrequency: 'Every 3 months',
      transportedMaterials: ['Copper Ore', 'Limestone'],
      safetyRating: 'C',
      location: 'Pilbara South, WA',
    },
    'OreLink 4000': {
      status: 'Active',
      flowRate: '600 kg/s',
      lastMaintenance: '05 Jan 2023',
      scheduledMaintenance: '01 May 2024',
      loadCapacity: '2500 kg',
      operatingHours: '6,800 hours',
      temperature: '48°C',
      faultHistory: '2 faults in the past year',
      energyConsumption: '180 kWh',
      speed: '3.0 m/s',
      material: 'Nickel Ore',
      inspectionDue: '10 Apr 2024',
      currentLoad: '2,000 kg',
      beltType: 'Steel Cord',
      installationDate: '15 Jul 2021',
      expectedLifespan: '15 years',
      efficiency: '97%',
      maintenanceFrequency: 'Every 9 months',
      transportedMaterials: ['Nickel Ore', 'Cobalt'],
      safetyRating: 'A+',
      location: 'OreLink Facility, WA',
    },
    'DustTrail Belt': {
      status: 'Inactive',
      flowRate: '0 kg/s',
      lastMaintenance: '01 Dec 2022',
      scheduledMaintenance: '15 Jan 2024',
      loadCapacity: '1000 kg',
      operatingHours: '1,200 hours',
      temperature: 'N/A',
      faultHistory: '12 faults in the past year',
      energyConsumption: 'N/A',
      speed: 'N/A',
      material: 'Silica Sand',
      inspectionDue: '20 Feb 2024',
      currentLoad: '0 kg',
      beltType: 'Flat',
      installationDate: '10 Nov 2015',
      expectedLifespan: '5 years',
      efficiency: 'N/A',
      maintenanceFrequency: 'Every 2 months',
      transportedMaterials: ['Silica Sand', 'Quartz'],
      safetyRating: 'D',
      location: 'DustTrail Facility, WA',
    },
  };

  // Get the metadata for the selected belt
  const selectedBelt = getters.belt;
  const metadata = beltMetadata[selectedBelt];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{getters.belt} Metadata</h3>

      {metadata ? (
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {Object.entries(metadata).map(([key, value]) => (
            <div className="grid grid-cols-2 py-1" key={key}>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <span className="text-sm font-medium text-right text-gray-800 dark:text-gray-100">
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No metadata available for the selected belt.</p>
      )}
    </div>
  );
}

export default BeltMetadataSection;
