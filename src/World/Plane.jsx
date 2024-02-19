import React from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'red' })


const Plane = () => {
    
    const plane = useGLTF('/static/models/grass.glb');

    return (
        <>

                <RigidBody position={[0, -1, 0]} type="fixed" colliders="hull">
                    <primitive object={plane.scene} />;
                    {/* <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.1, 0]} scale={[10, 0.2, 10]} receiveShadow /> */}
                </RigidBody>

        </>
    )
};

export default Plane;        
