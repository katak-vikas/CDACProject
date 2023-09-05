import React, { useState } from "react";

const countries = [
  {
    name: "United States",
    states: [
      {
        name: "New York",
        cities: ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany"],
      },
      {
        name: "California",
        cities: [
          "Los Angeles",
          "San Francisco",
          "San Diego",
          "Sacramento",
          "Fresno",
        ],
      },
      {
        name: "Texas",
        cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
      },
      {
        name: "Florida",
        cities: [
          "Miami",
          "Orlando",
          "Tampa",
          "Jacksonville",
          "Fort Lauderdale",
        ],
      },
      {
        name: "Illinois",
        cities: ["Chicago", "Springfield", "Peoria", "Rockford", "Naperville"],
      },
    ],
  },
  {
    name: "United Kingdom",
    states: [
      {
        name: "England",
        cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"],
      },
      {
        name: "Scotland",
        cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"],
      },
      {
        name: "Wales",
        cities: ["Cardiff", "Swansea", "Newport", "Bangor", "Wrexham"],
      },
      {
        name: "Northern Ireland",
        cities: ["Belfast", "Londonderry", "Newry", "Armagh", "Lisburn"],
      },
      {
        name: "Isle of Man",
        cities: ["Douglas", "Peel", "Ramsey", "Castletown", "Port Erin"],
      },
    ],
  },
  {
    name: "Canada",
    states: [
      {
        name: "Ontario",
        cities: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
      },
      {
        name: "Quebec",
        cities: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
      },
      {
        name: "Alberta",
        cities: [
          "Calgary",
          "Edmonton",
          "Red Deer",
          "Lethbridge",
          "Medicine Hat",
        ],
      },
      {
        name: "British Columbia",
        cities: ["Vancouver", "Victoria", "Burnaby", "Surrey", "Richmond"],
      },
      {
        name: "Manitoba",
        cities: [
          "Winnipeg",
          "Brandon",
          "Steinbach",
          "Thompson",
          "Portage la Prairie",
        ],
      },
    ],
  },
  {
    name: "Australia",
    states: [
      {
        name: "New South Wales",
        cities: [
          "Sydney",
          "Newcastle",
          "Central Coast",
          "Wollongong",
          "Maitland",
        ],
      },
      {
        name: "Victoria",
        cities: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
      },
      {
        name: "Queensland",
        cities: [
          "Brisbane",
          "Gold Coast",
          "Sunshine Coast",
          "Cairns",
          "Toowoomba",
        ],
      },
      {
        name: "Western Australia",
        cities: ["Perth", "Fremantle", "Mandurah", "Albany", "Geraldton"],
      },
      {
        name: "South Australia",
        cities: [
          "Adelaide",
          "Mount Gambier",
          "Whyalla",
          "Murray Bridge",
          "Port Lincoln",
        ],
      },
    ],
  },
  {
    name: "India",
    states: [
      {
        name: "Maharashtra",
        cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
      },
      {
        name: "Karnataka",
        cities: ["Bangalore", "Mysore", "Hubli", "Belgaum", "Mangalore"],
      },
      {
        name: "Tamil Nadu",
        cities: ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
      },
      {
        name: "Delhi",
        cities: ["New Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad"],
      },
      {
        name: "Gujarat",
        cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
      },
    ],
  },
];
function AddressDto({ formData, handleChange }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    handleChange(e);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    handleChange(e);
  };

  return (
    <div>
      <h2> Address Details </h2>
      <div>
        <label> Address Line1 : </label>
        <input
          type="text"
          name="address.addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Address Line2 : </label>
        <input
          type="text"
          name="address.addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
        />
      </div>

      <div>
        <label> Country: </label>
        <select
          name="address.country"
          value={selectedCountry || formData.country}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label> State: </label>
        <select
          name="address.state"
          value={selectedState || formData.state}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {selectedCountry &&
            countries
              .find((country) => country.name === selectedCountry)
              ?.states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
        </select>
      </div>
      <div>
        <label> City: </label>
        <select
          name="address.city"
          value={formData.city}
          onChange={handleChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {selectedState &&
            countries
              .find((country) => country.name === selectedCountry)
              ?.states.find((state) => state.name === selectedState)
              ?.cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
        </select>
      </div>
      <div>
        <label>ZipCode:</label>
        <input
          type="number"
          maxLength={6}
          name="address.zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default AddressDto;
