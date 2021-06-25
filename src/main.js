import * as THREE from "three";
import Camera from "./components/camera";
import Cube from "./components/cube";
import Light from "./components/light";
import Plane from "./components/plane";
import Renderer from "./components/renderer";
import Sphere from "./components/sphere";

export class Main {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.container = container;

    this.renderer = new Renderer(this.scene, this.container);
    this.camera = new Camera(this.renderer.threeRenderer);
    this.plane = new Plane();
    this.cube = new Cube();
    this.sphere = new Sphere();
    this.light = new Light();

    this.scene.add(this.plane.plane);
    this.scene.add(this.cube.cube);
    this.scene.add(this.sphere.sphere);
    this.light.addLights(this.scene);

    this.camera.threeCamera.lookAt(this.scene.position);

    this.container.appendChild(this.renderer.threeRenderer.domElement);

    this._render();

    this._setEvents();
  }

  _render() {
    this.cube.animateCube();
    this.sphere.animateSphere();

    requestAnimationFrame(this._render.bind(this));

    this.renderer.render(this.scene, this.camera.threeCamera);
  }

  _setEvents() {
    window.addEventListener("resize", () => {
      const { cameraWidth } = this.camera.threeCamera;
      const newAspectRatio = this.container.offsetWidth / this.container.offsetHeight;
      const adjustedCameraHeight = cameraWidth / newAspectRatio;

      this.camera.threeCamera.top = adjustedCameraHeight / 2;
      this.camera.threeCamera.bottom = adjustedCameraHeight / -2;
      this.camera.threeCamera.updateProjectionMatrix();

      this.renderer.updateSize();
      this.renderer.threeRenderer.render(this.scene, this.camera.threeCamera);
    });
  }
}
