import { useLoader } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { NearestFilter, MeshStandardMaterial } from "three";
import { IObject3D } from "../../libs/constant";

type SteveModelProps = {
  onVillagerClick: () => void;
};

export const SteveModel = ({ onVillagerClick }: SteveModelProps) => {
  const fbx = useLoader(FBXLoader, "source/steve.fbx");
  const colorMap = useLoader(TextureLoader, "textures/steve.png");
  const villagerRef = useRef();

  useEffect(() => {
    [colorMap].forEach((texture) => {
      texture.magFilter = NearestFilter;
      texture.minFilter = NearestFilter;
      texture.generateMipmaps = false;
    });
    fbx.traverse((child) => {
      if ((child as IObject3D).isMesh) {
        console.log("child:", child);
        const material = new MeshStandardMaterial({
          map: colorMap,
          transparent: true,
          alphaTest: 0.5,
        });
        (child as IObject3D).material = material;
      }
    });
  }, [fbx, colorMap]);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (event.button === 2) {
        // 右键点击
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
      scale={0.1}
      onClick={handleClick}
      onContextMenu={(e: MouseEvent) => {
        handleClick(e);
      }}
    />
  );
};
