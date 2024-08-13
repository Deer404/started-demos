import { useState, useCallback, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { SteveRightHandModel } from "@/components/models/steve-right-hand";
import { VillagerModel } from "@/components/models/villager";
import { Euler, Group, Quaternion, Raycaster, Vector3 } from "three";
import { VillageModel } from "@/components/models/village";
import * as CANNON from "cannon";
import { MapBounds, usePlayStore } from "@/store/playStore";
// 地图地面 y 轴位置 2.5
const initVillagerPositon = [12, 2.5, 10] as const;
const initPositon = [12, 2.5, 12] as const;
interface FirstPersonCameraProps {
  position: [number, number, number];
  moveSpeed?: number;
  allowContinuousJump?: boolean;
  minHeight?: number;
  mapBounds: MapBounds;
}

function FirstPersonCamera({
  position,
  moveSpeed = 3,
  allowContinuousJump = false,
  minHeight = 2.5,
  mapBounds,
}: FirstPersonCameraProps) {
  const { camera, scene } = useThree();
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    " ": false,
  });
  const [_, setJump] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [world] = useState(() => new CANNON.World());
  const [body] = useState(
    () =>
      new CANNON.Body({
        mass: 1,
        shape: new CANNON.Sphere(0.5),
        position: new CANNON.Vec3(...position),
      })
  );
  const raycaster = useRef(new Raycaster());
  const lastUpdateTimeRef = useRef(performance.now());

  useEffect(() => {
    world.addBody(body);
    body.linearDamping = 0.9; // 添加阻尼以模拟摩擦力
    world.gravity.set(0, -9.82, 0); // 设置重力加速度

    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((keys) => ({ ...keys, [e.key.toLowerCase()]: true }));
      if (e.key === " " && canJump) {
        // 直接访问 canJump 的值
        setJump(true);
        body.velocity.y = 5; // 设置跳跃初速度
        if (!allowContinuousJump) {
          setCanJump(false);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((keys) => ({ ...keys, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 切换到其他标签页时,记录当前时间戳
        lastUpdateTimeRef.current = performance.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [allowContinuousJump]);

  useFrame((_, delta) => {
    const currentTime = performance.now();
    const timeDiff = currentTime - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = currentTime;

    // 根据时间差调整物理引擎的更新步长
    const adjustedDelta = Math.min(timeDiff / 1000, 0.1);
    world.step(adjustedDelta);

    const frontVector = new Vector3(0, 0, -1);
    const sideVector = new Vector3(-1, 0, 0);
    const direction = new Vector3();

    frontVector.applyQuaternion(camera.quaternion);
    sideVector.applyQuaternion(camera.quaternion);

    direction.set(0, 0, 0);
    if (keys.w) direction.add(frontVector);
    if (keys.s) direction.sub(frontVector);
    if (keys.a) direction.add(sideVector);
    if (keys.d) direction.sub(sideVector);

    direction.normalize().multiplyScalar(moveSpeed);

    // 碰撞检测
    raycaster.current.set(camera.position, direction);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0 && intersects[0].distance < 0.5) {
      // 如果相机前方 0.5 个单位内有障碍物,则不移动
      direction.set(0, 0, 0);
    }

    body.velocity.x = direction.x;
    body.velocity.z = direction.z;

    camera.position.copy(body.position as any);

    // 检查相机下方是否有表面
    raycaster.current.set(camera.position, new Vector3(0, -1, 0));
    const intersectsBelow = raycaster.current.intersectObjects(
      scene.children,
      true
    );
    if (intersectsBelow.length > 0 && intersectsBelow[0].distance < 0.5) {
      // 如果相机下方 0.5 个单位内有表面,将相机位置设置为表面上方 0.5 个单位处
      camera.position.y = intersectsBelow[0].point.y + 0.5;
      body.position.copy(camera.position as any);
      body.velocity.y = 0;
      setJump(false);
      setCanJump(true); // 将 setCanJump 调用移到 setJump 之后
    }

    // 限制相机的最低高度
    if (camera.position.y < minHeight) {
      camera.position.y = minHeight;
      body.position.copy(camera.position as any);
      body.velocity.y = 0;
    }

    // 限制相机在地图范围内移动
    if (mapBounds.minX !== undefined && mapBounds.maxX !== undefined) {
      camera.position.x = Math.min(
        Math.max(camera.position.x, mapBounds.minX),
        mapBounds.maxX
      );
    }
    if (mapBounds.minZ !== undefined && mapBounds.maxZ !== undefined) {
      camera.position.z = Math.min(
        Math.max(camera.position.z, mapBounds.minZ),
        mapBounds.maxZ
      );
    }
    body.position.copy(camera.position as any);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={position} />
      <PointerLockControls />
    </>
  );
}

function RightHandModel() {
  const { camera } = useThree();
  const rightHandRef = useRef<Group>();
  const initialCameraQuaternionRef = useRef<Quaternion>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStartTime, setAnimationStartTime] = useState(0);

  useEffect(() => {
    initialCameraQuaternionRef.current = camera.quaternion.clone();
  }, []);

  useFrame((state) => {
    if (rightHandRef.current && initialCameraQuaternionRef.current) {
      const rightHandPosition = new Vector3(0.15, -0.45, -0.55);
      rightHandPosition.applyQuaternion(camera.quaternion);
      rightHandPosition.add(camera.position);

      rightHandRef.current.position.copy(rightHandPosition);

      const inverseInitialCameraQuaternion = initialCameraQuaternionRef.current
        .clone()
        .invert();
      const deltaQuaternion = camera.quaternion
        .clone()
        .multiply(inverseInitialCameraQuaternion);

      const rightHandRotation = new Euler().setFromQuaternion(
        deltaQuaternion,
        "YXZ"
      );
      rightHandRotation.x += Math.PI / 2;
      rightHandRotation.z += Math.PI / 0.5;

      if (isAnimating) {
        const elapsedTime = state.clock.getElapsedTime() - animationStartTime;
        const swingAngle = Math.sin(elapsedTime * 10) * 0.1; // 调整摆动速度和幅度
        rightHandRotation.x += swingAngle;

        if (elapsedTime >= 0.5) {
          setIsAnimating(false);
        }
      }

      rightHandRef.current.rotation.copy(rightHandRotation);
    }
  });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 2) {
        setIsAnimating(true);
        setAnimationStartTime(performance.now() / 1000);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 2) {
        setIsAnimating(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <group ref={rightHandRef as any} scale={[0.5, 0.5, 0.5]}>
      <SteveRightHandModel />
    </group>
  );
}

export default function McPage() {
  const [showPanel, setShowPanel] = useState(false);

  const handleVillagerClick = useCallback(() => {
    console.log("handleVillagerClick called");
    setShowPanel((prev) => !prev);
  }, []);

  const mapBounds = usePlayStore((state) => state.mapBounds);

  const handleCanvasClick = useCallback((event) => {
    if (event.button === 2) {
      console.log("Right click detected on canvas");
      setShowPanel((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "q") {
        setShowPanel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <Canvas
        onContextMenu={(e) => e.preventDefault()}
        onClick={handleCanvasClick}
      >
        <Suspense fallback={null}>
          <VillageModel />
          <FirstPersonCamera
            position={initPositon as [number, number, number]}
            mapBounds={
              mapBounds ?? {
                minX: 0,
                maxX: 24,
                minZ: 0,
                maxZ: 24,
              }
            }
          />
          <VillagerModel
            onVillagerClick={handleVillagerClick}
            position={initVillagerPositon as [number, number, number]}
          />
          <RightHandModel />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
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
            zIndex: 1000,
          }}
        >
          <h2>神秘村民👁️‍🗨️</h2>
          <p>"或许你是第一个到达这个大陆的人"</p>
          <p>按下 Q 键可以关闭面板</p>
        </div>
      )}
    </div>
  );
}
