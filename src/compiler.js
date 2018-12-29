import { setStatic, defaultProps, compose } from 'recompose';
import { Table, Column, Cell, HeaderCell } from './index';
import './less/index.less';

// import withLocale from './IntlProvider/withLocale';
// import TablePagination from './TablePagination';

const EnhancedLocaleTable = compose(defaultProps({ loadAnimation: true }))(
  Table
);

setStatic('Column', Column)(EnhancedLocaleTable);
setStatic('Cell', Cell)(EnhancedLocaleTable);
setStatic('HeaderCell', HeaderCell)(EnhancedLocaleTable);
// setStatic('Pagination', TablePagination)(EnhancedLocaleTable);

export default EnhancedLocaleTable;
