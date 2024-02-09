
//importacion de imagenes
import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNodeCard } from './components/new-node-card'
import { NodeCard } from './components/node-card'

//Creacion de objeto
// const note = {
//   date: new Date(),
//   content: 'hello word' //respetar el tipo de dato en la creacion de los objetos
// }

//mejora de nuestro codigo 

interface Note {
  id: string,
  date: Date,
  content: string
}





export function App() {
  //criacao de nosso estados
  //creacion de estado de buscar nota
  const [search, setSearch] = useState('')






  // useState<Note[]> con esto se habla que este arreglo de notas va a tener este formato 
  // const [notes, setNotes] = useState<Note[]>([
  // la parde de arriba tiene la inciciacion de nuestras noyas con contenidos vacios por lo que la gente necesita crear una arrow function 
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  });
  //inicializacao de nossos olbjetos
  //de esta manera es como se van a ir agregando las notas 



  //creacion de otra funcion para ricibir cada una de los contenidos
  //ese componente recibe una propiedad aue es una funcion que recibe un parametro y no tiene un retorno

  interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
  }

  //Funcion de eliminar nota



  //se cambia el content por el NewNoteCardProps
  function onNoteCreated(content: string) {
    const newNote = {
      //cambiamos esto porque teniendo la suerte puede cxaer el mismo numero de idid: Math.random(),
      id: crypto.randomUUID(),//este va a generar un formato unico de id guardado como string
      date: new Date(),
      content,
      //el contenido de la nota va a ir como parametro
    }
    //ahora necesito salvar cada una de esas informaciones de nuestro arreglo dentro de el
    //en react no se ouede alterar alguna de la sinformaciones ya guardadas
    //por lo que siemore crea una infromacion nueva
    //creacion de este nuevo arreglo ordenado por la fecha de creacion


    //guardado de notas por localStorage

    const noteArray = [newNote, ...notes]
    //const muestraJson = JSON.stringify(noteArray)
    // console.log (muestraJson)
    setNotes(noteArray)
    //Guardado de notas en el locar storage por medio de un json ya que esto no acepta arreglos
    localStorage.setItem('notes', JSON.stringify(noteArray))
  }

  function onNoteDelete(id: string) {
    //crear un nuevo arreglo 
    const noteArray = notes.filter(note => {
      return note.id !== id


    })
    setNotes(noteArray)
    localStorage.setItem('notes', JSON.stringify(noteArray))


  }


  //json = javaScript objet notation 


  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  // console.log(search)


  //si tengo una busqueda pero en ellas tengo un valor vacio
  const filteredNotes = search !== ''

    //n notes busque la palabra y me las pase a minuscula
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    //si esta vacio por favor que retorne el estado inicial de nuestras notas
    : notes

  return (//mx margen ahora se hace responcive
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 '>
      <img src={logo} alt='NLW Expert' />

      <form className="w-full ">

        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />

      </form>
      <div className="h-px bg-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">

          <NewNodeCard onNoteCreated={onNoteCreated} />
          {
            //asi es como se instancia la informacion 
          }
          {/* <NodeCard date={new Date()} content='holaaaa' /> */}


          {
          /* Otra forma pero mas confusa
          
          <NodeCard note={note} />
          <NodeCard note={{
            date: new Date(),
            content: 'hello word' //respetar el tipo de dato en la creacion de los objetos
          }} /> */}


          {//map para recorrer cada una de nuestraas notas asi mismo qu este mismo guarde la jota que esta recibiendo
            //cada nota tiene que tener obligatoriamente la propiedad de key ={note.id} con el fin de tener un valor unico para cada nota
            //con esste id sabe que informacion fue removida o adicionada.
            filteredNotes.map(note => {
              return <NodeCard key={note.id} note={note} onNoteDelete={onNoteDelete} />
            })
          }


        </div>
      </div>
    </div>

  )
}

export default App
