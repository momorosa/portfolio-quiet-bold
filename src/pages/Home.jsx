import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Experience from "../components/Experience.jsx";
import HomeUI from "../components/HomeUI.jsx";

export default function Home() {
  return (
    <main className="fixed inset-0">
        <Canvas
        shadows
        dpr={[ 1, 2 ]}
        camera={{ fov: 35, position: [0, 0, 18] }}
        className="touch-none"
        >
        <ScrollControls pages={4} damping={0.2}>
            <Scroll>
            <Experience />
            </Scroll>
            <Scroll html>
            <HomeUI />
            </Scroll>
        </ScrollControls>
        </Canvas>

    </main>
  )
}
