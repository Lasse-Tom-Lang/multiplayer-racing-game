import { MeshProps, useThree, useFrame } from "@react-three/fiber"
import { MutableRefObject } from "react"

interface CameraControllerProps {
  carMesh: MutableRefObject<MeshProps | undefined>
}

const CameraController: React.FC<CameraControllerProps> = (props) => {
  const cameraDistance = 4
  const {camera} = useThree()
  useFrame((state, deltaTime) => {
    let newCameraPosition = {x: 0, y: 0, z: 0, r: 0}
    newCameraPosition.y = props.carMesh.current!.position.y + cameraDistance
    newCameraPosition.r = props.carMesh.current!.rotation.y
    if (props.carMesh.current!.rotation.y < 90 * (Math.PI / 180) || props.carMesh.current!.rotation.y > 270 * (Math.PI / 180)) {
      newCameraPosition.z = props.carMesh.current!.position.z + Math.cos(props.carMesh.current!.rotation.y) * cameraDistance
    }
    if (props.carMesh.current!.rotation.y > 90 * (Math.PI / 180) && props.carMesh.current!.rotation.y < 180 * (Math.PI / 180)) {
      newCameraPosition.z = props.carMesh.current!.position.z - Math.cos(props.carMesh.current!.rotation.y) * cameraDistance
    }
    if (props.carMesh.current!.rotation.y < 360 * (Math.PI / 180) || props.carMesh.current!.rotation.y > 180 * (Math.PI / 180)) {
      newCameraPosition.x = props.carMesh.current!.position.x + Math.sin(props.carMesh.current!.rotation.y) * cameraDistance
    }
    if (props.carMesh.current!.rotation.y > 0 * (Math.PI / 180) && props.carMesh.current!.rotation.y < 180 * (Math.PI / 180)) {
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