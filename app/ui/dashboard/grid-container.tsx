import { Suspense } from "react";
import { Card } from "./cards";
import { fetchProcesos } from "@/app/lib/data";

export default async function Grid() {
    const procesos = await fetchProcesos();
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>

                {procesos.map((proceso) =>
                    <Card key={proceso.id} titulo={proceso.titulo} />
                )}

            </div>
        </Suspense>
    );
}