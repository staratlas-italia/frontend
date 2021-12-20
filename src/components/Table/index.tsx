import { useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import { Loader } from "~/components/common/Loader";
import { Flex } from "~/components/layout/Flex";

type Props<T extends object> = {
  columns: any[];
  data: T[];
  fetchData?: () => void;
  loading?: boolean;
};

export const Table = <T extends object>({
  columns,
  data,
  fetchData,
  loading,
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  useEffect(() => fetchData?.(), [fetchData]);

  return (
    <table {...getTableProps({ className: "table-auto text-white" })}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps({
                  ...column.getSortByToggleProps(),
                  className: "px-4 py-2",
                })}
              >
                <Flex align="center">
                  <Flex pr={3}>{column.render("Header")}</Flex>
                  <span>
                    {!(column as any)?.sortDisabled ? (
                      column.isSorted ? (
                        column.isSortedDesc ? (
                          <img src="/images/table/arrow_drop_down_white_24dp.svg" />
                        ) : (
                          <img src="/images/table/arrow_drop_up_white_24dp.svg" />
                        )
                      ) : (
                        <Flex as="span" direction="col" className="-space-y-3">
                          <img src="/images/table/arrow_drop_up_white_24dp.svg" />
                          <img src="/images/table/arrow_drop_down_white_24dp.svg" />
                        </Flex>
                      )
                    ) : null}
                  </span>
                </Flex>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps({ className: "divide-y-2 divide-white" })}>
        {loading ? (
          <tr>
            <td colSpan={10000}>
              <Flex justify="center" py={5}>
                <Loader />
              </Flex>
            </td>
          </tr>
        ) : (
          rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
