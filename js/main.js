
  var owl = $('#owl');
$('#imgRegalo').click(function(e){
  $('.divRegalo').addClass("d-none");

  $('#owl').removeClass("d-none");
  $('.item-owl').css("height",window.innerHeight + "px");

  $("#owl").owlCarousel({
    items:1,
    margin:10
  });

  owl.on('changed.owl.carousel', function(event) {
    mostrarTexto(event);
  });
  mostrarTexto();

  mostrarConfeti();
  $('#audio')[0].play();
  
});

function mostrarConfeti(){
  var duration = 1000 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);

  var myCanvas = document.createElement('canvas');
  myCanvas.style.width = window.innerWidth + "px";
  myCanvas.style.height = window.innerHeight + "px";
  myCanvas.style.zIndex="1000";
  myCanvas.style.position="absolute";


  $('document').append(myCanvas);

  var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true
  });
  myConfetti({
    particleCount: 100,
    spread: 160
    // any other options from the global
    // confetti function
  });
}


var aText ;
var iSpeed = 0; 
var iIndex = 0; 
var iArrLength;
var iScrollAt = 20; 

var iTextPos = 0; 
var sContents = ''; 
var iRow; 
var text="";
//cantidad de rows
var iRowLength;
var idLastTimeout;
var idAnteriorTimeout;
var destination;
function typewriter() {
  if( iRow==iRowLength+1 || aaText[iRow]==undefined || aaText[iRow].length==iIndex){
    //Esto termina todooooooo por eso retorna para acabar con el bucle;
    //Función para next en owl carousel
    owl.trigger('next.owl.carousel');
    return;
  }
  text+=aaText[iRow][iIndex++];
  $(destination).text(text+"_");
  if(iIndex==aaText[iRow].length){
    iRow++;
    iIndex=0;
    text="";
    idLastTimeout=setTimeout("typewriter()", 1500);
  }else{
    idLastTimeout=setTimeout("typewriter()", 70);
  }
  
  

}

function mostrarTexto(e) {

  idLastTimeout=setTimeout(function(){
    aText = owl.find('.active p.d-none').text();
    aaText=[];
    var xx=true;
    var i=0;
    //cantidad de palabras
    var cP=3000;
    var aaLength=aText.split(' ').length;
    var j=0;
    while(i<aaLength){
      if(i%cP==0)aaText[j]="";
      aaText[j]+=" "+aText.split(" ")[i];
      i++;
      if(i%cP==0)j++;
    }
    text="";
    destination = owl.find('.active p.escribir');
    iSpeed = 100; 
    iIndex = 0; 
    iArrLength = aText.length;
    iRowLength=j;
    iRow=0;
    iScrollAt = 20; 
    
    iTextPos = 0; 


    var auxiliar=idAnteriorTimeout;
    idAnteriorTimeout=idLastTimeout;
    while (auxiliar<idLastTimeout) {
        window.clearTimeout(idLastTimeout);
        idLastTimeout--;
    }

    typewriter();
    
  },500);
  
}
