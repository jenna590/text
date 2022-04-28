//g lobal variables
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particleArray = [];
  let adjustX = 9;
  let adjustY = 5;
  const mouse = {
    x: null,
    y: null,
    radius: 170
  }

  window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y);
  });

  ctx.fillStyle = 'black';
  ctx.font = '20px Georgia';
  // text and coordinate location
  ctx.fillText('The', 6, 14);
  ctx.fillText('Thirteenth', 0, 31); //27
  ctx.fillText('Category of', 4, 46); //38
  ctx.fillText('Reason', 4, 63); //53
  const textCoordinates = ctx.getImageData(0, 0, 1000, 1000);
  // blueprint to create particles
  class Particle{
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.size = 3;
      this.baseX = this.x;
      this.baseY = this.y;
      // change speed of particle movement
      this.density = (Math.random() * 5) + 1;
    }
    draw(){
      ctx.fillStyle = 'transparent';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    update(){
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      if (distance < mouse.radius){
        this.x -= directionX * 3;
        this.y -= directionY * 3;
      } else {
          if (this.x !== this.baseX){
            let dx = this.x - this.baseX;
            this.x -= dx/10;
          }
          if (this.y !== this.baseY){
            let dy = this.y - this.baseY;
            this.y -= dy/10;
          }
        }
      }
    }
  // fill particle array with particle objects
  function init(){
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
      for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
        if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 50){
          let positionX = x + adjustX;
          let positionY = y + adjustY;
          particleArray.push(new Particle(positionX * 10, positionY * 10));
        }
      }
    }
  }
  init();
  // animation loop
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
      particleArray[i].draw();
      particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
  }
  animate();

  function connect(){
    for (let a = 0; a < particleArray.length; a++){
      for (let b = a; b < particleArray.length; b++){
        let dx = particleArray[a].x - particleArray[b].x;
        let dy = particleArray[a].y - particleArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 35){
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particleArray[a].x, particleArray[a].y);
          ctx.lineTo(particleArray[b].x, particleArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
