import * as THREE from 'three'
import globeVertex from './shaders/globe.vert'
import globeFragment from './shaders/globe.frag'
import atmosphereVertex from './shaders/atmosphere.vert'
import atmosphereFragment from './shaders/atmosphere.frag'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

// create a sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: globeVertex,
    fragmentShader: globeFragment,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/globe.jpg')
      }
    }
  })
)

// create a sphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertex,
    fragmentShader: atmosphereFragment,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(sphere)
scene.add(atmosphere)
camera.position.z = 15

function animate() {
  renderer.render(scene, camera)
  sphere.rotation.y += 0.001
  
  requestAnimationFrame(animate)
}

animate()
