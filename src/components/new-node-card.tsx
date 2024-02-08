import * as Dialog from "@radix-ui/react-dialog";
import { ptBR } from 'date-fns/locale'

//importacion de librerias de imagenes

import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

//libreria de alertas
import { toast } from "sonner";


export function NewNodeCard() {
    // Comienzo de los estados para la manipulacion de los datos
    const [shouldShowOnboarding, setShouldShowboarding] = useState(true);

    //creacion del arreglo para recuperar los datos de nustro text area
    const [content, setContent] = useState('');

    function handleStartEditor() {
        setShouldShowboarding(false);
    }
    // siempore cuando se genera una nueva constante esta tiene que estar "tipada"
    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        //definir contenido en nuestra variable
        setContent(event.target.value)

        //console.log(event.target.value)
        if (event.target.value === '') {
            setShouldShowboarding(true);
        }

    }

    function handleSaveNote(event: FormEvent) {
        // El comportamiento padron de un formulario es simepre redireccionar a otra pantalla
        //en este caso estamos alterando esto para que no me redireccione a ptra tela 
        //importante que como el formulario lo colocamos com submit el boton tiene que ser del mismo tipo submit para que fncione de lo contrario no va a funcionar.F
        console.log(content)
        event.preventDefault()
        //alerta 
        toast.success('Nota criada com suceso.')

    }
    return (
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col text-left rounded-md  bg-slate-700 my-3 p-5 gap-3   outline-none hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400 space-y-3 '>

                <div className='rounded-md bg-slate-700 my-3 p-5 space-y-3 overflow-hidden ' >
                    <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                    <p className='text-sm leading-6 text-slate-400'>Grave una nota de audio...</p>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bg-black/60 inset-0" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col h-[60vh] outline-none overflow-hidden">
                    {
                        //Creacion de boton de cerrar
                    }

                    <Dialog.Close className=" absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-300">
                        <X className="size-5" />
                    </Dialog.Close>

                    <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">

                        <div className="flex flex-1 max flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300'>
                                Adicionar nota
                            </span>
                            { // esta es otra forma de IF
                                shouldShowOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comence <button className="text-lime-400 hover:underline">gravando uma nota</button> de áudio ou se preferir <button onClick={handleStartEditor} className="text-lime-400 hover:underline">utilize apenas texto</button>.
                                        {/* <br />
                            <samp className="text-red-500 flex justify-center text-center pt-10 font-bold text-5xl">
                                React es hermoso. <br />
                                &lt;3

                            </samp> */}
                                    </p>
                                ) : (
                                    <textarea
                                        autoFocus
                                        className="text-sm leading-4 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                        onChange={handleContentChange}
                                    >
                                        {/*onChange es un evento que es disparado cuando la ffente digita dentro del texttarea */}
                                    </textarea>

                                )
                            }
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                        >
                            {
                                //revisar grup para tener en cuenta el hover desde clases padre a calses hijas
                                //en este caso group desde la clase padre button y se define en el hijo lo que quiera configurar
                            }

                            Salvar nota
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}