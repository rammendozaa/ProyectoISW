var formulario = document.getElementById("formulario");
var success
var lastResponseErrors=[]
document.addEventListener("DOMContentLoaded", function() {
  espanol = {
    cancel: "Cancelar",
    clear: "Limpiar",
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],

    monthsShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ],

    weekdays: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ],

    weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],

    weekdaysAbbrev: ["D", "L", "M", "Mi", "J", "V", "S"]
  };
  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems, {
    i18n: espanol,
    format: "dddd d , mmmm  yyyy",
    yearRange: [1919, 2019],
    setDefaultDate: true
  });
});

const myswal = Swal.mixin({
  onClose: () => {
    if(success)
      location.href = "/";
  }
});

formulario.addEventListener("submit", event => {
  event.preventDefault();
  resetForm()  
  axios.post("/registro", serializeForm())
    .then(response => {
      if (response.status == 200) {
	if(response.data.errors.length == 0){
	  myswal.fire("Cardaway", "Bienvenido a nuestra Comunidad", "success");
	  success=true
	}
	else{
		myswal.fire("Cardaway", "Error en el Formulario", "error");	
		success=false
		lastResponseErrors=response.data.errors
		response.data.errors.forEach(error =>{

		  document.getElementById("div_"+error.id).classList.add("error")
		  document.getElementById("span_"+error.id).textContent=error.msg
		})
	}
      } else {
        myswal.fire("Cardaway", "Ocurrio un Error", "error");	
	success=false
      }
    })
    .catch(error => {
      myswal.fire("Cardaway", "Ocurrio un error de Comunicacion", "error");
      success=false
    });
});
function serializeForm() {
  let jsonRes = {};
  jsonRes["nombre"] = document.getElementById("nombre").value;
  jsonRes["primerAp"] = document.getElementById("primerAp").value;
  jsonRes["segundoAp"] = document.getElementById("segundoAp").value;
  jsonRes["password"] = document.getElementById("password").value;
  jsonRes["correo"] = document.getElementById("correo").value;
  try{
  jsonRes["fechaNac"] = parser(document.getElementById("fechaNac").value);
  }catch{
  jsonRes["fechaNac"]=""
  }
  let radios = document.getElementsByName("group1");
  radios.forEach(radio => {
    if (radio.checked) jsonRes["genero"] = radio.value;
  });
  return jsonRes;
}
function resetForm(){
  lastResponseErrors.forEach(error =>{
    	  document.getElementById("div_"+error.id).classList.remove("error")
		  document.getElementById("span_"+error.id).textContent=""
	
  })
}

