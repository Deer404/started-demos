import React, { useState, useCallback, useRef } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Scene = ({ onVillagerClick }) => {
  const fbx = useLoader(FBXLoader, "source/villager.fbx");
  const colorMap = useLoader(TextureLoader, "textures/villager_farmer.png");
  const opacityMap = useLoader(TextureLoader, "textures/villager_opacity.png");
  const villagerRef = useRef();
  const { camera, raycaster } = useThree();

  useEffect(() => {
    [colorMap, opacityMap].forEach((texture) => {
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
    });
    fbx.traverse((child) => {
      if (child.isMesh) {
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

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(villagerRef.current, true);
    villagerRef.current.scale.set(
      intersects.length > 0 ? 0.055 : 0.05,
      intersects.length > 0 ? 0.055 : 0.05,
      intersects.length > 0 ? 0.055 : 0.05
    );
  });

  const handleClick = useCallback(
    (event) => {
      if (event.button === 2) {
        // 右键点击
        console.log("右键点击");
        event.stopPropagation();
        onVillagerClick();
      }
    },
    [onVillagerClick]
  );

  return (
    <primitive
      ref={villagerRef}
      object={fbx}
      scale={0.05}
      onClick={handleClick}
    />
  );
};

export default function LoaderPage() {
  const [showPanel, setShowPanel] = useState(false);

  const handleVillagerClick = useCallback(() => {
    setShowPanel((prev) => !prev);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Canvas onContextMenu={(e) => e.preventDefault()}>
        <Suspense fallback={null}>
          <Scene onVillagerClick={handleVillagerClick} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      {showPanel && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <h2>村民信息</h2>
          <p>这里可以显示村民的详细信息或者交互选项</p>
          <button onClick={() => setShowPanel(false)}>关闭</button>
        </div>
      )}
    </div>
  );
}
