import React, { useRef, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const BlenderScene = ({ renderData }) => {
  const gltf = useLoader(GLTFLoader, renderData.modelUrl);
  const meshRef = useRef();

  const model = useMemo(() => {
    return <primitive object={gltf.scene} ref={meshRef} />;
  }, [gltf.scene]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <OrbitControls />
      {model}
    </Canvas>
  );
};

export default BlenderScene;