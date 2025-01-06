import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableHeader as ShadcnTableHeader,
} from '@libs/shared/shadcn-ui/ui/components/ui/table';
import { cn } from '@libs/shared/shadcn-ui/util/lib/utils';
import { getComponentTypeCheck } from '@libs/shared/utils/react/component/composition';

import * as T from './Table.types';

const TableHeader = ({ children, className, ...rest }: T.TTableHeaderProps) => {
  return (
    <ShadcnTableHeader className={cn(className)} {...rest}>
      {children}
    </ShadcnTableHeader>
  );
};

const TableBody = ({ children, className, ...rest }: T.TTableBodyProps) => {
  return (
    <ShadcnTableBody className={cn(className)} {...rest}>
      {children}
    </ShadcnTableBody>
  );
};

/**
 * 테이블
 */
function Table({ children, className, ...rest }: T.TTableProps) {
  const _tableHeader = getComponentTypeCheck({ children }, TableHeader.name);
  const _tableBody = getComponentTypeCheck({ children }, TableBody.name);

  return (
    <ShadcnTable className={cn('border', className)} {...rest}>
      {_tableHeader}
      {_tableBody}
    </ShadcnTable>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
