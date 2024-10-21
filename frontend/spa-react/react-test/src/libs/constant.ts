import { MeshStandardMaterial, Object3D } from "three";

export type IObject3D = Object3D & {
  isMesh: boolean;
  material: MeshStandardMaterial;
};
