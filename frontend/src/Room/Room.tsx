import { useParams } from 'react-router-dom'
import { Canvas, useLoader } from '@react-three/fiber'
import Car from '../Car/Car'
import { Physics, usePlane } from '@react-three/cannon'
const {TextureLoader} = require("three/src/loaders/TextureLoader")

const Plane = () => {

  const [planePhysics] = usePlane(() => ({mass: 0, rotation: [-90 * (Math.PI / 180), 0, 0], position: [0, -1, 0]}))
  const colorMap = useLoader(TextureLoader, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1793dbac-808c-4445-a085-a9d4588a43f7/d4hj068-433f5832-3c04-42db-9c2e-173a26a6970a.png/v1/fill/w_1192,h_670,q_70,strp/grid_texture_by_xjoeyxhd_d4hj068-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDgwIiwicGF0aCI6IlwvZlwvMTc5M2RiYWMtODA4Yy00NDQ1LWEwODUtYTlkNDU4OGE0M2Y3XC9kNGhqMDY4LTQzM2Y1ODMyLTNjMDQtNDJkYi05YzJlLTE3M2EyNmE2OTcwYS5wbmciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.DuoldD2Qa83zGJCL2A7z8FrYYg6jg_iMd8zd9ifb7aQ')

  return (
    <mesh ref={planePhysics}>
      <planeGeometry args={[100, 100]}/>
      <meshBasicMaterial color="green" map={colorMap} />
    </mesh>
  )
}

const Room = () => {

  const { id } = useParams()

  return (
    <Canvas style={{ background: "white", width: "100vw", height: "100vh" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Physics>
        <Car/>
        <Plane />
      </Physics>
    </Canvas>
  )
}

export default Room