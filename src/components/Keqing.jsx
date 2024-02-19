
import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
export default function Keqing(props) {
    const { nodes, materials } = useGLTF("/static/models/keqing.glb");

    const group = useRef();

    const { animations: idleAnimation } = useFBX("/static/animations/Idle.fbx");
    const { animations: walkingAnimation } = useFBX("/static/animations/Walking.fbx");

    idleAnimation[0].name = "Idle";
    walkingAnimation[0].name = "Walking";

    const { actions } = useAnimations(
        [idleAnimation[0], walkingAnimation[0]],
        group
    );

    const [animation, setAnimation] = useState("Idle");
    
    return (
        <group scale={0.01} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <primitive object={nodes._rootJoint} />
                <skinnedMesh
                    geometry={nodes.Object_247.geometry}
                    material={materials.material}
                    skeleton={nodes.Object_247.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Object_248.geometry}
                    material={materials.material_1}
                    skeleton={nodes.Object_248.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Object_249.geometry}
                    material={materials.material_2}
                    skeleton={nodes.Object_249.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Object_250.geometry}
                    material={materials.material_3}
                    skeleton={nodes.Object_250.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Object_251.geometry}
                    material={materials.material_4}
                    skeleton={nodes.Object_251.skeleton}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/static/models/keqing.glb");
