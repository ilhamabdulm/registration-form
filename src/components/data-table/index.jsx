import styles from './styles.module.scss';

const {
  table,
  table_header,
  table_footer,
  table_body,
  table_header__title,
  table_body__row,
  table_body__row_data,
} = styles;

const DataTable = (props) => {
  const {
    columns = [],
    data = [],
    headerSeparator = false,
    pagination = false,
    paginatorInfo,
    scrollX = false,
  } = props;

  const stylesScrollX = {
    display: 'grid',
    width: '120vw',
    // gridTemplateColumns: `repeat(${columns?.length}, 1fr)`,
    gridTemplateColumns: columns
      ?.map((col) => `${col?.span || 1}fr`)
      ?.join(' '),
  };

  return (
    <>
      <div className={table}>
        <header
          className={table_header}
          data-headerseparator={`${headerSeparator}`}
          style={scrollX ? stylesScrollX : {}}
        >
          {columns?.map((col, cIdx) => {
            const equalWidth = 100 / columns?.length;

            return (
              <div
                className={table_header__title}
                style={{
                  width: !scrollX ? col?.width || `${equalWidth}%` : '',
                  textAlign: col?.align || 'left',
                }}
                key={col.title}
              >
                {col.title}
              </div>
            );
          })}
        </header>
        <section className={table_body}>
          {data?.map((dt, dIdx) => {
            return (
              <div
                key={`row-${dIdx}`}
                className={table_body__row}
                style={scrollX ? stylesScrollX : {}}
              >
                {columns?.map((col, cIdx) => {
                  const equalWidth = 100 / columns?.length;
                  return (
                    <div
                      key={`row-col-${cIdx}`}
                      className={table_body__row_data}
                      style={{
                        width: !scrollX ? col?.width || `${equalWidth}%` : '',
                        textAlign: col?.align || 'left',
                      }}
                      data-ellipsis={`${col?.ellipsis || false}`}
                      title={
                        col?.ellipsis
                          ? col?.render
                            ? col?.render(dt[col?.dataIndex], dt, dIdx)
                            : dt[col?.dataIndex]
                          : ''
                      }
                    >
                      {col?.render
                        ? col?.render(dt[col?.dataIndex], dt, dIdx)
                        : dt[col?.dataIndex]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default DataTable;
