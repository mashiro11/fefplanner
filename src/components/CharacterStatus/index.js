import React from 'react'
import { PropTypes } from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Character from '../Character'
import Status from '../Status'

const styles = {
  pannel:{
    position: 'fixed',
    left: '10px',
    top: '10px'
  }
}

const CharacterStatus = (props, context) => {
  const closeStatus = () => {
    context.store.dispatch({type: 'CLOSE_STATUS', name: character.name})
  }
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
          <Button size="small" color="primary" onClick={closeStatus}>
            Close
          </Button>
        </Paper>
      </div>
    )
}
CharacterStatus.contextTypes = {
  store: PropTypes.object
}
export default CharacterStatus
