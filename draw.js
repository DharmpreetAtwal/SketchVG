/*const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');*/
const svg = document.getElementById('svg');

document.onclick = function(event) {
        var clientX = event.clientX;
        var clientY = event.clientY;

        var canvasRect = svg.getBoundingClientRect();
        var canvasX = clientX - canvasRect.left;
        var canvasY = clientY - canvasRect.top;

        svg.innerHTML = 
        "<circle cx='"+ canvasX + "' cy='" + canvasY + "' r='40' stroke='blue' stroke-width='2' fill='red' />"; 

  /*      
        var canvasRect = canvas.getBoundingClientRect();
        var canvasX = clientX - canvasRect.left;
        var canvasY = clientY - canvasRect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(canvasX, canvasY, 50, 50);
        ctx.fill();
        ctx.stroke(); */
};