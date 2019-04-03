import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Character from '../Character'
import Status from '../Status'

const styles = {
  pannel:{
    position: 'fixed',
    left: '10px',
    top: '10px'
  }
}

const CharacterStatus = (props) => {
  const { character } = props
    return (
      <div>
        <Paper style={styles.pannel}>
          <Grid container>
            <Grid item xs={2} sm={2} lg={2}>
              <Character info={ character.name } />
            </Grid>
            <Grid item xs={2} sm={2} lg={2}>
              <Status
                grownthRate={ character.grownthRate }
                maxModifiers={ character.maxModifiers }
                />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
}

export default CharacterStatus
