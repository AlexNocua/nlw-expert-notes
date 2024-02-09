import * as Dialog from "@radix-ui/react-dialog";
import { ptBR } from 'date-fns/locale'

//importacion de librerias de imagenes

import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

//libreria de alertas
import { toast } from "sonner";



interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
}
//cvariable global
let speechRecognition: SpeechRecognition | null = null

export function NewNodeCard({ onNoteCreated }: NewNoteCardProps) {
    // Comienzo de los estados para la manipulacion de los datos
    const [shouldShowOnboarding, setShouldShowboarding] = useState(true);

    //creacion del arreglo para recuperar los datos de nustro text area
    const [content, setContent] = useState('');


    //Creacion de estado de recorte
    const [isRecording, setIsRecording] = useState(false);



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
        if (content === '') {
            toast.warning('Tem que salvar algum tipo de nota já seja áudio ou texto.')
            return
        }
        //Una nota creada pasando nuestro contenido
        onNoteCreated(content)
        //alerta 


        //resetar contennido de mi text area
        setContent('')
        //volver a mostrar el mensaje despues de guardar la nota
        setShouldShowboarding(true)



    }

    //funcion de nuestro grabado de audio 
    //Tener en cuneta la creacion de mas estados par a la manipulacion de esta funcion
    function handleStartRecording() {


        //iniciacion de la gravacion de audio
        //en todo booleable yo hago una pregunta
        //quiero saber que si eso esta en --- o esta en ---
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
            || 'webkitSpeechRecognition' in window

        if (!isSpeechRecognitionAPIAvailable) {
            alert('Infelizmente seu navegador nao suporta a API de gravacao')
            return
        }

        //al iniciar la grabacion 
        setIsRecording(true)
        //
        setShouldShowboarding(false)

        //si la API esta disponible

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        speechRecognition = new SpeechRecognitionAPI()
        //cambiar el idioma
        speechRecognition.lang = 'pt-BR'
        //el no va a parar de gravar hasta que yo lo cambie
        speechRecognition.continuous = true
        //alternativas de las palabras que crees que es
        speechRecognition.maxAlternatives = 1
        //traer resultados segun voy hablando
        speechRecognition.interimResults = true
        //esta funcion va a ser llamada cada vez que se escuche algo
        speechRecognition.onresult = (event) => {
            console.log(event.results)

            //quiero obtener todos los resultados 
            //cualquier tipo de iterator que puedocambiar a un arreglo 
            //este reduce es para que todos los valores de nuestro arreglo en una sola informacion 
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')
            //trascribo y actualizo mi informacion 
            setContent(transcription)
        }
        //funcion que retorna un error 
        speechRecognition.onerror = (event) => {
            console.log(event)
        }
        //esto es para que inicie nuestro grabado
        speechRecognition.start()
    }

    function handleStopRecording() {
        setIsRecording(false)
        //como no se conce esta vatiable
        //por que se cambia a nua variable global

        if (speechRecognition !== null) {
            speechRecognition.stop()
        }


    }

    //
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
                <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col md:h-[60vh] outline-none overflow-hidden">
                    {
                        //Creacion de boton de cerrar
                    }

                    <Dialog.Close className=" absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-300">
                        <X className="size-5" />
                    </Dialog.Close>

                    <form className="flex-1 flex flex-col">

                        <div className="flex flex-1 max flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300'>
                                Adicionar nota
                            </span>
                            { // esta es otra forma de IF
                                shouldShowOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comence <button type="button" onClick={handleStartRecording} className="text-lime-400 hover:underline">gravando uma nota</button> de áudio ou se preferir <button onClick={handleStartEditor} className="text-lime-400 hover:underline">utilize apenas texto</button>.
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
                                        value={content}
                                    >
                                        {/*
                                        value=content es para que cada ves que aplique el handlecontentchange el valor de contenido se limpie
                                        onChange es un evento que es disparado cuando la ffente digita dentro del texttarea */}
                                    </textarea>

                                )
                            }
                        </div>

                        {//si ese estado se mantiene en true
                        }
                        {isRecording ? (
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
                                onClick={handleStopRecording}
                            >
                                {
                                    //revisar grup para tener en cuenta el hover desde clases padre a calses hijas
                                    //en este caso group desde la clase padre button y se define en el hijo lo que quiera configurar
                                }
                                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                                Gravando! (clique p/ interrumper)
                            </button>
                        ) : (<button
                            type="button"
                            className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                            onClick={handleSaveNote}
                        >
                            {
                                //revisar grup para tener en cuenta el hover desde clases padre a calses hijas
                                //en este caso group desde la clase padre button y se define en el hijo lo que quiera configurar
                            }

                            Salvar nota
                        </button>)
                        }



                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}