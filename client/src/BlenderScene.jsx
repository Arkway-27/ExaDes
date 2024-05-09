import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BlenderScene = ({ renderData }) => {
  const gltf = useLoader(GLTFLoader,"http://172.16.3.71:2000/");
  //const gltf = useLoader(GLTFLoader,`http://172.16.5.133:5000/getModel?jobid=${renderData}`);
  const meshRef = useRef();

  const model = useMemo(() => {
    return <primitive object={gltf.scene} ref={meshRef} />;
  }, [gltf.scene]);

  return (
    <Canvas className="border">
      <ambientLight intensity={10} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <OrbitControls />
      <Suspense fallback={null}>
      {model}
      </Suspense>
      <Environment preset='sunset'/>
    </Canvas>
  );
};

export default BlenderScene;