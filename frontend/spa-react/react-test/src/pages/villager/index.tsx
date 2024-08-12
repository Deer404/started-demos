import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import { VillagerModel } from "@/components/models/villager";

export default function McPage() {
  const [showPanel, setShowPanel] = useState(false);

  const handleVillagerClick = useCallback(() => {
    console.log("handleVillagerClick called");
    setShowPanel((prev) => !prev);
  }, []);

  console.log("showPanel:", showPanel);

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
          <VillagerModel onVillagerClick={handleVillagerClick} />
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
