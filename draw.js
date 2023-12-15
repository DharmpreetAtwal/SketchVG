const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.onclick = function() {
        var clientX = event.clientX;
        var clientY = event.clientY;

        var canvasRect = canvas.getBoundingClientRect();
        var canvasX = clientX - canvasRect.left;
        var canvasY = clientY - canvasRect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(canvasX, canvasY, 50, 50);
        ctx.fill();
        ctx.stroke();
};