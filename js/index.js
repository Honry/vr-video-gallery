var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var video      = document.createElement('video');
video.autoplay = true;
video.src    = 'https://streams.kolor.com/streams/833ec36d-b115-43a2-bbf1-aaca49046bab/source.02-720p_HD.mp4';
video.crossOrigin = '';
videoTexture = new THREE.Texture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;


  var scene = new THREE.Scene();

  var cubeGeometry = new THREE.SphereGeometry(500, 60, 40);
  var sphereMat = new THREE.MeshBasicMaterial({map: videoTexture});
  sphereMat.side = THREE.BackSide;
  var cube = new THREE.Mesh(cubeGeometry, sphereMat);
  scene.add(cube);

  

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.y = 0;
  camera.position.z = 500;

  scene.add(camera);

  var controls = new THREE.OrbitControls( camera);

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false; 
  controls.maxDistance = 500;
  controls.minDistance = 500;

  function render() {
          if( video.readyState === video.HAVE_ENOUGH_DATA ){
            videoTexture.needsUpdate = true;
          }
          controls.update(); 
          renderer.render(scene, camera);
          requestAnimationFrame(render);
  }

  render();