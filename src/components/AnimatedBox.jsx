import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { BoxHelper } from 'three';

const AnimatedBox = ({isTesting}) => {
    const meshRef = useRef(null);
    useHelper(meshRef, BoxHelper, isTesting ? "blue" : null);

    useFrame(() => {
        console.log('hi');
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
        }
    });
    return (
        <mesh ref={meshRef} scale={[0.5, 0.5, 0.5]}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    );
};

export default AnimatedBox;