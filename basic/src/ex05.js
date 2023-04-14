import * as THREE from "three";

//subject: 애니메이션 기본
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

  scene.add(camera);
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.z = 2;
  light.position.x = 1;

  //빛은 여러개 add할수있으나 성능에 영향을 미침
  scene.add(light);
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //애니메이션 그리기
  let direction = -1;
  const clock = new THREE.Clock();

  const draw = () => {
    //횟수와는 상관없는 그 시점의 절대적인 시간
    // 컴퓨터마다 requestAnimationFrame(초당 프레임 횟수를 사용)이 트리거되는 수는 다를수 있음.
    //따라서 모든 컴퓨터에서 동일하게 작동하게 하려면 트리거되는 횟수에 따라 1도씩 움직이는게 아니라 절대적인 시간 가치에 애니메이션이 동작하게해야함.
    // console.log(clock.getElapsedTime());

    //각도는 radian을 사용
    // 1radian = 57.3도
    // 1radian = 180/파이 degree
    // mesh.rotation.y += 0.1;
    //mesh.rotation.y += THREE.MathUtils.degToRad(10)//deg

    const time = clock.getElapsedTime();
    mesh.rotation.y = time;
    if (direction > 0) mesh.position.y += 0.01;
    else mesh.position.y -= 0.01;
    if (mesh.position.y <= -2) direction = 1;
    else if (mesh.position.y >= 2) direction = -1;

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  };

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });
  draw();
};

export default example;
