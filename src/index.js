import ThreeDimensionalEnvironment from "./3d-env/3d-env"
import StatsPanel from "./3d-env/stats-panel";

class IsometricViewer {
	constructor(parent) {
		this.parentElement = parent;
		this.stats = new StatsPanel(parent);
		this.env = new ThreeDimensionalEnvironment(
			10, 10, 10, 10, parent, this.stats.stats
		);
	}

	initializeViewer() {
		this.env.initialize();
		this.stats.initialize();
	}

	startAnimation() {
		this.env.animate()
	}
}

var viewer = new IsometricViewer(document.getElementById("isometric-viewer-container"))
viewer.initializeViewer()
viewer.startAnimation()


/*
var THREE = require('three');
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as Stats from 'stats.js';
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

// Your array
const data = [
	[
	  { height: 4, type: "grass" },
	  { height: 3, type: "path" },
	  { height: 1, type: "grass" },
	],
	[
	  { height: 2, type: "grass" },
	  { height: 2, type: "path" },
	  { height: 3, type: "grass" },
	],
	[
	  { height: 2, type: "grass" },
	  { height: 1, type: "path" },
	  { height: 2, type: "grass" },
	],
   ];
   
   // Function to render 3D scene
   function render3DScene() {
	// Create a scene
	const scene = new THREE.Scene();
   
	// Create a camera
	const aspect = window.innerWidth / window.innerHeight;
	const d = 10;
	var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

	camera.position.set( 20, 20, 20 );
   
	// Create a renderer
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	const size = 10; const divisions = 10; const gridHelper = new THREE.GridHelper( size, divisions ); scene.add( gridHelper );
	const controls = new OrbitControls( camera, renderer.domElement );
	// Loop through the array and create cubes based on height and type
	data.forEach((row, rowIndex) => {
	  row.forEach((cube, columnIndex) => {
	    const geometry = new THREE.BoxGeometry(1, cube.height/3, 1);
	    const material = new THREE.MeshBasicMaterial({ color: cube.type === "grass" ? 0x00ff00 : 0x555555 });
	    const cubeMesh = new THREE.Mesh(geometry, material);
   
	    // Position the cube based on array indices
	    cubeMesh.position.set(columnIndex - data[0].length / 2, cube.height/3 / 2, -rowIndex);
   
	    // Add the cube to the scene
	    scene.add(cubeMesh);
	  });
	});
   
	// Animation loop
	const animate = function () {
	  requestAnimationFrame(animate);
	  controls.update();
	  // Render the scene
	  renderer.render(scene, camera);
	};
   
	// Start the animation loop
	animate();
   }
   
   // Call the function to render the 3D scene
   render3DScene();
*/