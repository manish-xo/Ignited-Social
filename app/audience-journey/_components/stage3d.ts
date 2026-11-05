import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type PropKind =
  | "heart"
  | "pin"
  | "magnifier"
  | "plus"
  | "check"
  | "bubble"
  | "bubbleTint"
  | "confettiA"
  | "confettiB"
  | "confettiC";

export interface Stage3D {
  /** Adds a prop at scale 0, so the timeline decides when it pops in. */
  spawn(kind: PropKind): THREE.Group;
  clear(): void;
  resize(px: number, py: number, logicalW: number, logicalH: number): void;
  render(seconds: number): void;
  dispose(): void;
}

const glossy = (color: string, extra: THREE.MeshPhysicalMaterialParameters = {}) =>
  new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.18,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    ...extra,
  });

function heartGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, -1);
  s.bezierCurveTo(-0.2, -0.75, -1.1, -0.2, -1.1, 0.35);
  s.bezierCurveTo(-1.1, 0.85, -0.7, 1.05, -0.45, 1.05);
  s.bezierCurveTo(-0.2, 1.05, 0, 0.85, 0, 0.6);
  s.bezierCurveTo(0, 0.85, 0.2, 1.05, 0.45, 1.05);
  s.bezierCurveTo(0.7, 1.05, 1.1, 0.85, 1.1, 0.35);
  s.bezierCurveTo(1.1, -0.2, 0.2, -0.75, 0, -1);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.3,
    bevelEnabled: true,
    bevelSize: 0.2,
    bevelThickness: 0.22,
    bevelSegments: 8,
    curveSegments: 24,
  });
  g.center();
  return g;
}

/** Every prop is built here from three.js primitives, so nothing needs a licence. */
function buildLibrary() {
  const action = glossy("#5a4ce0");
  const white = glossy("#ffffff");
  const red = glossy("#f4163f");
  const green = glossy("#128a4c");
  const capsule = new THREE.CapsuleGeometry(0.26, 1.3, 8, 20);
  const heart = heartGeometry();
  const sphere = new THREE.SphereGeometry(1, 32, 24);
  const chip = new THREE.BoxGeometry(1.5, 0.9, 0.22);

  const makers: Record<PropKind, () => THREE.Object3D> = {
    heart: () => new THREE.Mesh(heart, red),
    pin: () => {
      const g = new THREE.Group();
      const head = new THREE.Mesh(sphere, action);
      head.position.y = 0.55;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.87, 1.45, 32), action);
      tip.rotation.x = Math.PI;
      tip.position.y = -0.55;
      const dot = new THREE.Mesh(sphere, white);
      dot.scale.setScalar(0.38);
      dot.position.set(0, 0.6, 0.72);
      g.add(head, tip, dot);
      return g;
    },
    magnifier: () => {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.17, 20, 56), action);
      const glass = new THREE.Mesh(
        new THREE.CircleGeometry(0.82, 40),
        new THREE.MeshPhysicalMaterial({
          color: "#ffffff",
          transparent: true,
          opacity: 0.22,
          roughness: 0.02,
          clearcoat: 1,
        }),
      );
      const handle = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.95, 8, 20), glossy("#221f1b"));
      handle.position.set(1.08, -1.08, 0);
      handle.rotation.z = Math.PI / 4;
      g.add(ring, glass, handle);
      return g;
    },
    plus: () => {
      const g = new THREE.Group();
      const a = new THREE.Mesh(capsule, action);
      const b = new THREE.Mesh(capsule, action);
      b.rotation.z = Math.PI / 2;
      g.add(a, b);
      return g;
    },
    check: () => {
      const g = new THREE.Group();
      const coin = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.3, 56), green);
      coin.rotation.x = Math.PI / 2;
      const tick = new THREE.Mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(
            [
              new THREE.Vector3(-0.42, 0.02, 0.2),
              new THREE.Vector3(-0.12, -0.3, 0.2),
              new THREE.Vector3(0.46, 0.34, 0.2),
            ],
            false,
            "catmullrom",
            0.02,
          ),
          24,
          0.12,
          12,
        ),
        white,
      );
      g.add(coin, tick);
      return g;
    },
    bubble: () =>
      new THREE.Mesh(sphere, glossy("#7e73e7", { transparent: true, opacity: 0.72, roughness: 0.05 })),
    bubbleTint: () =>
      new THREE.Mesh(sphere, glossy("#dad6f2", { transparent: true, opacity: 0.85, roughness: 0.05 })),
    confettiA: () => new THREE.Mesh(chip, action),
    confettiB: () => new THREE.Mesh(chip, glossy("#ff5a7a")),
    confettiC: () => new THREE.Mesh(chip, glossy("#ffc24b")),
  };
  return makers;
}

/** Page still works without WebGL: the props simply never get drawn. */
export function createStage3D(canvas: HTMLCanvasElement): Stage3D {
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    // Neutral keeps brand colours true; filmic mapping washed the reds out.
    renderer.toneMapping = THREE.NeutralToneMapping;
  } catch {
    renderer = null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-260, 260, 340, -340, 1, 2000);
  camera.position.z = 800;

  let environment: THREE.Texture | null = null;
  if (renderer) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 0.5;
    pmrem.dispose();
  }
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(-200, 300, 500);
  scene.add(sun);

  const props = new THREE.Group();
  scene.add(props);
  const makers = buildLibrary();

  return {
    spawn(kind) {
      const outer = new THREE.Group();
      const inner = makers[kind]();
      inner.userData.phase = Math.random() * Math.PI * 2;
      inner.userData.tumble = kind.startsWith("confetti");
      outer.add(inner);
      outer.scale.setScalar(0);
      props.add(outer);
      return outer;
    },
    clear() {
      props.clear();
    },
    resize(px, py, logicalW, logicalH) {
      if (!renderer) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(px, py, false);
      camera.left = -logicalW / 2;
      camera.right = logicalW / 2;
      camera.top = logicalH / 2;
      camera.bottom = -logicalH / 2;
      camera.updateProjectionMatrix();
    },
    render(seconds) {
      if (!renderer) return;
      // A small idle wobble keeps resting props feeling soft and alive.
      for (const outer of props.children) {
        const inner = outer.children[0];
        if (!inner) continue;
        const p = inner.userData.phase as number;
        if (inner.userData.tumble) {
          inner.rotation.x = seconds * 3 + p;
          inner.rotation.y = seconds * 4 + p;
        } else {
          inner.rotation.y = Math.sin(seconds * 1.6 + p) * 0.4;
          inner.rotation.x = Math.cos(seconds * 1.2 + p) * 0.14;
        }
      }
      renderer.render(scene, camera);
    },
    dispose() {
      props.clear();
      environment?.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
      });
      renderer?.dispose();
    },
  };
}
