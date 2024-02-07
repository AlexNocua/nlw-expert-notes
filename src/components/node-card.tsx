//aplicacion typeScript para definir las ppropiedaddes de nuestros componentes

// interface NoteCardProps {
//     date: Date;
//     content: string;
// }

import * as Dialog from "@radix-ui/react-dialog";
import { format, formatDistanceToNow } from "date-fns";
//importacion de libreria mara manejo de datos
import { formatDistance } from "date-fns/formatDistance";
import { ptBR } from 'date-fns/locale'

//importacion de librerias de imagenes

import { X } from "lucide-react";



//objeto
interface NoteCardProps {
    note: {
        date: Date;
        content: string;
    }

}



// export function NodeCard(props: NoteCardProps) {
//tener en cuenta la instancia de interfaces normales y objetos
export function NodeCard({ note }: NoteCardProps) {
    // Definimos que tiene que tener estas propiedades
    return (

        //utilizacion de componentes de radix
        <Dialog.Root>

            <Dialog.Trigger className='rounded-md text-left flex flex-col bg-slate-800 my-3 p-5 gap-3  overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400'>
                <span className='text-sm font-medium text-slate-300'>
                    {
                        //Despues de anexar propiedades hay que recordar eque en react  si se ñpñaman esas propiedades se colocan entre corchetes.
                        note.date.toISOString()}
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                </p>
                {note.content}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            {/*Dialog portal es para que me mande este cintenido a la raiz del proyecto*/}

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
                            {//Despues de anexar propiedades hay que recordar eque en react  si se ñpñaman esas propiedades se colocan entre corchetes.
                                //note.date.toISOString()
                            }
                            {formatDistanceToNow(note.date, {
                                locale: ptBR,
                                addSuffix: true
                            })}
                        </span> há
                        <p className='text-sm leading-6 text-slate-400'>
                        </p>
                        {note.content}
                    </div>
                    <button
                        type="button"
                        className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">
                        {
                            //revisar grup para tener en cuenta el hover desde clases padre a calses hijas
                            //en este caso group desde la clase padre button y se define en el hijo lo que quiera configurar
                        }

                        Deseja <span className="text-red-400 group-hover:underline">apagar essa nota?</span>
                    </button>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}