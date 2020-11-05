function parser(cadena){
  let dia_num,ano_num,mes_let,mes_num;
  [dia_num,ano_num]=cadena.match(/(\d)+/g)
  mes_let=cadena.match(/, (\w+) /)[1]
    
  switch (mes_let) {
        case "Enero":
            mes_num="01";
            break;
        case "Febrero":
            mes_num="02";
            break;
        case "Marzo":
            mes_num="03";
            break;
        case "Abril":
            mes_num="04";
            break;
        case "Mayo":
            mes_num="05";
            break;
        case "Junio":
            mes_num="06";
            break;
        case "Julio":
            mes_num="07";
            break;
        case "Agosto":
            mes_num="08";
            break;
        case "Septiembre":
            mes_num="09";
            break;
        case "Octubre":
            mes_num="10";
            break;
        case "Noviembre":
            mes_num="11";
            break;
        case "Diciembre":
            mes_num="12";
            break;

    }
    return ano_num+"-"+mes_num+"-"+dia_num;
 
}
function anti_parser(cad){
    let meses=array("Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
   let y,m,d 
    [y,m,d]=cad.match(/(\d)+/g).map((elem)=>{
      return parseInt(elem)
    })
    return zeller(y,m,d)+String.format("%02d",d)+meses[m-1]+y
}
function zeller(y,m,d){
	 let constantes=[0,3,2,5,0,3,5,1,4,6,2,4]
	 let dias=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
	 if(m<3){
	 	y=y-1;
	 }
	 w=(y+y/4-y/100+y/400+constantes[m-1]+d)% 7;
	 return dias[w];
}
function cumple(cad){
    let y,m,d
    [y,m,d]=cad.match(/(\d)+/g) 
    return d.padStart(2,"0")+"/"+m.padStart(2,"0")+"/"+y;
}
function genero(boole){
    if(boole){
        return "Hombre";
    }
    else{
        return "Mujer";
    }
}
