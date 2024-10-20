import type { MutableRefObject } from "react";

import { useEffect, useRef } from "react";
import {
  PerspectiveCamera,
  WebGLRenderer,
  LinearToneMapping,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
} from "three";
import {
  RenderPass,
  EffectComposer,
  UnrealBloomPass,
  SMAAPass,
} from "three/examples/jsm/Addons.js";

function resizeCallback(
  canvas: HTMLCanvasElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer | EffectComposer
) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

function initRenderer(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  rendererRef: MutableRefObject<WebGLRenderer | null>,
  cameraRef: MutableRefObject<PerspectiveCamera | null>
) {
  if (canvasRef.current === null) return;

  rendererRef.current = new WebGLRenderer({
    canvas: canvasRef.current,
    antialias: true,
  });

  cameraRef.current = new PerspectiveCamera(
    60,
    canvasRef.current.clientWidth / canvasRef.current.clientHeight,
    0.1,
    1000
  );

  const canvas = canvasRef.current;
  const renderer = rendererRef.current;
  const camera = cameraRef.current;

  renderer.toneMapping = LinearToneMapping;
  renderer.toneMappingExposure = 0.2;

  camera.position.z = 5;

  resizeCallback(canvas, camera, renderer);
}

function initScene(sceneRef: MutableRefObject<Scene | null>) {
  sceneRef.current = new Scene();

  const scene = sceneRef.current;

  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0xadffb0 });
  const cube = new Mesh(geometry, material);

  const cube1 = cube.clone(),
    cube2 = cube.clone(),
    cube3 = cube.clone();

  cube1.name = "cube1";
  cube2.name = "cube2";
  cube3.name = "cube3";

  cube2.position.x = -2;
  cube2.position.y = 2;
  cube2.position.z = -6;

  cube3.position.x = 2;
  cube3.position.y = -2;
  cube3.position.z = -6;

  scene.add(cube1, cube2, cube3);
}

function initComposer(
  composer: MutableRefObject<EffectComposer | null>,
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) {
  composer.current = new EffectComposer(renderer);

  const scenePass = new RenderPass(scene, camera);
  composer.current.addPass(scenePass);

  const smaaPass = new SMAAPass(
    renderer.domElement.clientWidth,
    renderer.domElement.clientHeight
  );
  composer.current.addPass(smaaPass);

  const bloomPass = new UnrealBloomPass(
    new Vector2(
      renderer.domElement.clientWidth,
      renderer.domElement.clientHeight
    ),
    0.5,
    1,
    0
  );
  composer.current.addPass(bloomPass);
}

function render(
  animation: (delta: number) => void,
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
): void;
function render(
  animation: (delta: number) => void,
  scene: Scene,
  camera: PerspectiveCamera,
  composer: EffectComposer
): void;
function render(
  animation: (delta: number) => void,
  scene: Scene,
  camera: PerspectiveCamera,
  rendererClass: WebGLRenderer | EffectComposer
) {
  let elapsed = 0;

  const animate: FrameRequestCallback = (time) => {
    const delta = (time - elapsed) / 1000;
    elapsed = time;

    animation(delta);

    if (rendererClass instanceof WebGLRenderer) {
      rendererClass.render(scene, camera);
    } else {
      rendererClass.render();
    }
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

export default function MainScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sceneRef = useRef<Scene | null>(null);

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
      if (composerRef.current === null) {
        initComposer(
          composerRef,
          sceneRef.current,
          cameraRef.current,
          rendererRef.current
        );
      }

      const canvas = canvasRef.current!;
      const renderer = rendererRef.current!;
      const scene = sceneRef.current!;
      const camera = cameraRef.current!;
      const composer = composerRef.current!;

      const cube1 = scene.getObjectByName("cube1");
      const cube2 = scene.getObjectByName("cube2");
      const cube3 = scene.getObjectByName("cube3");

      var animation = (delta: number) => {};

      if (cube1 && cube2 && cube3) {
        const multiplier = 0.1;
        animation = (delta) => {
          const rot = delta * multiplier;
          cube1.rotation.x += rot;
          cube1.rotation.y += rot;

          cube2.rotation.x -= rot;
          cube2.rotation.y -= rot;

          cube3.rotation.x -= rot;
          cube3.rotation.y -= rot;
        };
      }

      render(
        animation,
        sceneRef.current,
        cameraRef.current,
        composerRef.current!
        // rendererRef.current
      );

      const resize = () => {
        resizeCallback(canvas, camera, renderer);
        resizeCallback(canvas, camera, composer);
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
