import { useEffect, useRef } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'
import CameraController from './CameraController'

const Car: React.FC = () => {
  let speed = 0
  const maxSpeed = 20
  const maxBackSpeed = -10
  const maxRotationSpeed = 8
  const acceleration = 5
  const friction = 12
  const driftMultiplier = 2
  const rotationMultiplier = 5
  let wPressed = false
  let aPressed = false
  let sPressed = false
  let dPressed = false
  const mesh = useRef<MeshProps>()
  function keyDown(e: KeyboardEvent) {
    if (e.keyCode === 87) wPressed = true
    if (e.keyCode === 65) aPressed = true
    if (e.keyCode === 83) sPressed = true
    if (e.keyCode === 68) dPressed = true
  }
  function keyUp(e: KeyboardEvent) {
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
  useFrame((state, deltaTime) => {

    if (aPressed) {
      if (speed > maxRotationSpeed) {
        mesh.current!.rotation.y += maxRotationSpeed / rotationMultiplier * deltaTime;
        mesh.current!.position.z -= Math.cos(mesh.current!.rotation.y - 90) * speed / driftMultiplier * deltaTime
        mesh.current!.position.x -= Math.sin(mesh.current!.rotation.y - 90) * speed / driftMultiplier * deltaTime
      }
      else {
        mesh.current!.rotation.y += speed / rotationMultiplier * deltaTime;
      }
    }
    if (dPressed) {
      if (speed > maxRotationSpeed) {
        mesh.current!.rotation.y -= maxRotationSpeed / rotationMultiplier * deltaTime;
        mesh.current!.position.z -= Math.cos(mesh.current!.rotation.y + 90) * speed / driftMultiplier * deltaTime
        mesh.current!.position.x -= Math.sin(mesh.current!.rotation.y + 90) * speed / driftMultiplier * deltaTime
      }
      else {
        mesh.current!.rotation.y -= speed / rotationMultiplier * deltaTime;
      }
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
      if (speed > maxBackSpeed) {
        speed -= acceleration * deltaTime
      }
    }
    else {
      if (speed < 0) {
        speed += friction * deltaTime
      }
    }
    if ((speed < 0.08 && speed > 0) || (speed > -0.08 && speed < 0)) speed = 0
    mesh.current!.position.z -= Math.cos(mesh.current!.rotation.y) * speed * deltaTime
    mesh.current!.position.x -= Math.sin(mesh.current!.rotation.y) * speed * deltaTime
  })
  return (
    <>
      <mesh ref={mesh}>
        <boxGeometry args={[1, 1, 1]}>
          <CameraController carMesh={mesh} />
        </boxGeometry>
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  )
}

export default Car