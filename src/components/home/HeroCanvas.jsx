// import { Canvas } from "@react-three/fiber"
// import { Suspense, useRef } from "react"
// import Particles from "../../r3f/Particles.jsx"
// import { useTheme } from "../../theme/ThemeProvider.jsx"
// import useBreakpoint from "../../hooks/useBreakpoint.js"

// export default function HeroCanvas() {
//     const { isDark } = useTheme()
//     const { isMobile } = useBreakpoint()
//     const containerRef = useRef(null)

//     return (
//         <div
//             ref={containerRef}
//             className="absolute inset-0"
//         >
//             <Canvas
//                 dpr={isMobile ? [1, 1.5] : [1, 2]}
//                 gl={{
//                     antialias: !isMobile,
//                     alpha: true,
//                     powerPreference: "high-performance",
//                 }}
//                 camera={{ fov: 35, position: [0, 0, 18] }}
//                 eventSource={containerRef}
//                 eventPrefix="client"
//                 className={isMobile ? "touch-pan-y" : ""}
//             >
//                 <Suspense fallback={null}>
//                     <Particles darkMode={isDark} />
//                 </Suspense>
//             </Canvas>
//         </div>
//     )
// }

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import Particles from "../../r3f/Particles.jsx"
import useBreakpoint from "../../hooks/useBreakpoint.js"


export default function HeroCanvas() {
  const { isMobile } = useBreakpoint()
  const containerRef = useRef(null)
  const controlsRef = useRef(null)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ cursor: isMobile ? "default" : "grab" }}
      onPointerDown={e => { if (!isMobile) e.currentTarget.style.cursor = "grabbing" }}
      onPointerUp={e => { if (!isMobile) e.currentTarget.style.cursor = "grab" }}
      onPointerLeave={e => { if (!isMobile) e.currentTarget.style.cursor = "grab" }}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        // pulled back from 18 so the 10x10 plane fills the narrower column
        // and the hair/jaw edges sit where the cursor naturally travels
        camera={{ fov: 35, position: [0, 0, 18] }}
        eventSource={containerRef}
        eventPrefix="client"
        className={isMobile ? "touch-pan-y" : ""}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>

        {!isMobile && (
          <>
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              rotateSpeed={0.5}
            />
</>
        )}
      </Canvas>
    </div>
  )
}