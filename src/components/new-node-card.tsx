import * as Dialog from "@radix-ui/react-dialog";
import { ptBR } from 'date-fns/locale'

//importacion de librerias de imagenes

import { X } from "lucide-react";



export function NewNodeCard() {
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

                    <div className="flex flex-1 max flex-col gap-3 p-5">
                        <span className='text-sm font-medium text-slate-300'>
                            Adicionar nota
                        </span>
                        <p className='text-sm leading-6 text-slate-400'>
                            Comence <button className="text-lime-400 hover:underline">gravando uma nota</button> de áudio ou se preferir <button className="text-lime-400 hover:underline">utilize apenas texto</button>.

                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
                        {
                            //revisar grup para tener en cuenta el hover desde clases padre a calses hijas
                            //en este caso group desde la clase padre button y se define en el hijo lo que quiera configurar
                        }

                        Salvar nota
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}