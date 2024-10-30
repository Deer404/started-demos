import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { VillageModel } from "@/components/models/village";

export default function McPage() {
  const [showPanel, setShowPanel] = useState(false);

  console.log("showPanel:", showPanel);

  const handleCanvasClick = useCallback((event) => {
    if (event.button === 2) {
      console.log("Right click detected on canvas");
      setShowPanel((prev) => !prev);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <Canvas
        onContextMenu={(e) => e.preventDefault()}
        onClick={handleCanvasClick}
        gl={{
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <VillageModel />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
