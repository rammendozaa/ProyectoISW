var success;
const myswal = Swal.mixin({
  onClose: () => {
    if (success) location.href = "/";
  }
});

//
//Materialize Inicialization
//

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {});
});

document.getElementById("datos").addEventListener("submit", event => {
  event.preventDefault();
  let username = document.getElementById("usuario").value;
  let password = document.getElementById("contrasena").value;
  axios
    .post("/logIn", { username: username, password: password })
    .then(res => {
      if (res.status == 200) {
        if (res.data.success) {
          myswal.fire("Bienvenid@!", res.data.msg, "success");
          success = true;
        } else {
          myswal.fire("Cardaway", res.data.msg, "error");
          success = false;
        }
      }
    })
    .catch(erro => {
      myswal.fire("Cardaway", "Ocurrio un error de comunicacion", "error");
      success = false;
    });
});


   

