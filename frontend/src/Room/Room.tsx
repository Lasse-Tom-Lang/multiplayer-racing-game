import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'

function Box() {
  const mesh = useRef<MeshProps>()
  const moveBox = () => {
    mesh.current!.position.y -= 4
  }
  useFrame((state, delta) => {
    mesh.current!.rotation.x += 1 * delta;
    mesh.current!.position.y += 0.05
  })
  return (
    <mesh position={[1, -2, 0]} ref={mesh} onClick={(event) => moveBox()}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

const Room = () => {

  const { id } = useParams()

  return (
    <Canvas style={{background: "white", width: "100vw", height: "100vh"}}>
      <ambientLight/>
      <pointLight position={[10, 10, 10]} />
      <Box/>
    </Canvas>
  )
}

export default Room