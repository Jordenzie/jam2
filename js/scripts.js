document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.image-scroll');
    let isVertical = window.innerWidth < 1024;

    function scrollImages() {
        const firstImage = scrollContainer.firstElementChild;
        const lastImage = scrollContainer.lastElementChild;

        if (isVertical) {
            if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
                scrollContainer.appendChild(firstImage.cloneNode(true));
                scrollContainer.removeChild(firstImage);
                scrollContainer.scrollTop = 0;
            } else if (scrollContainer.scrollTop === 0) {
                scrollContainer.insertBefore(lastImage.cloneNode(true), firstImage);
                scrollContainer.removeChild(lastImage);
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        } else {
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                scrollContainer.appendChild(firstImage.cloneNode(true));
                scrollContainer.removeChild(firstImage);
                scrollContainer.scrollLeft = 0;
            } else if (scrollContainer.scrollLeft === 0) {
                scrollContainer.insertBefore(lastImage.cloneNode(true), firstImage);
                scrollContainer.removeChild(lastImage);
                scrollContainer.scrollLeft = scrollContainer.scrollWidth;
            }
        }
    }

    scrollContainer.addEventListener('scroll', scrollImages);

    window.addEventListener('resize', () => {
        isVertical = window.innerWidth < 1024;
    });

    // Function to get current time in PST with blinking colon
    function getCurrentTimePST() {
        const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
        const timeArray = date.split(',')[1].trim().split(':');
        const hours = timeArray[0];
        const minutes = timeArray[1];
        const seconds = timeArray[2].slice(0, 2);
        return `${hours}:${minutes}:${seconds}`;
    }

    // Update timestamp every second
    const timestampSpan = document.createElement('span');
    timestampSpan.style.fontFamily = 'Akkurat Mono';
    timestampSpan.style.fontSize = '10px';
    timestampSpan.style.textAlign = 'left';
    timestampSpan.textContent = getCurrentTimePST();
    const colonSpan = document.createElement('span');
    colonSpan.textContent = ':';
    colonSpan.style.animation = 'blink 1s step-end infinite';
    timestampSpan.appendChild(colonSpan);

    const timestampSection = document.getElementById('timestamp');
    timestampSection.appendChild(timestampSpan);

    setInterval(function() {
        timestampSpan.textContent = getCurrentTimePST();
    }, 1000);

    // Input field behavior
    const inputFields = document.querySelectorAll('.form-group input');
    inputFields.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.previousElementSibling.style.display = 'none';
            } else {
                this.previousElementSibling.style.display = 'block';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function getCurrentTimePST() {
        const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
        const timeArray = date.split(', ')[1].trim().split(':');
        const hours = timeArray[0];
        const minutes = timeArray[1];
        const seconds = timeArray[2].slice(0, 2);
        return `${hours}:${minutes}:${seconds}`;
    }

    function updateTimestamp() {
        const timestampSpan = document.getElementById('current-time');
        const currentTime = getCurrentTimePST();
        timestampSpan.innerHTML = `${currentTime}`;
    }

    updateTimestamp();
    setInterval(updateTimestamp, 1000);
});


document.addEventListener('DOMContentLoaded', function() {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
});



