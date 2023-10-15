import Lights from './Lights'
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei'
function Box() {
    return (
        <mesh position={[ 0, 0.5, 0]} castShadow receiveShadow wireframe={true}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

function Plane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow >
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color="lightblue" />
        </mesh>
    );
}
const Model = () => {
    const gltf = useGLTF('/static/models/character.gltf');
    const modelRef = useRef();
  
    return <primitive object={gltf.scene} scale={0.01} ref={modelRef} />;
  };



export default function World() {

    return (
        <>
            <Lights />
            <Box/>
     
            <Plane />
            <Model />
        </>
    )
}