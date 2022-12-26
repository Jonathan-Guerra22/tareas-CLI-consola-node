const Tarea = require("./tarea");
require('colors')

class Tareas {

    _listado = {}

    get listadoArr(){
        const listado = []

        Object.keys(this._listado).forEach( key =>{
            listado.push(this._listado[key])
        })

        return listado
    }


    constructor(){
        this._listado={};
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => this._listado[tarea.id] = tarea)
    }

    crearTarea(desc){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea
    }


    listadoCompletado(){

        console.log('\n');
        this.listadoArr.forEach( (tarea,i) =>{

            const idx = `${i+1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completado'.green
                                        : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        })

    }

    listarPendientesCompletadas(completadas = true){

        console.log('\n');
        let contador = 0;

        this.listadoArr.forEach( (tarea) =>{

            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completado'.green
                                        : 'Pendiente'.red;

            if (completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado} el día ${completadoEn}`);
                }
            }else{

                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
        })

    }

    borrarTarea (id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

}



module.exports = Tareas;