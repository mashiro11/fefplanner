import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Character from '../Character'
import Status from '../Status'
import Images from '../../images/images.js'

const styles = {
  pannel:{
    position: 'fixed',
    left: '10px',
    top: '10px'
  }
}

class CharacterStatus extends React.Component {
  constructor(props, context){
    super(props, context)
  }

  render(){
    return (
      <div>
      { this.props.status.name !== undefined &&
        (
          <Paper style={styles.pannel}>
            <Grid container xs={12} sm={12} lg={4} xl={2}>
              <Grid item>
                <Character info={ this.props.status.name } />
              </Grid>
              <Grid item>
                <Status />
              </Grid>
            </Grid>
          </Paper>
        )
      }
      </div>
    )
  }
}

CharacterStatus.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    status: state.status
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStatus)
