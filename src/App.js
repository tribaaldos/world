import './App.css';
import { Canvas } from '@react-three/fiber'
import './index.css'
import World from './World/World'
import { OrbitControls } from "@react-three/drei";

export default function App() {

  return (
    <Canvas shadows
      camera={{
        fov: 45, near: 0.1, far: 200,
        position: [0, 5, 15]
      }}>
      <OrbitControls />
      <World />

    </Canvas>
  );
}


