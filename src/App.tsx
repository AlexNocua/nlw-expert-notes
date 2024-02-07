
//importacion de imagenes
import logo from './assets/logo-nlw-expert.svg'
import { NewNodeCard } from './components/new-node-card'
import { NodeCard } from './components/node-card'

//Creacion de objeto
const note = {
  date: new Date(),
  content: 'hello word' //respetar el tipo de dato en la creacion de los objetos
}

export function App() {

  return (//mx margen
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt='NLW Expert' />

      <form className="w-full ">

        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500' />
      </form>
      <div className="h-px bg-slate-700">
        <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

          <NewNodeCard />
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

          <NodeCard note={note}></NodeCard>



        </div>
      </div>
    </div>

  )
}

export default App
