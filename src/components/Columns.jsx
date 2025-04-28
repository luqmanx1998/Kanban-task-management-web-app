import ColumnItem from "./ColumnItem"

function Columns({activeBoard}) {
  return (
    <>
    {activeBoard.columns.map((column, i) => (
        <ColumnItem key={i} column={column} i={i}/>
      ))}
    </>
  )
}

export default Columns
