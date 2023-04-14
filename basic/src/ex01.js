import * as THREE from "three";

//subject: 카메라 기본 + scene + mesh
const example = () => {
  const $canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: $canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // PerspectiveCamera
  //      * @param fov Camera frustum vertical field of view. Default `50`. 카메라 시야각
  //      * @param aspect Camera frustum aspect ratio. Default `1`. 카메라 화면 비율(종횡비)
  //      * @param near Camera frustum near plane. Default `0.1`. 어느정도 가까이가 안보이는지
  //      * @param far Camera frustum far plane. Default `2000`. 어느정도 멀리가 안보이는지

  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );

  //카메라를 scene에 위치 설정을 안했다면 0,0,0
  // camera.position.z = 5;
  // camera.position.y = 2;
  // camera.position.x = 1;
  // scene.add(camera);

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
};

export default example;
