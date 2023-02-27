const element = document.querySelector(".paginacion ul");
let totalPages = 600;
let page = 1;
var inicio = 0;
var fin = 10;

//llamando la funcion con parámetros de paso y la edicion dentro del elemento que es la etiqueta UL
element.innerHTML = createpaginacion(totalPages, page);
function createpaginacion(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  
  if (page > 1) {
    //mostrar el botón siguiente si el valor de la página es mayor que 1
    liTag += `<li class="btn prev" onclick="createpaginacion(totalPages, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    inicio -=10
    fin -=10
  }

  if (page > 2) {
    //si el valor de la página es menor que 2 entonces añade 1 después del botón anterior
    liTag += `<li class="first numb" onclick="createpaginacion(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //si el valor de la página es mayor que 3 entonces añade esto (...) después del primer li o página
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // cuántas páginas  li se muestran antes del li actual
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // cuántas páginas  li se muestran después del li actual
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //si plength es mayor que totalPage length entonces continua
      continue;
    }
    if (plength == 0) {
      //si plength es 0 entonces añade +1 en el valor de plength
      plength = plength + 1;
    }
    if (page == plength) {
      //si page es igual a plength entonces asigna la cadena activa en la variable activa
      active = "active";
    } else {
      //en caso contrario dejar vacía a la variable activa
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createpaginacion(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //si el valor de la página es menor que el valor de totalPage en -1 entonces muestra el último li o página
    if (page < totalPages - 2) {
      //si el valor de la página es menor que el valor de totalPage en -2 entonces añade esto (...) antes del último li o página
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createpaginacion(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //mostrar el botón siguiente si el valor de la página es menor que totalPage(20)
    liTag += `<li class="btn next" onclick="createpaginacion(totalPages, ${
      page + 1
  
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    inicio +=10
    fin +=10
  }
  element.innerHTML = liTag; //añade la etiqueta li dentro de la etiqueta ul
  return liTag; //Retorna la etiqueta li
}


const apiTasa = document.querySelector(".card");

const url = "https://www.datos.gov.co/resource/mcec-87by.json";

fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    pintar(data);
  });

function pintar(data) {
  contenidoDiv = document.getElementById("content");
  contenidoDiv.innerHTML = "";
  data = data.slice(inicio, fin);
  for (let item of data) {
    contenidoDiv.innerHTML += `<br><br><div class="card"><h2>Valor en Peso Colombiano:</h2>
        <div class="card-header">$ ${item.valor}</div>
        <div class="card-body">
            <h2>unidad :</h2><div class="card-header">${item.unidad}</div>
        </div><br><br><br>
        <div class="card-footer"> Vigencia desde : ${item.vigenciadesde}</div>
        <div class="card-footer">Vigencia hasta : ${item.vigenciahasta}</div>
    </div>`;
  }
}
