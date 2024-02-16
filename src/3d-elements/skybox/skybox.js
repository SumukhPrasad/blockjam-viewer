import * as THREE from "three";

class Skybox {
     constructor (scene) {
          this.scene = scene;
     }

     initialize() {
          const loader = new THREE.CubeTextureLoader();
          loader.setPath( 'images/skybox/' );

          const textureCube = loader.load([
               'px.png', 'nx.png',
               'py.png', 'ny.png',
               'pz.png', 'nz.png'
          ]);

          this.scene.background = textureCube;
     }
}

export default Skybox;