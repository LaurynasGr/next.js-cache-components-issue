import { Device } from '../types';
import { Loading } from './loading';

const SimpleTh = ({ children }: React.PropsWithChildren) => <th>{children}</th>;

export function DataTable({ IdentifierComponent = SimpleTh, data, loading }: DataTableProps) {
  return (
    <div className="relative">
      <table className="min-w-full bg-white border border-gray-200 text-black ">
        <thead>
          <tr className="bg-gray-600 text-white [&>th]:border [&>th]:border-gray-200 [&>th]:px-4 [&>th]:py-2">
            <IdentifierComponent>Identifier</IdentifierComponent>
            <th>Name</th>
            <th>Year</th>
            <th>Battery</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="[&>td]:border [&>td]:border-gray-200 [&>td]:px-4 [&>td]:py-2">
              <td>{item.identifier ?? '-'}</td>
              <td>
                {item.manufacturer} {item.model}
              </td>
              <td>{item.year ?? '-'}</td>
              <td>{item.battery_level}%</td>
              <td>{item.created_at}</td>
              <td>{item.updated_at}</td>
            </tr>
          ))}

          {loading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <tr key={item} className="[&>td]:border [&>td]:border-gray-200 [&>td]:px-4 [&>td]:py-2">
                <td>.... ..... .....</td>
                <td>.... ..... .....</td>
                <td>.... ..... .....</td>
                <td>.... ..... .....</td>
                <td>.... ..... .....</td>
                <td>.... ..... .....</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && <Loading />}
    </div>
  );
}

interface DataTableProps {
  IdentifierComponent?: React.FC<React.PropsWithChildren>;
  data: Device[];
  loading?: boolean;
}
