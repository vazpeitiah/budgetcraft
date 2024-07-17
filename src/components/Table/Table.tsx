import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo } from 'react'

export interface Column<T> {
  id: string
  header: React.ReactNode
  render?: (row: T) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  const columnDefinition = useMemo(() => {
    return columns.map((column) => {
      return {
        accessorKey: column.id,
        id: column.id,
        header: column.header,
        cell: (cell) => {
          if (column.render) {
            return column.render(cell.row.original)
          }
          return cell.getValue() as React.ReactNode
        }
      } as ColumnDef<T>
    })
  }, [columns])

  const table = useReactTable({
    data,
    columns: columnDefinition,
    getCoreRowModel: getCoreRowModel<T>()
  })

  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
