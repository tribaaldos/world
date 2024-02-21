import './App.css';
// import { Canvas, useThree } from '@react-three/fiber';
import './index.css';
import Experience from './World/World';
// import { OrbitControls } from "@react-three/drei";
// import Lights from './World/Lights'
// import { OrbitControls, Stats } from '@react-three/drei';

export default function App() {
  // const { camera } = useThree();
  // const testing = true;
  function openLink(url) {
    var choice = window.confirm("Do you want to open this link in Chrome?");
    if (choice) {
      window.open(url, "_blank");
    }
  }
  return (
    <>
      <a href="#" onClick={() => openLink('https://www.example.com')}>Open Link</a>

      <div className="container">
        {/* <Canvas shadows camera={{ fov: 75, near: 0.1, far: 2000, position: [0, 5, 15] }} > */}

        {/* {testing ? <axesHelper visible={testing} args={[2]} /> : null}
        {testing ? <Stats /> : null}
        {testing ? <gridHelper/> : null}
        <OrbitControls />
        <Lights /> */}
        {/* <Experience isTesting={testing}/> */}
        <Experience />

        {/* </Canvas> */}
      </div>
    </>
  );
}
