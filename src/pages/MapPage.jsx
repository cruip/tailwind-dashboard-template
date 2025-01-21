import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../partials/Sidebar'; // Assuming Sidebar is a separate component

function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const [activePopup, setActivePopup] = useState(null); // Track which marker's popup is active

  const position = [-22.2449, 119.5986]; // Gudai-Darri Mine coordinates

  // Belt metadata
  const beltMetadata = {
    'Ironflow 01': {
      status: 'Active',
      flowRate: '500 kg/s',
      loadCapacity: '2000 kg',
      efficiency: '93%',
      location: 'Pilbara Region, WA',
    },
    'RedEarth Conveyor': {
      status: 'Idle',
      flowRate: '300 kg/s',
      loadCapacity: '1800 kg',
      efficiency: '85%',
      location: 'Red Earth Valley, WA',
    },
    'Pilbara Express': {
      status: 'Maintenance',
      flowRate: '250 kg/s',
      loadCapacity: '1500 kg',
      efficiency: '78%',
      location: 'Pilbara South, WA',
    },
    'OreLink 4000': {
      status: 'Active',
      flowRate: '600 kg/s',
      loadCapacity: '2500 kg',
      efficiency: '97%',
      location: 'OreLink Facility, WA',
    },
    'DustTrail Belt': {
      status: 'Inactive',
      flowRate: '0 kg/s',
      loadCapacity: '1000 kg',
      efficiency: 'N/A',
      location: 'DustTrail Facility, WA',
    },
  };

  // Belt marker data with coordinates
  const belts = [
    {
      id: 1,
      name: 'Ironflow 01',
      position: [-22.2500, 119.6000],
    },
    {
      id: 2,
      name: 'RedEarth Conveyor',
      position: [-22.2450, 119.5950],
    },
    {
      id: 3,
      name: 'Pilbara Express',
      position: [-22.2400, 119.6050],
    },
    {
      id: 4,
      name: 'OreLink 4000',
      position: [-22.2480, 119.5900],
    },
    {
      id: 5,
      name: 'DustTrail Belt',
      position: [-22.2430, 119.6030],
    },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Map Section */}
      <div style={{ flex: 1 }}>
        <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {belts.map((belt) => {
            const metadata = beltMetadata[belt.name];
            return (
              <Marker
                key={belt.id}
                position={belt.position}
                eventHandlers={{
                  mouseover: (e) => {
                    setActivePopup(belt.id);
                    e.target.openPopup();
                  },
                  mouseout: (e) => {
                    setActivePopup(null);
                    e.target.closePopup();
                  },
                }}
              >
                <Popup>
                  <strong>{belt.name}</strong>
                  <br />
                  <strong>Status:</strong> {metadata.status}
                  <br />
                  <strong>Flow Rate:</strong> {metadata.flowRate}
                  <br />
                  <strong>Load Capacity:</strong> {metadata.loadCapacity}
                  <br />
                  <strong>Efficiency:</strong> {metadata.efficiency}
                  <br />
                  <strong>Location:</strong> {metadata.location}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
