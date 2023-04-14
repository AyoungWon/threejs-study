import * as THREE from "three";
import gsap from "gsap";
//subject: 라이브러리 애니메이션
const example = () => {
  const $canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: $canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  //안개는 scene에 넣으면됨. 진짜 안개가 아니고 그라데이션으로 색상이 들어감 (색상, near, far)
  // scene.fog = new THREE.Fog("blue", 3, 7);
  //안개 색상을 배경과 맞추게되면 점점 안보이게됨
  scene.fog = new THREE.Fog("black", 3, 7);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;
  camera.position.y = 1;

  scene.add(camera);
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.z = 5;
  light.position.y = 3;
  light.position.x = 1;

  //빛은 여러개 add할수있으나 성능에 영향을 미침
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const draw = () => {
    renderer.render(scene, camera);

    renderer.setAnimationLoop(draw);
  };

  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });
  draw();
};

export default example;
