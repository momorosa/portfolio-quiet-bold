import {
    Text,
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  useCursor,
  useTexture,
} from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { easing } from 'maath'
import desertTextureUrl from "../assets/textures/Desert_World.jpg"
import waterTextureUrl from "../assets/textures/Water_World.jpg"
import castleTextureUrl from "../assets/textures/Castle.jpg"
import { DragonEvolved } from "../components/DragonEvolved.jsx"
import { Cactoro } from "../components/Cactoro.jsx"
import { Ninja } from "../components/Ninja.jsx"


export default function Portal() {
    const [active, setActive] = useState(null)
    const [hovered, setHovered] = useState(null)
    useCursor(hovered)
    const controlsRef = useRef()
    const scene = useThree((state) => state.scene)

    useEffect(() => {
        const controls = controlsRef.current
        if(!controls) return

        if (active) {
            const obj = scene.getObjectByName(active)
            if (!obj) return

            const targetPosition = new THREE.Vector3()
            obj.getWorldPosition(targetPosition);
            controlsRef.current.setLookAt(
                0,
                0,
                5,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true
            )
        } else {
            controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)
        }
    }, [active, scene])

    return <>
        <ambientLight intensity={0.5} />
        <Environment preset="sunset" />
        <CameraControls
            ref={controlsRef}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            dollySpeed={ 0 }
        />
        <MonsterStage 
            texture={ castleTextureUrl } 
            name="Dragon" 
            color="white" 
            position-x={ -2.5 } 
            rotation-y={ Math.PI / 8 }
            active={ active }
            setActive={ setActive }
            hovered={ hovered }
            setHovered={ setHovered }
            message={ "thanks" }
        >
            <DragonEvolved scale={ 0.6 } position-y={ -1 } hovered={ hovered === "Dragon"}/>
        </MonsterStage> 
        <MonsterStage 
            texture={ waterTextureUrl } 
            name="Ninja" 
            color="white"
            active={ active }
            setActive={ setActive } 
            hovered={ hovered }
            setHovered={ setHovered }
            message={ "for" }
        >
            <Ninja scale={ 0.5 } position-y={ -1 } hovered={ hovered === "Ninja"}/>
        </MonsterStage>        
        <MonsterStage 
            texture={ desertTextureUrl } 
            name="Cactoro" 
            color="white" 
            position-x={ 2.5 } 
            rotation-y={ -Math.PI / 8 }
            active={ active }
            setActive={ setActive }
            hovered={ hovered }
            setHovered={ setHovered }
            message={ " visiting!"}
        >
            <Cactoro scale={ 0.4 } position-y={ -1 } hovered={ hovered === "Cactoro"}/>
        </MonsterStage>               
    </>
}

const MonsterStage = ({
    children,
    texture,
    name,
    color,
    message,
    active,
    setActive,
    hovered,
    setHovered,
    ...props
}) => {

    const map = useTexture(texture)
    const portalMaterial = useRef(null)

    useFrame(( _state, delta ) => {
        if (!portalMaterial.current) return

        const worldOpen = active === name
        easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta )
    })

    return (
        <group {...props}>
            <Text font={"src/assets/fonts/roboto.woff"} fontSize={ 0.3 } anchorY={ "bottom" } position={[ 0, -1.3, 0.051 ]} material-toneMapped={false}>
                { message }
                <meshBasicMaterial color={ color } toneMapped={ false } />
            </Text>
            <RoundedBox
                name={name}
                args={[2, 3, 0.1]}
                onDoubleClick={() => setActive(active === name ? null : name)}
                onPointerEnter={() => setHovered(name)}
                onPointerLeave={() => setHovered(null)}
            >
                <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
                    <ambientLight intensity={1} />
                    <Environment preset="sunset" />
                        {children}
                    <mesh>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshStandardMaterial map={map} side={THREE.BackSide} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </group>
    )
}
