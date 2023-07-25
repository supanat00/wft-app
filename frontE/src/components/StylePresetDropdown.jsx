import React from 'react';

const StylePresetDropdown = ({ value, onChange }) => {
  const stylePresets = [    
    'analog-film',
    'anime',
    'cinematic',
    'comic-book',
    'digital-art',
    'enhance',
    'fantasy-art',
    'isometric',
    'line-art',
    'low-poly',
    'modeling-compound',
    'neon-punk',
    'origami',
    'photographic',
    'pixel-art',
    '3d-model',
    'tile-texture',
  ];

  return (
    <div>
      <label htmlFor="style_preset" className="block text-sm font-medium text-gray-700">
        Style Preset
      </label>
      <select
        id="style_preset"
        name="style_preset"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={value}
        onChange={onChange}
      >
        <option value="">None</option>
        {stylePresets.map((preset) => (
          <option key={preset} value={preset}>
            {preset}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StylePresetDropdown;
