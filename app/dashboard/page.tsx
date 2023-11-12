import { PlusIcon } from "@heroicons/react/24/outline";
import Grid from "../ui/dashboard/grid-container";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <>
            <h1 className={`mb-4 text-xl font-normal md:text-2xl`}>Procesos de selección abiertos</h1>
            <Link className="flex h-[48px] w-[200px] grow items-center justify-center gap-2 rounded-md text-slate-50 bg-purple-600  hover:bg-purple-400 hover:text-slate-800 flex-none justify-start p-2 px-3 mb-4"
                href="/intercept">
                <div className="block">Crear proceso</div>
                <PlusIcon className="w-6" />
            </Link>
            <Grid />
        </>
    );
}