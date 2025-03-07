import React, { useState } from 'react';
import { Select } from 'antd';
import city from '../data/tinh_tp';
import ward from '../data/phuong_xa';
import district from '../data/quan_huyen';
const { Option } = Select;
// Mock data for cities, districts, and wards
const cities = Object.values(city).map(cityData => ({
  name: cityData.name_with_type,
  value: cityData.code
}));
cities.push("Chọn")
const districts = Object.values(district).map(districtData => ({
  name: districtData.name_with_type,
  value: districtData.code,
  parent_code: districtData.parent_code
}));
const wards = Object.values(ward).map(wardData => ({
  name: wardData.name_with_type,
  value: wardData.code,
  parent_code: wardData.parent_code
}));

const LocationSelector = ({ setLocationReq, locationReq }) => {
  // State to manage selected values and options
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null); // New state for ward

  // Handlers to update options based on selection
  const handleCityChange = (value) => {
    const selectedCity = cities.find(city => city.value === value);
    setSelectedCity(value);
    setSelectedDistrict(null); // Reset district when city changes
    setSelectedWard(null); // Reset ward when city changes
    setLocationReq({
      ...locationReq,
      cityName: selectedCity ? selectedCity.name : '', // Update city name
      district: '',    // Reset district when city changes
      ward: ''         // Reset ward when city changes
    });
  };

  const handleDistrictChange = (value) => {
    const selectedDistrict = districts.find(district => district.value === value);
    setSelectedDistrict(value);
    setSelectedWard(null); // Reset ward when district changes
    setLocationReq({
      ...locationReq,
      district: selectedDistrict ? selectedDistrict.name : '', // Update district name
      ward: ''         // Reset ward when district changes
    });
  };

  const handleWardChange = (value) => {
    const selectedWard = wards.find(ward => ward.value === value);
    setSelectedWard(value);
    setLocationReq({
      ...locationReq,
      ward: selectedWard ? selectedWard.name : '' // Update ward name
    });
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* City ComboBox */}
      <Select
        placeholder="Chọn Thành phố/Tỉnh"
        style={{ width: 200 }}
        value={selectedCity}
        onChange={handleCityChange}
        allowClear
      >
        <Option key={""} value={""}>
          Bỏ chọn
        </Option>
        {cities.map(city => (
          <Option key={city.value} value={city.value}>
            {city.name}
          </Option>
        ))}
      </Select>

      {/* District ComboBox, dependent on selected City */}
      <Select
        placeholder="Chọn Quận/Huyện"
        style={{ width: 200 }}
        value={selectedDistrict}
        onChange={handleDistrictChange}
        allowClear
        disabled={!selectedCity} // Disable if no city selected
      >

        {districts
          .filter(district => district.parent_code === selectedCity)
          .map(district => (
            <Option key={district.value} value={district.value}>
              {district.name}
            </Option>
          ))}
      </Select>

      <Select
        placeholder="Chọn Phường/Xã"
        style={{ width: 200 }}
        value={selectedWard} // Set to selectedWard state
        onChange={handleWardChange} // Update selectedWard when changed
        allowClear
        disabled={!selectedDistrict} // Disable if no district selected
      >
        {wards
          .filter(ward => ward.parent_code === selectedDistrict)
          .map(ward => (
            <Option key={ward.value} value={ward.value}>
              {ward.name}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default LocationSelector;
