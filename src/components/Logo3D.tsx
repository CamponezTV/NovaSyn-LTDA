import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import modelPath from '@/assets/3d/base_basic_pbr.glb?url';

const Logo3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.background = 'transparent';
    containerRef.current.appendChild(renderer.domElement);

    // Lighting - Enhanced for dramatic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    // Top lights - Strong purple and green
    const topPurpleLight = new THREE.PointLight(0x9933ff, 2.5);
    topPurpleLight.position.set(0, 20, 5);
    scene.add(topPurpleLight);

    const topGreenLight = new THREE.PointLight(0x00ff88, 2.5);
    topGreenLight.position.set(0, 18, -5);
    scene.add(topGreenLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff88, 1);
    pointLight2.position.set(-10, 5, 8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x88ff00, 0.8);
    pointLight3.position.set(5, -5, 10);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xffffff, 1.2);
    pointLight4.position.set(-10, 10, -10);
    scene.add(pointLight4);

    const pointLight5 = new THREE.PointLight(0x00ff88, 0.8);
    pointLight5.position.set(10, -5, -8);
    scene.add(pointLight5);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(0, 15, 15);
    scene.add(directionalLight);

    const directionalLightBack = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLightBack.position.set(0, -10, -15);
    scene.add(directionalLightBack);

    // Shadow lights - Strong shadows on sides and top
    const shadowLightLeft = new THREE.PointLight(0x000000, 0.6);
    shadowLightLeft.position.set(-25, 15, 0);
    scene.add(shadowLightLeft);

    const shadowLightRight = new THREE.PointLight(0x000000, 0.6);
    shadowLightRight.position.set(25, 15, 0);
    scene.add(shadowLightRight);

    const shadowLightFront = new THREE.PointLight(0x000000, 0.5);
    shadowLightFront.position.set(0, 15, -20);
    scene.add(shadowLightFront);

    const shadowLightTop = new THREE.DirectionalLight(0x000000, 0.4);
    shadowLightTop.position.set(0, 25, 0);
    scene.add(shadowLightTop);

    // Create 3D Logo Group
    const logoGroup = new THREE.Group();
    logoGroupRef.current = logoGroup;
    scene.add(logoGroup);

    // Setup DRACOLoader for compressed models
    const dracoLoader = new DRACOLoader();
    // Using a reliable CDN for draco decoders
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    // Load GLB model with DRACO
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    
    gltfLoader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        // Aumentando a escala para compensar a altura ajustada da div
        model.scale.set(1.3, 1.3, 1.3);
        // Ajustando o Y para recentralizar perfeitamente
        model.position.set(0, -0.5, 0);
        logoGroup.add(model);
        console.log('✓ Model loaded with PBR materials:', model);
      },
      (progress) => {
        const loaded = progress.loaded;
        const total = progress.total;
        console.log(`⏳ Loading: ${Math.round((loaded / total) * 100)}%`);
      },
      (error) => {
        console.error('✗ Error loading model:', error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (logoGroup) {
        logoGroup.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
      style={{ background: 'transparent !important' }}
    />
  );
};

export default Logo3D;
