import * as THREE from "three";

//subject: 빛 기본

const example = () => {
  const $canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: $canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 2;

  scene.add(camera);
  // 빛 세팅
  //DirectionalLight 태양처럼 멀리서 전체적으로 비춤 (색상, 빛의 강도0~100)
  const light = new THREE.DirectionalLight(0xffffff, 0.4);
  light.position.z = 2;
  light.position.x = 1;

  //빛은 여러개 add할수있으나 성능에 영향을 미침
  scene.add(light);
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  //MeshBasicMaterial은 빛에 반응을 하지않음
  //   const material = new THREE.MeshBasicMaterial({
  //     color: "#ff0000",
  //   });

  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  renderer.render(scene, camera);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });
};

export default example;
