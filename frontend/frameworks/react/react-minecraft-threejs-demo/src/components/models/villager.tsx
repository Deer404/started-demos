import { useLoader } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { NearestFilter, MeshStandardMaterial } from "three";
import { IObject3D } from "../../libs/constant";

type VillagerModelProps = {
  onVillagerClick?: () => void;
  position?: [number, number, number] | undefined;
  scale?: number;
};

export const VillagerModel = ({
  onVillagerClick,
  position = undefined,
  scale = 0.02,
}: VillagerModelProps) => {
  const fbx = useLoader(FBXLoader, "source/villager.fbx");
  const colorMap = useLoader(TextureLoader, "textures/villager_farmer.png");
  const opacityMap = useLoader(TextureLoader, "textures/villager_opacity.png");
  const villagerRef = useRef();

  useEffect(() => {
    [colorMap, opacityMap].forEach((texture) => {
      texture.magFilter = NearestFilter;
      texture.minFilter = NearestFilter;
      texture.generateMipmaps = false;
    });
    fbx.traverse((child) => {
      if ((child as IObject3D).isMesh) {
        const material = new MeshStandardMaterial({
          map: colorMap,
          transparent: true,
          alphaMap: opacityMap,
          alphaTest: 0.5,
        });
        (child as IObject3D).material = material;
      }
    });
  }, [fbx, colorMap, opacityMap]);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (event.button === 2) {
        // 右键点击
        event.stopPropagation();
        onVillagerClick?.();
      }
    },
    [onVillagerClick]
  );

  return (
    <group position={position}>
      <primitive
        ref={villagerRef}
        object={fbx}
        scale={scale}
        onClick={handleClick}
        onContextMenu={(e: MouseEvent) => {
          handleClick(e);
        }}
      />
    </group>
  );
};
