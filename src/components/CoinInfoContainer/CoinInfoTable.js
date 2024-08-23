import * as React from "react";
import {
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  useTableSort,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";

const items = [
  {
    currency: { label: "BTC USDT", icon: "/image/currency/btc.png" },
    lastPrice: 60300.01,
    rate: 1.55,
  },
  {
    currency: { label: "ETH USDT", icon: "/image/currency/eth.png" },
    lastPrice: 2600.06,
    rate: 0.17,
  },
  {
    currency: { label: "BNB USDT", icon: "/image/currency/bnb.png" },
    lastPrice: 577,
    rate: 4.13,
  },
  {
    currency: { label: "XRP USDT", icon: "/image/currency/xrp.png" },
    lastPrice: 0.5959,
    rate: 0.97,
  },
  {
    currency: { label: "ADA USDT", icon: "/image/currency/ada.png" },
    lastPrice: 0.3716,
    rate: 3.94,
  },
  {
    currency: { label: "SOL USDT", icon: "/image/currency/sol.png" },
    lastPrice: 142.65,
    rate: 2.11,
  },
  {
    currency: { label: "DOGE USDT", icon: "/image/currency/doge.png" },
    lastPrice: 0.10515,
    rate: 1.57,
  },
  {
    currency: { label: "DOT USDT", icon: "/image/currency/dot.png" },
    lastPrice: 4.622,
    rate: 1.9,
  },
  {
    currency: { label: "LTC USDT", icon: "/image/currency/ltc.png" },
    lastPrice: 63.2,
    rate: 1.41,
  },
  {
    currency: { label: "TRX USDT", icon: "/image/currency/trx.png" },
    lastPrice: 0.1563,
    rate: -2.13,
  },
  {
    currency: { label: "SHIB USDT", icon: "/image/currency/shib.png" },
    lastPrice: 0.00001412,
    rate: 3.29,
  },
  {
    currency: { label: "AVAX USDT", icon: "/image/currency/avax.png" },
    lastPrice: 24.39,
    rate: 6.04,
  },
];

const columns = [
  createTableColumn({
    columnId: "currency",
    compare: (a, b) => a.currency.label.localeCompare(b.currency.label),
  }),
  createTableColumn({
    columnId: "lastPrice",
    compare: (a, b) => a.lastPrice - b.lastPrice,
  }),
  createTableColumn({
    columnId: "rate",
    compare: (a, b) => a.rate - b.rate,
  }),
];

export const CoinInfoTable = () => {
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        defaultSortState: {
          sortColumn: "currency",
          sortDirection: "ascending",
        },
      }),
    ]
  );

  const headerSortProps = (columnId) => ({
    onClick: (e) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <Table sortable aria-label="Table with sort">
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps("currency")}>
            Currency
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("lastPrice")}>
            Latest Price
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("rate")}>
            Daily Rise
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.currency.label}>
            <TableCell>
              <TableCellLayout
                media={<Avatar image={{ src: item.currency.icon }} />}
              >
                {item.currency.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>{item.lastPrice}</TableCellLayout>
            </TableCell>
            <TableCell>
              {item.rate > 0 ? `+${item.rate}%` : item.rate < 0 ? `${item.rate}%` : '0%'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
