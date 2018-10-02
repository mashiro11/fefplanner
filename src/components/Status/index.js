import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
const styles={
  paper: {
    margin: 20,
    padding:10
  },
  table: {
    width: 100
  },
  greenStyle:{
    color: 'green',
    fontWeight: 'bold'
  },
  redStyle:{
    color: 'red',
    textalign: 'center'
  }
}

const Status = () => {
  return(
    <Paper style={styles.paper}>
      <Table style={styles.table}>
        <TableHead>
          <TableRow style={styles.tableRow}>
            <TableCell>Status</TableCell>
            <TableCell >Hp</TableCell>
            <TableCell>Str</TableCell>
            <TableCell>Mag</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Luck</TableCell>
            <TableCell>Def</TableCell>
            <TableCell>Res</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Status Modifyer</TableCell>
            <TableCell>Hp</TableCell>
            <TableCell>Str</TableCell>
            <TableCell>Mag</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Luck</TableCell>
            <TableCell>Def</TableCell>
            <TableCell>Res</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Base Grownth</TableCell>
            <TableCell>HP</TableCell>
            <TableCell>Str</TableCell>
            <TableCell>Mag</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Luck</TableCell>
            <TableCell>Def</TableCell>
            <TableCell>Res</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Class Grownth</TableCell>
            <TableCell>HP</TableCell>
            <TableCell>Str</TableCell>
            <TableCell>Mag</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Luck</TableCell>
            <TableCell>Def</TableCell>
            <TableCell>Res</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Grownth</TableCell>
            <TableCell>HP</TableCell>
            <TableCell>Str</TableCell>
            <TableCell>Mag</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Luck</TableCell>
            <TableCell>Def</TableCell>
            <TableCell>Res</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default Status
