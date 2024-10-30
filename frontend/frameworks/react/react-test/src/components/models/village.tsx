import { usePlayStore } from "@/store/playStore";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Box3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
type bounds = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};
export const VillageModel = () => {
  const gltf = useLoader(GLTFLoader, "source/village/village.glb");
  const setMapBounds = usePlayStore((state) => state.setMapBounds);
  useEffect(() => {
    // 计算地图的边界范围
    const boundingBox = new Box3().setFromObject(gltf.scene);
    const bounds = {
      minX: boundingBox.min.x,
      maxX: boundingBox.max.x,
      minZ: boundingBox.min.z,
      maxZ: boundingBox.max.z,
    };
    setMapBounds(bounds);
  }, [gltf]);

  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  );
};
