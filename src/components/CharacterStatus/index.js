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
            <Grid item xs={3} sm={3} lg={3}>
              <Character character={ character } />
            </Grid>
            <Grid item xs={9} sm={9} lg={9}>
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
