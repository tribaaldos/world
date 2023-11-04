import { useAnimations, useGLTF } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { AnimationAction, Group, Mesh } from 'three'
import React from 'react';
export type Action = {
  idle: AnimationAction
  walk: AnimationAction
  run: AnimationAction
  jump_inplace: AnimationAction
  jump_run: AnimationAction
}

interface PlayerProps {
  action: keyof Action
}

const Player = ({ action }: PlayerProps) => {
  const { scene, animations } = useGLTF('/static/models/player4.glb')

  const [currentAction, /*setCurrentAction*/] = useState<keyof Action>('idle')

  // manually add shadows to all meshes in the model
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  const playerRef = useRef<Group>(null!)
  const { actions, mixer } = useAnimations(animations, playerRef)

  useEffect(() => {
    actions['idle'].play()
  }, [actions])

  useEffect(() => {
    actions[action]?.reset().fadeIn(0.5).play()

    return () => {
      // Cleanup function to stop the mixer on unmount
      actions[action].fadeOut(0.5)
    }
  }, [currentAction, action, actions, mixer])

  return (
    <group castShadow ref={playerRef} dispose={null}>
      <primitive caststShadow object={scene} />
    </group>
  )
}

export default Player
