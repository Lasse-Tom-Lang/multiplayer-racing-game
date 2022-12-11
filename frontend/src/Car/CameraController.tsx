import { MeshProps, useThree, useFrame } from "@react-three/fiber"
import { MutableRefObject } from "react"

interface CameraControllerProps {
  carMesh: MutableRefObject<MeshProps | undefined>
}

const CameraController: React.FC<CameraControllerProps> = (props) => {
  const cameraDistance = 6
  const cameraHight = 3
  let carRotation = props.carMesh.current?.rotation.y * (180/Math.PI)
  const {camera} = useThree()
  useFrame((state, deltaTime) => {
    let newCameraPosition = {x: 0, y: 0, z: 0}
    newCameraPosition.y = props.carMesh.current!.position.y + cameraHight
    if (carRotation < 90 || carRotation > 270) {
      newCameraPosition.z = props.carMesh.current!.position.z + Math.cos(props.carMesh.current!.rotation.y) * cameraDistance
    }
    if (carRotation > 90 && carRotation < 180) {
      newCameraPosition.z = props.carMesh.current!.position.z - Math.cos(props.carMesh.current!.rotation.y) * cameraDistance
    }
    if (carRotation < 360 || carRotation > 180) {
      newCameraPosition.x = props.carMesh.current!.position.x + Math.sin(props.carMesh.current!.rotation.y) * cameraDistance
    }
    if (carRotation > 0 && carRotation < 180) {
      newCameraPosition.x = props.carMesh.current!.position.x - Math.sin(props.carMesh.current!.rotation.y) * cameraDistance
    }
    camera.position.x = newCameraPosition.x
    camera.position.y = newCameraPosition.y
    camera.position.z = newCameraPosition.z
    camera.lookAt(props.carMesh.current!.position.x, props.carMesh.current!.position.y, props.carMesh.current!.position.z)
  })
  return null
}

export default CameraController