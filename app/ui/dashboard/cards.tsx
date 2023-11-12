/* import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline'; */

/* const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
}; */

// export default async function CardWrapper() {
//   return (
//     <>
//       {/* NOTE: comment in this code when you get to this point in the course */}

//       {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
//       <Card title="Pending" value={totalPendingInvoices} type="pending" />
//       <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
//       <Card
//         title="Total Customers"
//         value={numberOfCustomers}
//         type="customers"
//       /> */}
//     </>
//   );
// }

export function Card({
  titulo,
}: {
  titulo: string;

}) {
  // const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gradient-to-r from-violet-800 to-blue-400 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm text-stone-50 font-medium">{titulo}</h3>
      </div>
      {/* <p
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p> */}
    </div>
  );
}
