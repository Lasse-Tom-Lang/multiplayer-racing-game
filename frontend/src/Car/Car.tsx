import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import CameraController from './CameraController'
import { useBox } from '@react-three/cannon'

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
  const position = useRef([0, 0, 0])
  const rotation = useRef([0, 0, 0])
  const [physicsRef, physicsApi] = useBox(() => ({mass: 1}))
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
    physicsApi.position.subscribe(v => position.current = v)
    physicsApi.rotation.subscribe(v => rotation.current = v)
    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, []);
  useFrame((state, deltaTime) => {
    if (aPressed) {
      if (speed > maxRotationSpeed) {
        // physicsApi.position.set(
        //   -Math.sin(physicsRef.current!.rotation.y - 90) * speed / driftMultiplier,
        //   0,
        //   -Math.cos(physicsRef.current!.rotation.y - 90) * speed / driftMultiplier
        // );
        physicsApi.angularVelocity.set(
          0,
          maxRotationSpeed / rotationMultiplier,
          0
        )
      }
      else {
        physicsApi.angularVelocity.set(
          0,
          speed / rotationMultiplier,
          0
        )
      }
    }
    if (dPressed) {
      if (speed > maxRotationSpeed) {
        // physicsApi.position.set(
        //   -Math.sin(physicsRef.current!.rotation.y + 90) * speed / driftMultiplier,
        //   0,
        //   -Math.cos(physicsRef.current!.rotation.y + 90) * speed / driftMultiplier
        // );
        physicsApi.angularVelocity.set(
          0,
          -maxRotationSpeed / rotationMultiplier,
          0
        )
      }
      else {
        physicsApi.angularVelocity.set(
          0,
          -speed / rotationMultiplier,
          0
        )
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
    physicsApi.velocity.set(
      -Math.sin(rotation.current[1]) * speed,
      0,
      -Math.cos(rotation.current[1]) * speed
    )
  })
  return (
    <>
      <mesh ref={physicsRef}>
        <boxGeometry args={[1, 1, 1]}>
          <CameraController carPosition={position} carRotation={rotation} />
        </boxGeometry>
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  )
}

export default Car