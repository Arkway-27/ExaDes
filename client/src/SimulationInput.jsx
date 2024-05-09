import React, { useState } from "react";
import axios from "axios";
import BlenderScene from "./BlenderScene";

const SimulationInput = () => {
  const [roomDimensions, setRoomDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [wallLocations, setWallLocations] = useState([]);
  const [applianceTypes, setApplianceTypes] = useState([]);
  const [placementRules, setPlacementRules] = useState("");
  const [renderData, setRenderData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {
      roomDimensions,
      wallLocations,
      applianceTypes,
      placementRules,
    };

    try {
      const response = await axios.get("http://192.168.27.150:2000/", {
        responseType: "arraybuffer",
      });
      setRenderData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addWallLocation = () => {
    setWallLocations([...wallLocations, { x: "", y: "", z: "" }]);
  };

  const updateWallLocation = (index, coordinate, value) => {
    const updatedWallLocations = [...wallLocations];
    updatedWallLocations[index][coordinate] = value;
    setWallLocations(updatedWallLocations);
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        class="bg-white shadow-md rounded-lg px-8 pb-8"
      >
        <h2 class="text-xl font-bold mb-4">Room Dimensions</h2>
        <div class="flex mb-4 items-center">
          <label for="length" class="w-1/3 text-right mr-2">
            Length(m):
          </label>
          <input
            type="number"
            id="length"
            class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={roomDimensions.length}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, length: e.target.value })
            }
          />
        </div>
        <div class="flex mb-4 items-center">
          <label for="width" class="w-1/3 text-right mr-2">
            Width(m):
          </label>
          <input
            type="number"
            id="width"
            class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={roomDimensions.width}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, width: e.target.value })
            }
          />
        </div>
        <div class="flex mb-4 items-center">
          <label for="height" class="w-1/3 text-right mr-2">
            Height(m):
          </label>
          <input
            type="number"
            id="height"
            class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={roomDimensions.height}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, height: e.target.value })
            }
          />
        </div>

        <h2 class="text-xl font-bold mb-4">Wall Locations</h2>
        <button
          type="button"
          onClick={addWallLocation}
          class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Add Wall Location
        </button>
        <div class="mt-4">
          {wallLocations.map((wallLocation, index) => (
            <div
              key={index}
              class="mb-4 border border-gray-300 rounded-md px-4 py-2 flex flex-col"
            >
              <label class="text-gray-700 mb-1">Wall [{index}]</label>
              <div class="flex items-center mb-1">
                <span class="w-1/3 text-right mr-2">X:</span>
                <input
                  type="number"
                  class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={wallLocation.x}
                  onChange={(e) =>
                    updateWallLocation(index, "x", e.target.value)
                  }
                />
              </div>
              <div class="flex items-center mb-1">
                <span class="w-1/3 text-right mr-2">Y:</span>
                <input
                  type="number"
                  class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={wallLocation.y}
                  onChange={(e) =>
                    updateWallLocation(index, "y", e.target.value)
                  }
                />
              </div>
              <div class="flex items-center">
                <span class="w-1/3 text-right mr-2">Z:</span>
                <input
                  type="number"
                  class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={wallLocation.z}
                  onChange={(e) =>
                    updateWallLocation(index, "z", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <h2 class="text-xl font-bold mb-4">Appliance Types</h2>
        <div class="flex items-center mb-4">
          <label for="switchboard" class="mr-4">
            <input
              type="checkbox"
              id="switchboard"
              class="mr-2 accent-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          <label for="fan" class="mr-4">
            <input
              type="checkbox"
              id="fan"
              class="mr-2 accent-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </div>

        <h2 class="text-xl font-bold mb-4">Placement Rules</h2>
        <textarea
          class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={placementRules}
          onChange={(e) => setPlacementRules(e.target.value)}
          placeholder="Enter placement rules or constraints"
        ></textarea>

        <button
          type="submit"
          class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Run Simulation
        </button>
      </form>
      {renderData && <BlenderScene renderData={renderData} />}
    </div>
  );
};

export default SimulationInput;
