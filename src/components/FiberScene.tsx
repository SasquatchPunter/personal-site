import { Canvas, MeshProps } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";
import useCursorContext from "@/src/hooks/useCursorContext";

interface BoxProps {
  dimensions?: [width: number, height: number, depth: number];
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
  onPointerEnter?: MeshProps["onPointerEnter"];
  onPointerLeave?: MeshProps["onPointerLeave"];
}
function Box({
  dimensions = [0, 0, 0],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onPointerEnter,
  onPointerLeave,
}: BoxProps) {
  const [hover, setHover] = useState(false);
  return (
    <mesh
      rotation={rotation}
      position={position}
      onPointerEnter={(e) => {
        setHover(true);
        if (onPointerEnter) onPointerEnter(e);
      }}
      onPointerLeave={(e) => {
        setHover(false);
        if (onPointerLeave) onPointerLeave(e);
      }}
    >
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={hover ? 0x00ffff : 0xadffb0} />
    </mesh>
  );
}

export default function FiberScene() {
  const { actions } = useCursorContext();
  return (
    <div className="absolute w-full h-full top-0 left-0 -z-10">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 10], fov: 90 }}>
        <ambientLight />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Box
          dimensions={[2, 2, 2]}
          position={[-3, 0, 0]}
          rotation={[0, 20, 0]}
          onPointerEnter={actions.activate}
          onPointerLeave={actions.deactivate}
        />
        <Box
          dimensions={[2, 2, 2]}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          onPointerEnter={actions.activate}
          onPointerLeave={actions.deactivate}
        />
        <Box
          dimensions={[2, 2, 2]}
          position={[3, 0, 0]}
          rotation={[0, -20, 0]}
          onPointerEnter={actions.activate}
          onPointerLeave={actions.deactivate}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
