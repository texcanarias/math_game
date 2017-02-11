var app = {
    // Application Constructor
    initialize: function () {
        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;

        esperandoResultado = false; //indica si la aplicacion espera a que el usuario meta el resultado
        PosicionDerecha = 0;
        Aciertos = 0;
        Record = 0;
        sndOK = null;
        sndKO = null;

        numerosAdmitidos = [1, 2, 3, 5, 10];
        numerosTotalesAdmitidos = numerosAdmitidos.length;


        this.iniciaBotones();
        this.iniciaFastClick();
        this.update();

    },
    //Iniciar fastclick para acelerar la interactividad
    iniciaFastClick: function () {
        FastClick.attach(document.body);
    },

    iniciaBotones: function () {
        var btnDerecha = document.getElementById('resultado_derecha');
        var btnIzquierda = document.getElementById('resultado_izquierda');

        btnDerecha.addEventListener('click', function () { app.verificarResultado(1); }, false);
        btnIzquierda.addEventListener('click', function () { app.verificarResultado(0); }, false);
    },

    update: function () {
        var Cifras = new Array();
        if (!esperandoResultado) {
            var ResultadoCorrecto = 0;
            var ResultadoIncorrecto = 0;

            while (ResultadoCorrecto == ResultadoIncorrecto) {
                Cifras[0] = numerosAdmitidos[this.getRandomInt(0, numerosTotalesAdmitidos)];
                Cifras[1] = this.getRandomInt(1, 10);
                Cifras[2] = this.getRandomInt(1, 10);

                ResultadoCorrecto = Cifras[0] * Cifras[1];
                ResultadoIncorrecto = Cifras[0] * Cifras[2];
            }

            PosicionDerecha = this.getRandomInt(0, 2);

            var txtOperacion = document.getElementById('operacion');
            var txtResultadoDerecha = document.getElementById('resultado_derecha');
            var txtResultadoIzquierda = document.getElementById('resultado_izquierda');
            txtOperacion.innerHTML = Cifras[0] + " * " + Cifras[1];
            if (PosicionDerecha) {
                txtResultadoDerecha.innerHTML = ResultadoCorrecto;
                txtResultadoIzquierda.innerHTML = ResultadoIncorrecto;
            } else {
                txtResultadoDerecha.innerHTML = ResultadoIncorrecto;
                txtResultadoIzquierda.innerHTML = ResultadoCorrecto;
            }
            esperandoResultado = true;
        }

    },

    //Genera un numero aleatorio entre dos cifras
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    verificarResultado: function (resultadoDerecho) {
        esperandoResultado = false;
        if (resultadoDerecho) {
            if (PosicionDerecha) {
                this.acierto();
            }
            else {
                this.error();
            }
        } else {
            if (PosicionDerecha) {
                this.error();
            }
            else {
                this.acierto();
            }
        }
    },

    acierto: function () {
        //document.getElementById('sndOK').play().then(function(){});

        var txtAciertos = document.getElementById('aciertos');
        var txtRecord = document.getElementById('record');

        Aciertos += 1;
        if (Record < Aciertos) {
            Record = Aciertos;
            txtRecord.innerHTML = Record;
        }
        txtAciertos.innerHTML = Aciertos;

        this.update();
    },

    error: function () {
        /*document.getElementById('sndKO').play().then(function() {*/
            alert('¡Has fallado! Tienes '+Aciertos+' respuestas correctas.');
            if(Aciertos == Record){
                alert('Has conseguido un nuevo record.');
            }
        /*});*/

        Aciertos = 0;

        var txtAciertos = document.getElementById('aciertos');
        txtAciertos.innerHTML = Aciertos;

        this.update();        
    }

};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        app.initialize();
    }, false);
}
