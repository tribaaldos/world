'use client'
import { useState, useRef } from 'react'
import { CapsuleCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Player from './Player'
import { Controls } from '../World/World'
import { Group } from 'three'
import * as THREE from 'three'
import { Action } from './Player'

const JUMP_FORCE = 1.5
const MOVE_SPEED = 1.5
const MAX_VEL = 1

const PlayerController = () => {
  const forward = useKeyboardControls((state) => state[Controls.forward])
  const back = useKeyboardControls((state) => state[Controls.back])
  const left = useKeyboardControls((state) => state[Controls.left])
  const right = useKeyboardControls((state) => state[Controls.right])
  const shift = useKeyboardControls((state) => state[Controls.run])
  const jump = useKeyboardControls((state) => state[Controls.jump])

  const [action, setAction] = useState<keyof Action>('idle')

  const rigidBody = useRef<RapierRigidBody>(null!)
  // const isOnFloor = useRef(true);

  const [isOnFloor, setIsOnFloor] = useState(true)

  const handlePLayerInput = () => {
    if (forward || back || left || right) {
      setAction(shift ? 'running' : 'walking')
    } else if (jump) {
      setAction(action === 'running' ? 'jumping' : 'jumping')
    } else {
      setAction('idle')
    }
  }

  const wizRef = useRef<Group>(null!)

  useFrame((state) => {
    const impulse = { x: 0, y: 0, z: 0 }
    if (jump && isOnFloor) {
      impulse.y += JUMP_FORCE
      setIsOnFloor(false)
    }

    handlePLayerInput()

    const linvel = rigidBody.current.linvel()
    let changeRotation = false

    if (right && linvel.x < MAX_VEL) {
      impulse.x += MOVE_SPEED
      changeRotation = true
    }
    if (left && linvel.x > -MAX_VEL) {
      impulse.x -= MOVE_SPEED
      changeRotation = true
    }
    if (forward && linvel.z > -MAX_VEL) {
      impulse.z -= MOVE_SPEED
      changeRotation = true
    }
    if (back && linvel.z < MAX_VEL) {
      impulse.z += MOVE_SPEED
      changeRotation = true
    }

    rigidBody.current.applyImpulse(impulse, true)
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z)
      wizRef.current.rotation.y = angle
    }

    // CAMERA FOLLOW
    const wizWorldPosition = wizRef.current.getWorldPosition(new THREE.Vector3())
    state.camera.position.x = wizWorldPosition.x
    state.camera.position.z = wizWorldPosition.z + 10

    // const targetLookAt = new THREE.Vector3(wizWorldPosition.x, 0, wizWorldPosition.z)
    // state.camera.lookAt(targetLookAt)
  })

  return (
    <group>
      <RigidBody
        ref={rigidBody}
        colliders={false}
        scale={[0.75, 0.75, 0.75]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          setIsOnFloor(true)
        }}>
        <CapsuleCollider args={[0.7, 0.4]} position={[0, 1.1, 0]} />
        <group ref={wizRef}>
          <Player action={action} />
        </group>
      </RigidBody>
    </group>
  )
}

export default PlayerController
