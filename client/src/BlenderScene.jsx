import React, { useRef, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BlenderScene = ({ renderData }) => {
  const gltf = useLoader(GLTFLoader,"http://192.168.27.150:2000/");
  const meshRef = useRef();

  const model = useMemo(() => {
    return <primitive object={gltf.scene} ref={meshRef} />;
  }, [gltf.scene]);

  return (
    <Canvas >
      <ambientLight intensity={10} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <OrbitControls />
      {model}
    </Canvas>
  );
};

export default BlenderScene;