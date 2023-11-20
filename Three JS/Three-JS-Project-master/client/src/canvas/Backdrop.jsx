import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Shadow } from '@react-three/drei'

const Backdrop = () => {
  const shadows = useRef()

  useFrame(({ camera }) => {
    // Make the shadows follow the camera
    shadows.current.lookAt(camera.position)
  })

  return (
    <>
      {/* White Background Plane */}
      <Plane args={[100, 100]} position={[0, 0, -1]} rotation={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#fff" />
      </Plane>

      {/* Shadows */}
      <Shadow ref={shadows}>
        <spotLight
          intensity={1}
          angle={Math.PI / 4}
          penumbra={1}
          position={[0, 0, 0]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      </Shadow>
    </>
  )
}

export default Backdrop
