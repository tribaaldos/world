// import React, { useMemo } from 'react';
// import * as THREE from 'three';

// const GRASS_BLADES = 1024;
// const GRASS_BLADE_VERTICES = 15;

// function CreateTileGeometry() {
//     const NUM_GRASS_X = Math.sqrt(GRASS_BLADES);
//     const NUM_GRASS_Y = Math.sqrt(GRASS_BLADES);
//     const GRASS_PATCH_SIZE = 1; // Assuming a default value for GRASS_PATCH_SIZE

//     const offsets = [];

//     for (let i = 0; i < NUM_GRASS_X; ++i) {
//         const x = (i / NUM_GRASS_Y) - 0.5;

//         for (let j = 0; j < NUM_GRASS_X; ++j) {
//             const y = (j / NUM_GRASS_Y) - 0.5;
//             offsets.push(x * GRASS_PATCH_SIZE + Math.random() * 0.4 - 0.2);
//             offsets.push(y * GRASS_PATCH_SIZE + Math.random() * 0.4 - 0.2);
//             offsets.push(0);
//         }
//     }

//     const offsetsData = offsets.map(THREE.DataUtils.toHalfFloat);

//     const vertID = new Uint8Array(GRASS_BLADE_VERTICES);
//     for (let i = 0; i < GRASS_BLADE_VERTICES; ++i) {
//         vertID[i] = i;
//     }

//     const geo = new THREE.InstancedBufferGeometry();
//     geo.instanceCount = GRASS_BLADES;
//     geo.setAttribute('vertIndex', new THREE.Uint8BufferAttribute(vertID, 1));
//     geo.setAttribute('position', new THREE.InstancedBufferAttribute(new Float32Array(offsetsData), 3));
//     return geo;
// }

// function GrassTile() {
//     const grassGeometry = useMemo(() => CreateTileGeometry(), []);
//     const testGeometry = new THREE.BoxGeometry(1, 1, 1);
//     return (
//         <>
//         <mesh position={[0, -1, 0]} geometry={grassGeometry}>
//             <meshStandardMaterial color="green" />
//         </mesh>
//         <mesh geometry={testGeometry}>
//             <meshStandardMaterial color="green" />
//         </mesh>
//         </>
//     );
// }

// export default GrassTile;
