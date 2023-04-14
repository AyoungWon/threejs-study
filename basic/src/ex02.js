import * as THREE from "three";
//subject: resize
const example = () => {
  const $canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: $canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  //여기에 찍힌 값이 픽셀밀도, 픽셀밀도가2라면, 100px 이미지를 표현하기위해 200px이미지를 사용하여 반으로 줄여서 보여줌
  //고해상도를 위한 것. three.js에서 잊지말자
  //   console.log(window.devicePixelRatio);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  const scene = new THREE.Scene();

  // OrthographicCamera
  // * @param left Camera frustum left plane. Default `-1`.
  // * @param right Camera frustum right plane. Default `1`.
  // * @param top Camera frustum top plane. Default `1`.
  // * @param bottom Camera frustum bottom plane. Default `-1`.
  // * @param near Camera frustum near plane. Default `0.1`.
  // * @param far Camera frustum far plane. Default `2000`.
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight),
    window.innerWidth / window.innerHeight,
    1,
    -1,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 1;
  camera.lookAt(0, 0, 0);
  //OrthographicCamera는 줌을 바꾸고 싶으면 z축을 움직이는게 아니라 zoom을 바꿔야함. z축은 OrthographicCamera의 mesh의 뷰 각도를 바꿔줌
  camera.zoom = 0.5;
  //zoom이나 카메라 시야를 바꾸면 업데이트 해줘야함
  camera.updateProjectionMatrix();
  scene.add(camera);

  //mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //그리기
  renderer.render(scene, camera);

  //리사이즈 이벤트
  window.addEventListener("resize", () => {
    //camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });
};

export default example;
