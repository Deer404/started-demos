import { useLoader } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { NearestFilter, MeshStandardMaterial } from "three";
import { IObject3D } from "../../libs/constant";

export const SteveRightHandModel = ({
  onVillagerClick,
}: {
  onVillagerClick: () => void;
}) => {
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
        console.log("child:", child); // 打印每个子节点

        // 只设置右手部分的材质
        if (child.name === "right_arm" || child.name === "right_sleve") {
          const material = new MeshStandardMaterial({
            map: colorMap,
            transparent: true,
            opacity: 1, // 确保不透明
            alphaTest: 0.5,
          });
          (child as IObject3D).material = material;
        } else {
          // 隐藏其他部分
          (child as IObject3D).visible = false;
        }
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
    <group
      position={[2, -1, 0]}
      rotation={[2, 0, 0]}
      scale={[0.02, 0.02, 0.02]}
    >
      <primitive
        ref={villagerRef}
        object={fbx}
        onClick={handleClick}
        onContextMenu={(e: MouseEvent) => {
          handleClick(e);
        }}
      />
    </group>
  );
};
