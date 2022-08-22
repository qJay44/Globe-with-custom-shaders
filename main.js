import * as THREE from 'three'
import globeVertex from './shaders/globe.vert'
import globeFragment from './shaders/globe.frag'
import atmosphereVertex from './shaders/atmosphere.vert'
import atmosphereFragment from './shaders/atmosphere.frag'
import gsap from 'gsap'
import { Float32BufferAttribute } from 'three'

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

// create atmosphere
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

const group = new THREE.Group()
group.add(sphere)

const starGeometry = new THREE.BufferGeometry()
const starsMaterial = new THREE.PointsMaterial({ color:0xffffff})

const starVertices = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  
  starVertices.push(x, y, z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
const stars = new THREE.Points(starGeometry, starsMaterial)

scene.add(group)
scene.add(atmosphere)
scene.add(stars)
camera.position.z = 15

const mouse = {
  x: undefined,
  y: undefined
}

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = (event.clientY / innerHeight) * 2 - 1
})

function animate() {
  renderer.render(scene, camera)
  sphere.rotation.y += 0.002
  group.rotation.y = mouse.x * 0.5;
  gsap.to(group.rotation, {
    x: mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })

  requestAnimationFrame(animate)
}

animate()
