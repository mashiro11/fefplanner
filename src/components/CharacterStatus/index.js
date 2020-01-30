import React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Status from '../Status'
import ClassTree from '../ClassTree'

const styles = {
  pannel:{
    position: 'fixed',
    left: '10px',
    top: '10px',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto'
  },
  picture:{
    position: 'relative',
    top:0,
    left:0,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 100,
    maxHeight: 100
  },
  portrait:{
    display: 'grid',
    gridTemplateColumns: 'auto'
  },
  status:{
    gridColumn: '1 / 3'
  },
  classes:{
    gridColumn: '1 / 3',
    fontSize: 12,
    textAlign: 'left'
  },
  skills:{
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    fontSize: 9
  },
  closeButton:{
    gridColumn: '1/4'
  }
}

class CharacterStatus extends React.Component{
  render(){
    const { character } = this.props
      const closeStatus = () => {
        this.props.dispatch({type: 'CLOSE_STATUS', name: character.name})
      }

    return (
      <div>
        <Paper style={styles.pannel}>
            <div style={styles.portrait}>
              <img style={styles.picture} src={character.portrait} title={character.name} alt={character.name}/>
              <Button size="small" color="primary">
                {character.name}
              </Button>
            </div>

            <div>
              <div>
              {character.name === 'Corrin' ?
                <div style={{fontSize: 10}}>
                  <span>Boom:</span><span>myboon</span>
                  <span>Bane:</span><span>mybane</span>
                </div>
                :null
              }
              <Status style={styles.status}
                grownthRate={ character.grownthRate }
                maxModifiers={ character.maxModifiers }
                />
              </div>
              <Paper style={styles.skills}>
                <div>Selected skills:</div>
                <div>
                    Equiped
                </div>
                <div>
                    Unequiped
                </div>
              </Paper>
            </div>

            <Paper style={styles.classes}>
              <div>Classes (Heart Seal)</div>
              { character.charClass.map( (classTree, index) =>
                <ClassTree classTree={classTree} charName={character.name} charSex={character.sex} key={index}/>
              )}
              {character.isChild?
                <div>
                  <div>Inherited Class (Heart Seal)</div>
                  {character.inheritedClass? <ClassTree classTree={character.inheritedClass} charSex={character.charSex} charName={character.name} /> : null}
                </div>: null
              }
              { character.name === 'Corrin' ?
                <Button><Paper>Select Class</Paper></Button>
                : null
              }
              <div>Support S Class (Partner Seal)</div>
              {character.supportClass ? <ClassTree classTree={character.supportClass} charSex={character.charSex} charName={character.name} /> : null }
              <div>Support A+ Class (Friend Seal)</div>
              {character.friendClass ? <ClassTree classTree={character.friendClass} charSex={character.charSex} charName={character.name} /> : null }
            </Paper>

          <Button style={styles.closeButton} size="small" color="primary" onClick={closeStatus}>
            Close
          </Button>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    status: state.status
  }
}

export default connect(mapStateToProps)(CharacterStatus)
