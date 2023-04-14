import * as THREE from "three";

//subject: 애니메이션 프레임 보정
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
  const light = new THREE.DirectionalLight(0xffffff, 1);
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
    //이전 draw가 트리거된 clock.getElapsedTime()과 현재 clock.getElapsedTime()의 차이
    //! 주의 한 코드내에서 clock.getElapsedTime()와 clock.getDelta()를 함께 사용하면 값이 꼬임.  clock.getDelta()를 여러번 선언해도 꼬임
    // console.log(clock.getDelta());

    //mesh.rotation.y += THREE.MathUtils.degToRad(10)//deg

    const delta = clock.getDelta();
    mesh.rotation.y += delta;
    if (direction > 0) mesh.position.y += delta;
    else mesh.position.y -= delta;
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
