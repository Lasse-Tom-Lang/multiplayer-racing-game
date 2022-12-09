import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'

function Box() {
  let speed = 0
  const maxSpeed = 30
  const acceleration = 5
  const friction = 7
  const rotationMultiplier = 5
  let wPressed = false
  let aPressed = false
  let sPressed = false
  let dPressed = false
  const mesh = useRef<MeshProps>()
  useFrame((state, deltaTime) => {
    if (aPressed) {
      mesh.current!.rotation.y += speed / rotationMultiplier * deltaTime;
    }
    if (dPressed) {
      mesh.current!.rotation.y -= speed / rotationMultiplier * deltaTime;
    }
    if (wPressed) {
      if (speed < maxSpeed) {
        speed += acceleration * deltaTime
      }
    }
    else {
      if (speed > 0) {
        speed -= friction * deltaTime
      }
    }
    if (sPressed) {
      if (speed > -maxSpeed) {
        speed -= acceleration * deltaTime
      }
    }
    else {
      if (speed < 0) {
        speed += friction * deltaTime
      }
    }
    mesh.current!.position.z -= Math.cos(mesh.current!.rotation.y) * speed * deltaTime
    mesh.current!.position.x -= Math.sin(mesh.current!.rotation.y) * speed * deltaTime
  })
  function keyDown(e:KeyboardEvent) {
    if (e.keyCode === 87) wPressed = true
    if (e.keyCode === 65) aPressed = true
    if (e.keyCode === 83) sPressed = true
    if (e.keyCode === 68) dPressed = true
  }
  function keyUp(e:KeyboardEvent) {
    if (e.keyCode === 87) wPressed = false
    if (e.keyCode === 65) aPressed = false
    if (e.keyCode === 83) sPressed = false
    if (e.keyCode === 68) dPressed = false
  }
  useEffect(() => {
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, []);
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

const Room = () => {

  const { id } = useParams()

  return (
    <Canvas camera={{ position: [0, 40, 0], }} style={{background: "white", width: "100vw", height: "100vh"}}>
      <ambientLight/>
      <pointLight position={[10, 10, 10]} />
      <Box/>
    </Canvas>
  )
}

export default Room