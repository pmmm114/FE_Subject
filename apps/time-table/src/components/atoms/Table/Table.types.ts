import type {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
} from '@libs/shared/shadcn-ui/ui/components/ui/table';

export type TTableProps = React.ComponentProps<typeof ShadcnTable>;

export type TTableHeaderProps = React.ComponentProps<typeof ShadcnTableHeader>;
export type TTableBodyProps = React.ComponentProps<typeof ShadcnTableBody>;

export type TAddTableItemButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;
