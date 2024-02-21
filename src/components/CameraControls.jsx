// import React, { useRef } from 'react';
// import * as THREE from 'three';
// import { useFrame, useThree } from '@react-three/fiber';
// import { useEffect } from 'react';
// const CameraControlss = ({ playerRef }) => {
//   const { camera, gl } = useThree();
//   const controlsRef = useRef();

//   useFrame(() => {
//     if (controlsRef.current) {
//       controlsRef.current.update();
//     }
//   });

//   // Set up OrbitControls
//   useEffect(() => {
//     const controls = new THREE.OrbitControls(camera, gl.domElement);
//     controls.target = playerRef.current.position; // Set the focus point for the controls
//     controls.enableDamping = true; // Enable smooth camera movement
//     controls.dampingFactor = 0.25; // Adjust the smoothness
//     controls.minDistance = 5; // Minimum distance the camera can be from the player
//     controls.maxDistance = 20; // Maximum distance the camera can be from the player
//     controlsRef.current = controls;

//     return () => {
//       controls.dispose(); // Clean up controls on unmount
//     };
//   }, [camera, gl.domElement, playerRef]);

//   return null; // Controls are managed internally, so we don't render anything
// };

// export default CameraControlss;
