import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, OrbitControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import WizardController from '../components/PlayerController'
import Plane from './Plane'
export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  run: 'run',
  jump: 'jump'
}

const Experience = () => {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
      { name: Controls.back, keys: ['KeyS', 'ArrowDown'] },
      { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
      { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
      { name: Controls.run, keys: ['ShiftLeft'] },
      { name: Controls.jump, keys: ['Space'] }
    ],
    []
  )
  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [0, 6, 8], fov: 75 }}>
        <Suspense fallback={null}>
          <Physics debug={true}>
            <OrbitControls />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={2} castShadow color={'red'} />
            {/* FLOOR */}
            <RigidBody type="fixed" colliders="trimesh">
              {/* <Plane receiveShadow args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#fff" />
              </Plane> */}
              <Plane />
            </RigidBody>
            <WizardController />
            <RigidBody position={[2, 2, 0]}>
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="green" />
              </mesh>
            </RigidBody>

          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  )
}

export default Experience
