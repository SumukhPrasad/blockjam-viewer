import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
		this.camera = new THREE.OrthographicCamera( - this.cameraProperties.distance * this.cameraProperties.aspect, this.cameraProperties.distance * this.cameraProperties.aspect, this.cameraProperties.distance, - this.cameraProperties.distance, 1, 1000 );
		
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
		this.renderer = new THREE.WebGLRenderer(/*{antialias: true}*/);
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



		this.animate = this.animate.bind(this);
	}

	initialize() {
		this.parent.appendChild( this.renderer.domElement );
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
		
		this.renderer.setSize( this.rendererProperties.width, this.rendererProperties.height );
		
		this.camera.left = - this.cameraProperties.distance * this.cameraProperties.aspect;
		this.camera.right = this.cameraProperties.distance * this.cameraProperties.aspect;
		this.camera.top = this.cameraProperties.distance;
		this.camera.bottom = - this.cameraProperties.distance;

		this.camera.updateProjectionMatrix();

		if (this.devicePixelRatio>1){
			this.renderer.setSize( this.rendererProperties.width*this.devicePixelRatio, this.rendererProperties.height*this.devicePixelRatio, false );
		}
	}
}

export default ThreeDimensionalEnvironment;