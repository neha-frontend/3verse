import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LoadingManager } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import {REACT_APP_MECH_MODAL} from "../../../config/envConfig";

import './modalView.css';

const ModalView = ({ canvasId = '', image = '' }) => {
  const modalRef = useRef();
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xd69ca0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  const camera = new THREE.PerspectiveCamera(75, 433 / 480, 0.1, 8000);
  camera.position.set(1, 1, 9);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.46);
  directionalLight.position.set(319, 0, 661);
  scene.add(directionalLight);

  useEffect(() => {
    if (modalRef.current) {
      var canvas = modalRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
      renderer.setSize(433, 500);
      if (canvasId !== '') {
        const test = document.getElementById(canvasId);
        test.appendChild(renderer.domElement);
      }

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, 0.3, 0);
      const progressBar = document.getElementById('progressBar');
      const manager = new LoadingManager();
      manager.addHandler(/\.tga$/i, new TGALoader());

      //  manager.onStart = function () {
      //    console.log('Loading started');
      //  };

      // manager.onLoad = function () {
      //   progressBar.style.display = 'none';
      // };

      // manager.onProgress = function (item, loaded, total) {
      //   var percentComplete = (loaded / total) * 100;
      //   progressBar.value = percentComplete;
      // };
      const texture = new THREE.TextureLoader().load(image);
      const fbxLoader = new FBXLoader(manager);
      fbxLoader.load(
        REACT_APP_MECH_MODAL,
        (object) => {
          object.getObjectByName('NFT_Plane').material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
          });
          object.scale.set(0.055, 0.045, 0.055);
          var box = new THREE.Box3().setFromObject(object);
          var center = new THREE.Vector3();
          box.getCenter(center);
          object.position.sub(center);
          scene.add(object);
          progressBar.style.display = 'none';          
        },
        (xhr) => {
          // return (xhr.loaded / xhr.total) * 100 + '% loaded';
          if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 100;           
            progressBar.value = percentComplete;
            progressBar.style.display = 'block';
          }
        },
        (error) => {
          return error;
        }
      );

      const onWindowResize = () => {
        camera.aspect = 433 / 500;
        camera.updateProjectionMatrix();
        renderer.setSize(433, 500);
        render();
      };

      window.addEventListener('resize', onWindowResize, false);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        render();
      };

      const render = () => renderer.render(scene, camera);

      animate();
    }
  }, []);

  return (
    <div className="modal_canvas">
      <progress value="0" max="100" id="progressBar" />
      <canvas id="displayContent" ref={modalRef} />
    </div>
  );
};

export default ModalView;
