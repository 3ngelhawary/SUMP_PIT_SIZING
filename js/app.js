
function calc(){
let inflow=+document.getElementById('inflow').value;
let duty=+document.getElementById('duty').value;
let standby=+document.getElementById('standby').value;

let total=duty+standby;
document.getElementById('total').value=total;

let pump=inflow/duty;
document.getElementById('pump').value=pump.toFixed(2);

let Q=pump*duty;

let T=3600/+document.getElementById('starts').value;
let V=(T*(Q/1000))/4;

document.getElementById('out').innerHTML="Volume = "+V.toFixed(2)+" m3";

draw();
}

function draw(){
let svg=document.getElementById('svg');
svg.innerHTML='<rect x="80" y="50" width="140" height="180" stroke="cyan" fill="none"/>';
}
