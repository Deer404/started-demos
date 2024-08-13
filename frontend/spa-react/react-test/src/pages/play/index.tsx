import { useState, useCallback, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { SteveRightHandModel } from "@/components/models/steve-right-hand";
import { VillagerModel } from "@/components/models/villager";
import { Euler, Group, Vector3 } from "three";

function FirstPersonCamera({ position, moveSpeed = 0.1 }) {
  const { camera } = useThree();
  const moveDirection = useRef(new Vector3());
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e) =>
      setKeys((keys) => ({ ...keys, [e.key.toLowerCase()]: true }));
    const handleKeyUp = (e) =>
      setKeys((keys) => ({ ...keys, [e.key.toLowerCase()]: false }));

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
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

    camera.position.add(direction);
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

  useEffect(() => {
    initialCameraQuaternionRef.current = camera.quaternion.clone();
  }, []);

  useFrame(() => {
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

      rightHandRef.current.rotation.copy(rightHandRotation);
    }
  });

  return (
    <group ref={rightHandRef} scale={[0.5, 0.5, 0.5]}>
      <SteveRightHandModel
        onVillagerClick={() => console.log("Hand clicked")}
      />
    </group>
  );
}

export default function McPage() {
  const [showPanel, setShowPanel] = useState(false);

  const handleVillagerClick = useCallback(() => {
    console.log("handleVillagerClick called");
    setShowPanel((prev) => !prev);
  }, []);

  const handleCanvasClick = useCallback((event) => {
    if (event.button === 2) {
      console.log("Right click detected on canvas");
      setShowPanel((prev) => !prev);
    }
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
      <Canvas
        onContextMenu={(e) => e.preventDefault()}
        onClick={handleCanvasClick}
      >
        <Suspense fallback={null}>
          <FirstPersonCamera position={[0, 0, 5]} />
          <VillagerModel onVillagerClick={handleVillagerClick} />
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
          <h2>村民信息</h2>
          <p>这里可以显示村民的详细信息或者交互选项</p>
          <button onClick={() => setShowPanel(false)}>关闭</button>
        </div>
      )}
    </div>
  );
}
