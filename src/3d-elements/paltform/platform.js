import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


class Platform {
     constructor (platformMap, scene) {
          this.map = platformMap;
          this.scene = scene;
          this.blockScaleFactor = {
               width: 2,
               height: 1,
               depth: 2
          }
     }

     initialize() {
          this.map.map.forEach((row, rowIndex) => {
               row.forEach((cube, columnIndex) => {
                    const loader = new GLTFLoader();
                    loader.load(
                         `images/gltf/${cube.blockType}-block.gltf`, // TODO fallback file
                         (gltf) => {
                              const model = gltf.scene;

                              model.position.set(
                                   (columnIndex - (this.map.map[0].length-1) / 2) * this.blockScaleFactor.width, 
                                   cube.height * this.blockScaleFactor.height, 
                                   -(rowIndex - (this.map.map.length-1) / 2) * this.blockScaleFactor.depth
                              );
                              
                              this.scene.add(model);
                         },
                         (xhr) => {
                              // Loading progress callback if required
                         },
                         (error) => {
                              console.error('Error loading GLTF model', error);
                         }
                    );
               });
          });
     }
}

export default Platform;