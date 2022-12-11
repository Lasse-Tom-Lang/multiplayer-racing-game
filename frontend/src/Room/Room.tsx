import { useParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import Car from './Car'

const Room = () => {

  const { id } = useParams()

  return (
    <Canvas style={{ background: "white", width: "100vw", height: "100vh" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Car/>
    </Canvas>
  )
}

export default Room