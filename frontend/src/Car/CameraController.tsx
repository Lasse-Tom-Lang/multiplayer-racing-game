import { useThree, useFrame } from "@react-three/fiber"

interface CameraControllerProps {
  carPosition: {
    current: number[]
  }
  carRotation: {
    current: number[]
  }
}

const CameraController: React.FC<CameraControllerProps> = (props) => {
  const cameraDistance = 6
  const cameraHight = 3
  let carRotation = props.carRotation.current[1] * (180/Math.PI)
  const {camera} = useThree()
  useFrame((state, deltaTime) => {
    let newCameraPosition = {x: 0, y: 0, z: 0}
    newCameraPosition.y = props.carPosition.current[1] + cameraHight
    if (carRotation < 90 || carRotation > 270) {
      newCameraPosition.z = props.carPosition.current[2] + Math.cos(props.carRotation.current[1]) * cameraDistance
    }
    if (carRotation > 90 && carRotation < 180) {
      newCameraPosition.z = props.carPosition.current[2] - Math.cos(props.carRotation.current[1]) * cameraDistance
    }
    if (carRotation < 360 || carRotation > 180) {
      newCameraPosition.x = props.carPosition.current[0] + Math.sin(props.carRotation.current[1]) * cameraDistance
    }
    if (carRotation > 0 && carRotation < 180) {
      newCameraPosition.x = props.carPosition.current[0] - Math.sin(props.carRotation.current[1]) * cameraDistance
    }
    camera.position.x = newCameraPosition.x
    camera.position.y = newCameraPosition.y
    camera.position.z = newCameraPosition.z
    camera.lookAt(props.carPosition.current[0], props.carPosition.current[1], props.carPosition.current[2])
  })
  return null
}

export default CameraController