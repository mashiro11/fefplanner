import React from 'react'
import Paper from '@material-ui/core/Paper'
const styles={
  gridContainer:{
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto auto auto auto auto",
    fontSize: 9,
    textAlign: 'center'
  },
  gridCell:{

  },
  paper: {
    padding:2
  },
  greenStyle:{
    fontSize: '14px',
    color: 'green',
    fontWeight: 'bold'
  },
  redStyle:{
    fontSize: '14px',
    color: 'red'
  }
}

const Status = (props) => {
  const { grownthRate, maxModifiers } = props
  let status = ["Hp", "Str", "Mag", "Skill", "Speed", "Luck", "Def", "Res"]
  return(
    <Paper style={styles.paper}>
      <div style={styles.gridContainer}>
          <div></div>
          {status.map((item, index) => <div key={index}>{item}</div>)}
          <div>Status Modifier</div>
          {maxModifiers.map((item, index) =>
            <div key={index}
                       style={item === 0 ? null :
                              item > 0 ? styles.greenStyle : styles.redStyle}
            >{item}</div>
          )}
          <div>Base Grownth</div>
          {grownthRate.map((item, index) =>
            <div key={index}
                       style={item === 50 ? null :
                              item > 50 ? styles.greenStyle : styles.redStyle}
            >{item}</div>
          )}
          <div>Class Grownth</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>Total Grownth</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
    </Paper>
  )
}

export default Status
