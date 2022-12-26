require('colors')

const { default: inquirer } = require('inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirers');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear()


const main = async () => {

    let opt = ''

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

//    await pausa();

    do {

        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                const desc = await leerInput('Descripción: ');
                const ok = await confirmar('¿Esta seguro de querer crear la tarea?')
                if ( ok){
                    tareas.crearTarea(desc)
                }
                break;

            case '2':    
                tareas.listadoCompletado()
                break;

            case '3':
                tareas.listarPendientesCompletadas(true)
                break;

            case '4':
                tareas.listarPendientesCompletadas(false)
                break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':    
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0'){
                    const ok = await confirmar('¿Esta seguro?');
    
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log("Tarea Borrada exitosamente");
                    }
                }
                break;

        }


        guardarDB(tareas.listadoArr)


        if (opt !== '0') {
            await pausa()
        }

    } while (opt !== '0');

}




main()