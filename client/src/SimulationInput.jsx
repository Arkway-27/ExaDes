import React,{useState} from "react";
import axios from 'axios';
import BlenderScene from './BlenderScene';


const SimulationInput= () => {
     const [roomDimensions,setRoomDimensions]=useState({length:'',width:'',height:''});
     const [wallLocations,setWallLoctions]=useState('');
     const [appliancesType,setAppliancesType]=useState([]);
     const [placementRules,setPlacementRules]=useState('');
     const [renderData,setRenderData]=useState(null);


const handleSubmit=async(e)=>{
    e.preventDefault();
    

    const inputData={
        roomDimensions,
        wallLocations,
        appliancesTypes,
        placementRules,
    };

    try{
        const response=await axios.post('',inputData);

        setRenderData(response.data);
    }catch(error){
        console.error('Error:',error);
    }
};

const addWallLocation=()=>{
    setWallLoctions([...wallLocationsf,{x:'',y:'',z:''}]);
};
const updateWallLocation=(index,coordinates,values)=>{
    const updateWallLocation=[...wallLocations];
    updateWallLocations[index][coordinate]=value;
    setWallLoctions(updateWallLocations);
}

     
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Room Dimensions</h2>
        <label>
            Length(m):
        
        <input
        type="number"
        value={roomDimensions.length}
        onChange={(e)=>setRoomDimensions({...roomDimensions})}/>
        </label>
        <label>
            Width(m):
            <input type="number" value={roomDimensions.width}
            onChange={(e)=>setRoomDimensions=({
                ...roomDimensions,width:e.target.value
            })}/>
        </label>
        <label>
            Height(m):
            <input type="number" value={roomDimensions.height}
            onChange={(e)=>setRoomDimensions=({
                ...roomDimensions,height:e.target.value
            })}/>
        </label>
        <h2>Wall Locations</h2>
        <button type="button" onClick={addWallLocation}>
            Add Wall Location
        </button>
        {wallLocations.map((wallLocations,index)=>(
         <div key={index}>
            <label>
                Wall [{index}] X:
                <input 
                type="number"
                value={wallLocation.x}
                onChange={(e)=>updateWallLocation(index,'x',e.target.value)}/>
            </label>
            <label>
                Wall[{index}] Y:
                <input
                type="number"
                value={wallLocations.y}
                onChange={(e)=>updateWallLocation(index,'y',e.target.value)}
                />
            </label>
            <label>
                Wall [{index}] Z:
                <input
                type="number"
                value={wallLocations.z}
                onChange={(e)=>updateWallLocation(index,'z',e.target.value)}
                />
          </label>
            </div>
        ))}
         <h2>Appliance Types</h2>
        <div>
          <label>
            <input
              type="checkbox"
              value="switchboard"
              checked={applianceTypes.includes('switchboard')}
              onChange={(e) => {
                const newApplianceTypes = e.target.checked
                  ? [...applianceTypes, 'switchboard']
                  : applianceTypes.filter((type) => type !== 'switchboard');
                setApplianceTypes(newApplianceTypes);
              }}
            />
            Switchboard
          </label>
          <label>
            <input
              type="checkbox"
              value="fan"
              checked={applianceTypes.includes('fan')}
              onChange={(e) => {
                const newApplianceTypes = e.target.checked
                  ? [...applianceTypes, 'fan']
                  : applianceTypes.filter((type) => type !== 'fan');
                setApplianceTypes(newApplianceTypes);
              }}
            />
            Fan
          </label>
         
        </div>

        <h2>Placement Rules</h2>
        <textarea
          value={placementRules}
          onChange={(e) => setPlacementRules(e.target.value)}
          placeholder="Enter placement rules or constraints"
        />

        <button type="submit">Run Simulation</button>
      </form>

   
      {renderData && <BlenderScene renderData={renderData} />}
    </div>
  );
};
export default SimulationInput;
