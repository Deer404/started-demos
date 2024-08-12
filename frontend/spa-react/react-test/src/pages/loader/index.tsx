import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
const Scene = () => {
  const fbx = useLoader(FBXLoader, "source/villager.fbx");
  const colorMap = useLoader(TextureLoader, "textures/villager_farmer.png");
  const opacityMap = useLoader(TextureLoader, "textures/villager_opacity.png");

  useEffect(() => {
    [colorMap, opacityMap].forEach((texture) => {
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
    });
    fbx.traverse((child) => {
      if (child.isMesh) {
        // 创建一个新的材质
        const material = new THREE.MeshStandardMaterial({
          map: colorMap,
          transparent: true,
          alphaMap: opacityMap,
          alphaTest: 0.5,
        });
        child.material = material;
      }
    });
  }, [fbx, colorMap, opacityMap]);

  return <primitive object={fbx} scale={0.05} />;
};
export default function LoaderPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}