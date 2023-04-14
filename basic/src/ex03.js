import * as THREE from "three";

//subject: 배경색상
const example = () => {
  const $canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: $canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  //배경 색상 관련 renderer에 하는 방법
  renderer.setClearColor(0x00ff00);
  renderer.setClearAlpha(0.5);

  //scene 배경 색상 관련 설정하는 방법 (scene이 renderer보다 위에 있음)
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue");
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 1;

  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
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
