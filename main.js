import * as THREE from 'three'
import { RedFormat } from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

// create a sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/globe.jpg') })
)

scene.add(sphere)
camera.position.z = 15

function animate(frame) {
  renderer.render(scene, camera)
  
  requestAnimationFrame(animate)
}

animate()
