const numeroColores = new Array(2).fill(0);  //Array con contadores 
const colores = ['blue', 'red'];  //Array con nombre de div

$(document).ready (() => {  //Justo se inicie el documento/html que pueda crear postits mediante el boton 'Crear Post-it'

    $('#crearPostits').on('click', (e) =>  {   //Evento para crear los divs, llamando a una funcion
        e.preventDefault();
        $('#crearPostits').crearPostits();  //Creacion de los post-its
    });

});

jQuery.fn.crearPostits = function() {
    let random = Math.floor((Math.random() * 2) + 0);  //Eleccion aleatoria entre 0 i 1
    let newDiv;   //Creacion nuevo div

    if(random == 0 || random == 1) {
        newDiv = '<div class="' + colores[random] + '"><button class="borrar">X</button><button class="minimizar">-</button><input type="text"></input><textarea></textarea></div>';
    }     //Si es 1/0 se creara el div

    $('#container').append(newDiv);   //Añadimos el div en el container de divs(parent)

    $(() => {
        //Hacemos que estos divs sean draggable(se puedan mover), y resizable(qyue puedan cambiar de tamaño)
        $('div.red').draggable().resizable({
            animate: true
        });
        $('div.blue').draggable().resizable({
            animate: true
        });

        $('div.blue').data('drop', false);  // Damos un valor "falso"  a drop para saber si estan o no dropeadas en el div general
        $('div.red').data('drop', false);   // de su color

        //Le damos al div de rojos general la propiedad droppable(se podran soltar los divs)
        $('#red').droppable(
            {accept: ".red",   //Solo aceptara los divs que tengan classname "red"

            out: function( evento, ui ) {  //Si sale del div
                
                if(numeroColores[1] > 0) {
                    numeroColores[1]--;  //Se descuenta el div del contador
                    ui.helper.data('drop', false);  //Cambiamos el valor de data a false otra vez(pq no esta dentro)
                }
               
                $('#counterRed').text(numeroColores[1]);  // Actualizamos el contador de la pantalla
            },

            drop: (evento, ui) => {  // Al soltar el div dentro del div de su color
                if(!ui.helper.data('drop')) {
                    ui.helper.data('drop', true);  //Cambiamos la propiedad drop a true
                    numeroColores[1]++; //I subimos el contador de su color
                }
                $('#counterRed').text(numeroColores[1]);  // Actualizamos el contador por pantalla
            }
        });

        //Le damos al div de azules general la propiedad droppable(se podran soltar los divs)
        $('div#blue').droppable({
            accept: ".blue",    //Solo aceptara los divs que tengan classname "blue"

            out: function( evento, ui ) {  //Si sale del div

                if(numeroColores[0] > 0) {
                    numeroColores[0]--;   //Se descuenta el div del contador
                    ui.helper.data('drop', false);  //Cambiamos el valor de data a false otra vez(pq no esta dentro)  
                }
               
                $('#counterBlue').text(numeroColores[0]);    // Actualizamos el contador de la pantalla

            },

            drop: (evento, ui) => {     // Al soltar el div dentro del div de su color
                if(!ui.helper.data('drop')) {
                    ui.helper.data('drop', true);   //Cambiamos la propiedad drop a true
                    numeroColores[0]++;   //I subimos el contador de su color
                }
                $('#counterBlue').text(numeroColores[0]);     // Actualizamos el contador de la pantalla
            }
        });

        $('.borrar').on('click', borrarPostits);   //Al clicar en borrar llamamos a la funcion
        
        $('.minimizar').on('click', minimizarMaximizar);   //Al minimizar el div
        
        $('input').on('input', updateInput);  //Al cambiar el titulo del post-it
       
        $('textarea').on('input', updateTextarea);  //Al cambiar el texto del post-it
         
    });
}

//Funcion al actualizar el input i guardar la informacion del titulo en el data del propio div
function updateInput() {
    let elemento = $(this);
    elemento.parent().data('input', $(this).val());  //Guardamos la informacion del input en el data para utilizatrla posteriormente
}

//Funcion al actualizar el textarea i guardar la informacion del texto en el data del propio div
function updateTextarea() {
    let elemento = $(this);
    elemento.parent().data('textarea', $(this).val());   //Guardamos la informacion del texxtarea en el data para utilizatrla posteriormente
}

//Funcion de maximiar o minimizar el div del por¡st-it
function minimizarMaximizar () {
    let boton = $(this);  //El this es el boton
    let div = boton.parent();

    div.css({  //Al minimizar sera de 150px X 100px
        height: 150,
        width: 100
    });

    boton.removeClass('minimizar').addClass("maximizar"); //Cambiamos pla clase de minimizar a maximizar
    boton.text('+');  //I el boto de - a +

    $('.maximizar').on('click', function () {  //Al clicar el boton + del div
        let boton = $(this);  //Guardamos el boton propio en boton
        let div = boton.parent();  //Guardamos que div es ell que se modificara

        div.css({  //Al maximizar sera de 200px X 170px
            height: 200,
            width: 170
        });

        boton.removeClass('maximizar').addClass("minimizar");  //Cambiamos la clase de maximizar a minimizar
        boton.text('-');  //I el texto del boton de + a -

        $('.minimizar').on('click', minimizarMaximizar);  //Al clicar el boton con clase de minimizar sera recursiva y volvera a empezar la propia funcion
    });
}

function borrarPostits() {
    //NO FUNCIONEN ES CONTADORS CORRECTAMENT
    /*
    if($(this).parent().hasClass('red')) {
        numeroColores[1]--;
        $('#counterRed').text(numeroColores[1]);

    } else {
        numeroColores[0]--;
        $('#counterBlue').text(numeroColores[0]);
    }
    */
    $(this).parent().remove();
}

