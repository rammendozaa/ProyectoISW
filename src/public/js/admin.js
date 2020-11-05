var seccion = "usuarios";
var usersPerPage = 4;
var page = 0;
var textToSearch = "";
let formularioAddPostal = document.getElementById("formPostal")
let cargadorU = document.getElementById("cargadorU");
let buscadorU = document.getElementById("buscadorU");

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });
document.getElementById("leftArrow").addEventListener("click", () => {
  if (page != 0) {
    page -= 1;
  }
  cargaUsuarios();
  document.getElementById("noPage").innerText = page + 1;
});
document.getElementById("rightArrow").addEventListener("click", () => {
  page += 1;
  cargaUsuarios();
  document.getElementById("noPage").innerText = page + 1;
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {});
  elems = document.querySelectorAll(".tabs");
  instances = M.Tabs.init(elems, {});
});
var tabContent;
tabcontent = document.getElementsByClassName("tabContent");
for (i = 1; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
}

function openTab(evt, tabName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " selected";
}
function cargaUsuarios() {
  axios
    .get("/getUsuarios", {
      params: {
        page: page,
        textToSearch: buscadorU.value,
        usersPerPage: usersPerPage
      }
    })
    .then(res => {
      if (res.status == 200) {
        cargadorU.innerHTML = "";
        res.data.forEach(dato => {
          cargadorU.innerHTML += getUserRow(dato);
        });
        Array.from(document.getElementsByClassName("deleteButton")).forEach(
          button => {
            let correo =
              button.parentElement.parentElement.children[2].innerText;

            button.addEventListener("click", () => {
              axios
                .delete("/deleteUsuario", {
                  params: {
                    correo: correo,
                  }
                })
                .then(res => {
                  if (res.status == 200) {
                    if (res.data.success) {
		      cargaUsuarios()
                      Swal.fire(
                        "Cardaway",
                        "Usuario Eliminado con exito",
                        "success"
                      );
		      
                    } else {
                      Swal.fire("Cardaway", "Ocurrio un error", "error");
                    }
                  } else {
                    Swal.fire("Cardaway", "Error de Conexion", "error");
                  }
                });
            });
          }
        );
      } else console.log("Error al cargar los Usuarios");
    });
}
buscadorU.addEventListener("input", cargaUsuarios);
function getUserRow(json) {
  innerHTML = `
	      <tr>
                <th class="imgContainer">
                  <img src="postales/Amor/kenny.gif" alt="algo" />
                </th>
                <th class="nombre">
		  ${json.nombre}
                </th>
                <th class="correo">
		  ${json._id}
                </th>
                <th class="nacimiento">
                  ${cumple(json.fechaNac)}
                </th>
                <th class="icono">
                  <i class="material-icons deleteButton">
                    delete
                  </i>
                </th>
              </tr>
 `;
  return innerHTML;
}
cargaUsuarios();
formularioAddPostal.addEventListener("submit",(e)=>{
  e.preventDefault();
  let formData=new FormData(formularioAddPostal[0]);
  let nombreCat=document.getElementById("selector").value
  formData.append("categoria",nombreCat)
  axios.post("/insertPostal",formData,{ 
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
})

