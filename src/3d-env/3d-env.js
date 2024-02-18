import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Skybox from '../3d-elements/skybox/skybox';
import Platform from '../3d-elements/paltform/platform';

import pmap from '../3d-elements/paltform/map.json'

class ThreeDimensionalEnvironment {
	constructor (cameraDistance, cameraX, cameraY, cameraZ, parent, statsHandler) {
		this.cameraProperties = {
			distance: cameraDistance,
			position: {
				x: cameraX,
				y: cameraY,
				z: cameraZ
			},
			aspect: parent.offsetWidth/parent.offsetHeight
		}
		this.parent = parent;
		this.scene = new THREE.Scene();
		//this.camera = new THREE.OrthographicCamera( - this.cameraProperties.distance * this.cameraProperties.aspect, this.cameraProperties.distance * this.cameraProperties.aspect, this.cameraProperties.distance, - this.cameraProperties.distance, 1, 1000 );
		this.camera = new THREE.PerspectiveCamera();

		this.camera.aspect = this.cameraProperties.aspect;
		
		this.camera.position.set( 
			this.cameraProperties.position.x,
			this.cameraProperties.position.y,
			this.cameraProperties.position.z,
		);

		this.rendererProperties = {
			width: parent.offsetWidth,
			height: parent.offsetHeight
		};

		this.devicePixelRatio = window.devicePixelRatio;
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize( this.rendererProperties.width, this.rendererProperties.height );
		this._resize()
		window.addEventListener( 'resize', ()=>{this._resize()}, false );

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.gridHelperProperties = {
			size: 10,
			divisions: 10
		}
		this.gridHelper = new THREE.GridHelper( this.gridHelperProperties.size, this.gridHelperProperties.divisions );
		this.scene.add( this.gridHelper );

		this.axesHelperProperties = {}
		this.axesHelper = new THREE.AxesHelper( 10 );
		this.scene.add( this.axesHelper );

		this.statsHandler = statsHandler;

		this.skybox = new Skybox(this.scene)
		this.platform = new Platform(pmap, this.scene)
		this.animate = this.animate.bind(this);
	}

	initialize() {
		this.skybox.initialize();
		this.platform.initialize()
		this._initLights()
		this.parent.appendChild( this.renderer.domElement );
	}

	_initLights() {
		const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 50, 0 );
		this.scene.add( hemiLight );

		const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
		this.scene.add( hemiLightHelper );

		const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
		dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( - 1, 1.75, 1 );
		dirLight.position.multiplyScalar( 30 );
		this.scene.add( dirLight );

		dirLight.castShadow = true;

		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;

		const d = 50;

		dirLight.shadow.camera.left = - d;
		dirLight.shadow.camera.right = d;
		dirLight.shadow.camera.top = d;
		dirLight.shadow.camera.bottom = - d;

		dirLight.shadow.camera.far = 3500;
		dirLight.shadow.bias = - 0.0001;

		const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
		this.scene.add( dirLightHelper );
	}
	animate() {
		this.statsHandler.begin();
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
		this.statsHandler.end();
		requestAnimationFrame(this.animate);
	}

	_resize() {
		this.rendererProperties.width = this.parent.offsetWidth;
		this.rendererProperties.height = this.parent.offsetHeight;
		this.cameraProperties.aspect = this.rendererProperties.width / this.rendererProperties.height;
		this.camera.aspect = this.cameraProperties.aspect;
		this.renderer.setSize( this.rendererProperties.width, this.rendererProperties.height );
		
		/*this.camera.left = - this.cameraProperties.distance * this.cameraProperties.aspect;
		this.camera.right = this.cameraProperties.distance * this.cameraProperties.aspect;
		this.camera.top = this.cameraProperties.distance;
		this.camera.bottom = - this.cameraProperties.distance;*/

		this.camera.updateProjectionMatrix();

		if (this.devicePixelRatio>1){
			this.renderer.setSize( this.rendererProperties.width*this.devicePixelRatio, this.rendererProperties.height*this.devicePixelRatio, false );
		}
	}
}

export default ThreeDimensionalEnvironment;