import React, { useState } from "react";
import axios from "axios";
import BlenderScene from "./BlenderScene";

const SimulationInput = () => {
  const [roomDimensions, setRoomDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [index, setIndex] = useState(0);
  const [wallLocations, setWallLocations] = useState([]);
  const [applianceTypes, setApplianceTypes] = useState([]);
  const [placementRules, setPlacementRules] = useState("");
  const [renderData, setRenderData] = useState(null);
  const electricalComponentCosts = {
    fan: 2000,
    tubelight: 600,
    bulb: 300,
    switchboard: 450,
  };
  const wiringCostPerMeter = 15;

  const calculatePerimeterAndWiringCost = () => {
    const { length, width } = roomDimensions;
    const perimeter = 2 * (parseFloat(length) + parseFloat(width));
    const wiringCost = perimeter * wiringCostPerMeter || 0;
    return { perimeter, wiringCost };
  };

  const calculateElectricalComponentsCost = () => {
    let totalCost = 0;
    applianceTypes.forEach((type) => {
      totalCost += electricalComponentCosts[type] || 0;
    });
    return totalCost;
  };

  const { perimeter, wiringCost } = calculatePerimeterAndWiringCost();
  let electricalComponentsCost = calculateElectricalComponentsCost();

  if (applianceTypes.includes("wiring")) {
    electricalComponentsCost += wiringCost;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {
      roomDimensions,
      walls: wallLocations,
      applianceTypes,
      placementRules,
    };

     try {
    //    const response = await axios.post("http://172.16.5.133:5000/createJob", inputData, {
    //      headers: {
    //        "Content-Type": "application/json",
    //       },
    //      responseType: "arraybuffer",
    //    });
      const response = await axios.get("http://172.16.3.71:2000/")
       setRenderData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addWallLocation = () => {
    if (wallLocations.length < 4) {
      setWallLocations([...wallLocations, { length: "", direction: "", index}]);
      setIndex(index=>index+1)

    } else {
      alert("Maximum of 4 wall locations allowed.");
    }
  };

  const updateWallLocation = (index, field, value) => {
    const updatedWallLocations = [...wallLocations];
    updatedWallLocations[index][field] = value;
    setWallLocations(updatedWallLocations);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-row">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-md rounded-lg px-8 pb-8"
      >
        <h2 className="text-xl font-bold mb-4">Room Dimensions</h2>
        <div className="flex mb-4 items-center">
          <label htmlFor="length" className="w-1/3 text-right mr-2">
            Length(m):
          </label>
          <input
            type="number"
            id="length"
            name="length"
            className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={roomDimensions.length}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, length: e.target.value })
            }
          />
        </div>
        <div className="flex mb-4 items-center">
          <label htmlFor="width" className="w-1/3 text-right mr-2">
            Width(m):
          </label>
          <input
            type="number"
            id="width"
            name="width"
            className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={roomDimensions.width}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, width: e.target.value })
            }
          />
        </div>
        <div className="flex mb-4 items-center">
          <label htmlFor="height" className="w-1/3 text-right mr-2">
            Height(m):
          </label>
          <input
            type="number"
            id="height"
            name="height"
            className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={roomDimensions.height}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, height: e.target.value })
            }
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Wall Locations</h2>
        <button
          type="button"
          onClick={addWallLocation}
          className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Add Wall Location
        </button>
        <div className="mt-4">
          {wallLocations.map((wallLocation, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-300 rounded-md px-4 py-2 flex flex-col"
            >
              <label className="text-gray-700 mb-1">Wall [{index}]</label>
              <div className="flex items-center mb-1">
                <span className="w-1/3 text-right mr-2">Length</span>
                <input
                  type="number"
                  name={`wallLength_${index}`}
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={wallLocation.length}
                  onChange={(e) =>
                    updateWallLocation(index, "length", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center mb-1">
                <span className="w-1/3 text-right mr-2">Direction:</span>
                <select
                  name={`wallDirection_${index}`}
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={wallLocation.direction}
                  onChange={(e) =>
                    updateWallLocation(index, "direction", e.target.value)
                  }
                >
                  <option value="">Select direction</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">Appliance Types</h2>
        <div className="flex items-center mb-4">
          <label htmlFor="switchboard" className="mr-4">
            <input
              type="checkbox"
              id="switchboard"
              name="switchboard"
              className="mr-2 accent-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              value="switchboard"
              checked={applianceTypes.includes("switchboard")}
              onChange={(e) => {
                const newApplianceTypes = e.target.checked
                  ? [...applianceTypes, "switchboard"]
                  : applianceTypes.filter((type) => type !== "switchboard");
                setApplianceTypes(newApplianceTypes);
              }}
            />
            Switchboard
          </label>
          <label htmlFor="fan" className="mr-4">
            <input
              type="checkbox"
              id="fan"
              name="fan"
              className="mr-2 accent-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              value="fan"
              checked={applianceTypes.includes("fan")}
              onChange={(e) => {
                const newApplianceTypes = e.target.checked
                  ? [...applianceTypes, "fan"]
                  : applianceTypes.filter((type) => type !== "fan");
                setApplianceTypes(newApplianceTypes);
              }}
            />
            Fan
          </label>
          <label htmlFor="wiring" className="mr-4">
            <input
              type="checkbox"
              id="wiring"
              name="wiring"
              className="mr-2 accent-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              value="wiring"
              checked={applianceTypes.includes("wiring")}
              onChange={(e) => {
                const newApplianceTypes = e.target.checked
                  ? [...applianceTypes, "wiring"]
                  : applianceTypes.filter((type) => type !== "wiring");
                setApplianceTypes(newApplianceTypes);
              }}
            />
            Wiring
          </label>
        </div>

        <h2 className="text-xl font-bold mb-4">Placement Rules</h2>
        <textarea
          name="placementRules"
          className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={placementRules}
          onChange={(e) => setPlacementRules(e.target.value)}
          placeholder="Enter placement rules or constraints"
        ></textarea>

        <h2 className="text-xl font-bold mb-4">Cost Estimation</h2>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border">Component</th>
              <th className="py-2 px-4 bg-gray-100 border">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">Wiring Cost</td>
              <td className="py-2 px-4 border">{wiringCost}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">Electrical Components Cost</td>
              <td className="py-2 px-4 border">{electricalComponentsCost}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border font-bold">Total Cost</td>
              <td className="py-2 px-4 border font-bold">
                {electricalComponentsCost + wiringCost}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Run Simulation
        </button>
      </form>
      {renderData && <BlenderScene renderData={renderData} />}
    </div>
  );
};

export default SimulationInput;