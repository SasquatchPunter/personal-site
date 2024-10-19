import { MutableRefObject, useEffect, useRef } from "react";
import * as THREE from "three";

function resizeCallback(
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

function initRenderer(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  rendererRef: MutableRefObject<THREE.WebGLRenderer | null>,
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>
) {
  if (canvasRef.current === null) return;

  rendererRef.current = new THREE.WebGLRenderer({
    canvas: canvasRef.current,
    antialias: true,
  });

  cameraRef.current = new THREE.PerspectiveCamera(
    60,
    canvasRef.current.clientWidth / canvasRef.current.clientHeight,
    0.1,
    1000
  );

  const canvas = canvasRef.current;
  const renderer = rendererRef.current;
  const camera = cameraRef.current;

  camera.position.z = 5;

  resizeCallback(canvas, camera, renderer);
}

function initScene(sceneRef: MutableRefObject<THREE.Scene | null>) {
  sceneRef.current = new THREE.Scene();

  const scene = sceneRef.current;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xadffb0 });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = "cube";

  scene.add(cube);
}

function render(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  callback: () => void
) {
  const animate = () => {
    callback();
    renderer.render(scene, camera);
  };
  renderer.setAnimationLoop(animate);
}

export default function MainScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!rendererRef.current && canvasRef.current) {
      initRenderer(canvasRef, rendererRef, cameraRef);
    }

    if (sceneRef.current === null) {
      initScene(sceneRef);
    }

    if (
      canvasRef.current &&
      rendererRef.current &&
      sceneRef.current &&
      cameraRef.current
    ) {
      const canvas = canvasRef.current!;
      const renderer = rendererRef.current!;
      const scene = sceneRef.current!;
      const camera = cameraRef.current!;

      const cube = scene.getObjectByName("cube");

      if (cube) {
        render(rendererRef.current, sceneRef.current, cameraRef.current, () => {
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
        });
      }

      const resize = () => {
        resizeCallback(canvas, camera, renderer);
      };

      window.addEventListener("resize", resize);

      return () => {
        window.removeEventListener("resize", resize);
        renderer.setAnimationLoop(null);
      };
    }
  }, []);

  return (
    <canvas
      className="absolute w-full h-full top-0 left-0 -z-10"
      ref={canvasRef}
    />
  );
}
