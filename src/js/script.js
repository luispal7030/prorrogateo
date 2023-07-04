var eDia = document.getElementById('DIA');
var ePlan = document.getElementById('PLAN');
var eCiclo = document.getElementById('CICLO');
var btn = document.getElementById('btn');
var resHtml = document.getElementById('Resultado');
var otrosplanes = document.getElementsByClassName('otrosplanes')[0];
otrosplanes.style.display = 'none';
var err = 0;

const planesOpt = [
  {
    nombrePlan: 'Plan 69.90',
    plan: 69.90,
    descuento: true,
    beneficios: ''
  },
  {
    nombrePlan: 'Plan 29.90',
    plan: 29.90,
    descuento: false,
    beneficios: ''
  },
  {
    nombrePlan: 'Plan 39.90',
    plan: 39.90,
    descuento: false,
    beneficios: ''

  },
  {
    nombrePlan: 'Plan 59.90',
    plan: 59.90,
    descuento: false,
    beneficios: ''

  },
  {
    nombrePlan: 'Plan 99.90',
    plan: 99.90,
    descuento: true,
    beneficios: ''
  },
];

const ciclosOpt = [
  {
    nombreCiclo: 'Ciclo 15',
    numciclo: 15,
  },
  {
    nombreCiclo: 'Ciclo 17',
    numciclo: 17,
  },
  {
    nombreCiclo: 'Ciclo 23',
    numciclo: 23,
  },
  {
    nombreCiclo: 'Ciclo 31',
    numciclo: 31,
  },

];

planes();

function verificarCicloDia() {
  if (eDia != "") {
    ciclofacturacion();
  }
}

function notificacion(mensaje) {
  Toastify({

    text: mensaje,
    duration: 3000

  }).showToast();

}

function ciclofacturacion() {
  var setCiclo = eDia.value;
  var selectedIndex = 0;

  if (setCiclo <= 15) {
    selectedIndex = 0;
  } else if (setCiclo <= 17) {
    selectedIndex = 1;
  } else if (setCiclo <= 23) {
    selectedIndex = 2;
  } else if (setCiclo <= 31) {
    selectedIndex = 3;
  } else {
    notificacion("Ingresa un dia valido");
  }

  eCiclo.selectedIndex = selectedIndex;
  eCiclo.querySelector("option");
  eCiclo.selected = true;
}


function calcular() {
  var ciclo = 0;
  var dia = 0;
  var plan = 0;
  otrosplanes.innerHTML = '';
  dia = parseInt(eDia.value);
  ciclo = parseInt(eCiclo.value);
  plan = parseFloat(ePlan.value);

  var diasfacturados = ciclo - dia;
  var costoplan = plan / 30;

  var prorrogateo = diasfacturados * costoplan;



  const respuesta = `
  <p> |- Tu ciclo de facturacion: -| </p>
  <div id="res">
  <button onclick="refrescar()">&times;</button>
  <div>
      <h3>Plan contratado:</h3>
      <p>Plan ${plan}</p>
  </div>
  <div>
      <h3>Ciclo</h3>
      <p>Ciclo ${ciclo}</p>
  </div>
  <div>
      <h3>Dias de uso:</h3>
      <p>${diasfacturados} días</p>
  </div>
  <div>
      <h3>Primer mes/prorrogateo:</h3>
      <p>Pagaras: $ ${prorrogateo.toFixed(2)}</p>
  </div>
</div>
  
  `;

  resHtml.innerHTML = respuesta;

  adicionarItm(ciclo, diasfacturados);
}

function refrescar() {
  location.reload();
}

function adicionarItm(ciclo, diascontrat) {
  var selectedIndex = ePlan.selectedIndex;
  var selectedValue = ePlan.options[selectedIndex].value;

  var nuevoArrPlanes = planesOpt.filter((plan) => plan.plan !== parseFloat(selectedValue));

  nuevoArrPlanes.forEach(pln => {

    var precioDia = pln.plan / 30;
    var precioPago = diascontrat * precioDia;

    const planesNOselected = `
    <div id="res">
    <button onclick="refrescar()">&times;</button>
    <div>
        <h3>Plan contratado:</h3>
        <p>Plan ${pln.plan}</p>
    </div>
    <div>
        <h3>Ciclo</h3>
        <p>Ciclo ${ciclo} </p>
    </div>
    <div>
        <h3>Dias de uso:</h3>
        <p> días ${diascontrat}</p>
    </div>
    <div>
        <h3>Primer mes/prorrogateo:</h3>
        <p>Pagaras: $ ${precioPago.toFixed(2)}</p>
    </div>
  </div>
    `;

    otrosplanes.innerHTML += planesNOselected;
  });
}






function planes() {



  planesOpt.forEach(descripcion => {
    const option =
      `<option value="${descripcion.plan}">${descripcion.nombrePlan}</option>
      `;

    ePlan.innerHTML += option;
  });

  ciclosOpt.forEach(facturado => {
    const opccion = `
    <option value="${facturado.numciclo}">${facturado.nombreCiclo}</option>`

    eCiclo.innerHTML += opccion;
  });
}



function toggleDiv(divId) {
  var div = document.getElementById(divId);
  console.log(div)

  // !comprueba si el div esta en pantalla, sino lo abre o lo cierra.
  if (div.style.display === "none") {
    div.style.display = "flex";
  } else {
    div.style.display = "none";
  }
}

const feedback = document.getElementById('feedback');

feedback.style.cursor = 'pointer';

feedback.addEventListener('mouseover', function () {
  // Código a ejecutar cuando el mouse esté sobre el div
  qrimg.style.display = 'flex';
});



// feedback.addEventListener('mouseout', function () {
//   // Código a ejecutar cuando el mouse esté sobre el div
//   qrimg.style.display = 'none';
// });