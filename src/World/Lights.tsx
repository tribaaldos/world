import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import React from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper,  } from 'three';
import * as THREE from 'three'
const Lights: React.FC = () => {

    const light = useRef<THREE.DirectionalLight>();
    const directionalLightHelper = useRef();
    useHelper(directionalLightHelper, DirectionalLightHelper);
    useFrame((state) => {
        light.current.position.z = state.camera.position.z + 1
        light.current.target.position.z = state.camera.position.z
        light.current.target.updateMatrixWorld()
    
    })

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight
                ref={light}
                castShadow
                intensity={2}
                position={[0, 10, 10]}
                shadow-mapSize-height={1000}
                shadow-mapSize-width={1000}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />
            <hemisphereLight args={["#7cdbe6", "#5e9c49", 1]} />
        </>
    );
}

export default Lights

