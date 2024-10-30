"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";

function EffectTransition() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    //@ts-ignore
    if (document.startViewTransition) {
      //@ts-ignore
      document.startViewTransition(() => {
        setIsLarge((prev) => !prev);
      });
    } else {
      setIsLarge((prev) => !prev);
    }
  }, []);

  return (
    <div>
      <h2>useEffect Transition</h2>
      <button onClick={() => setIsLarge((prev) => !prev)}>Toggle Size</button>
      <div
        style={{
          width: isLarge ? "300px" : "100px",
          height: isLarge ? "300px" : "100px",
          backgroundColor: isLarge ? "blue" : "red",
          transition: "all 1s",
        }}
      />
    </div>
  );
}

function LayoutEffectTransition() {
  const [isLarge, setIsLarge] = useState(false);

  useLayoutEffect(() => {
    //@ts-ignore
    if (document.startViewTransition) {
      //@ts-ignore
      document.startViewTransition(() => {
        setIsLarge((prev) => !prev);
      });
    } else {
      setIsLarge((prev) => !prev);
    }
  }, []);

  return (
    <div>
      <h2>useLayoutEffect Transition</h2>
      <button onClick={() => setIsLarge((prev) => !prev)}>Toggle Size</button>
      <div
        style={{
          width: isLarge ? "300px" : "100px",
          height: isLarge ? "300px" : "100px",
          backgroundColor: isLarge ? "blue" : "red",
          transition: "all 1s",
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div>
      <EffectTransition />
      <hr />
      <LayoutEffectTransition />
    </div>
  );
}
