'use client'
import { useForm } from 'react-hook-form';
import { Proceso } from '@/app/lib/definitions';
import { addProceso } from '@/scripts/db';


export default function AddProcesoForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Proceso>();

    const onSubmit = async (data: Proceso) => {
        // Handle form submission here
        addProceso(data);
    };

    return (
        <div className="m-auto p-6 flex sm:w-full lg:w-1/2 flex-col gap-4 bg-white">
            <h1 className="bold text-2xl">Crear proceso de selección</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título del puesto</label>
                    <input
                        id="titulo"
                        type="text"
                        autoComplete="off"
                        {...register('titulo', { required: 'This field is required' })}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.titulo && <span className="text-red-500">{errors.titulo.message}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion del puesto</label>
                    <textarea
                        id="descripcion"
                        rows={12}
                        autoComplete="off"
                        {...register('descripcion', { required: 'This field is required' })}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                    {errors.descripcion && <span className="text-red-500">{errors.descripcion.message}</span>}
                </div>
                <div className="flex w-full justify-end pt-2">
                    <button
                        type="submit"
                        className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    >
                        Crear proceso
                    </button>
                </div>
            </form>
        </div>
    );
}
