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
    return (
      <div>
        <Paper style={styles.pannel}>
          <Grid container xs={12} sm={12} lg={4} xl={2}>
            <Grid item>
              <Character info={ props.character.name } />
            </Grid>
            <Grid item>
              <Status />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
}

export default CharacterStatus
