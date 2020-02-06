import React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Status from '../Status'
import ClassTree from '../ClassTree'
import CharacterSelector from '../CharacterSelector'
import Database from '../../database.js'
import Skill from '../Skill'
import ToolBox from '../ToolBox'

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
    gridTemplateRows: 'auto auto auto',
    fontSize: 9
  },
  closeButton:{
    gridColumn: '1/4'
  }
}

class CharacterStatus extends React.Component{
  constructor(props){
    super(props)
    this.state={
      classSelection: false,
      hasSecondClass: false
    }
  }
  selectCorrinClass = () => {
    this.setState({classSelection: !this.state.classSelection})
  }
  onSelect = (name) => (e) => {
    if(!this.state.hasSecondClass){
      this.props.dispatch({type: 'ADD_CLASS', className: name, corrin: this.props.character})
    }
    this.setState({classSelection: false})
  }
  onClassCancel = () => {
    this.setState({classSelection: false})
  }

  AddSkill = (e) => {
    if(this.props.character.choosenSkills.length < 10)
      this.props.dispatch({type: 'ADD_SKILL', skillName: e.target.alt, characterName: this.props.character.name })
    else
      window.confirm('Character already has 10 skills! Remove a skill to add another')
  }

  SelectChoosenSkills = (index) => (e) =>{
    console.log('clicked')
    this.setState({editingSkill: index})
  }

  shiftSkills = (side, group) => {
    this.props.dispatch({type: 'SHIFT_SKILLS', side: side, group: group})
  }


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
              { character.name === 'Corrin' ?
                <Button onClick={this.selectCorrinClass}>
                  <Paper>Select Class</Paper>
                </Button>
                : null
              }
              {this.state.classSelection?
                <div style={{maxHeight: 120, maxWidth: 150, overflow: 'auto'}}>
                  <CharacterSelector
                    characters={Object.values(Database.classes)
                                      .filter(c => !c.exclusive && c.promotedClasses &&
                                              (!c.sex || character.sex === c.sex) && c.name !== 'NohrPrinc')
                                      .map( c => c.name)}
                    onSelect={this.onSelect}
                    onCancel={this.onClassCancel}/>
                </div>
                : null
              }
            </div>

            <div>
              <div>
              {character.name === 'Corrin' ?
                <div style={{fontSize: 10}}>
                  <span>Boom:</span><span> myboon</span>
                  <span>Bane:</span><span> mybane</span>
                </div>
                :null
              }
              <Status style={styles.status}
                grownthRate={ character.grownthRate }
                maxModifiers={ character.maxModifiers }
                />
              </div>
              <Paper style={styles.skills}>
                <div>
                  <div>Equiped</div>
                  <div style={{display: 'grid', gridTemplateColumns: '10% 80% 10%'}}>
                  <div style={{cursor: 'pointer'}}
                    onClick={this.shiftSkills(-1, 0)}
                    title='Shift skills left'>&lt;</div>
                    <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                      {character.choosenSkills.slice(0, 5).map( (skill, index) =>
                        <ToolBox top='delete' bottomButtomTitle='Unequip' topButtomTitle='Remove' key={index}>
                          <Skill skill={skill} key={index} />
                        </ToolBox>
                      )}
                    </div>
                  <div style={{cursor: 'pointer'}} 
                    onClick={this.shiftSkills(1, 1)}
                    title='Shift skills right'>&gt;</div>
                  </div>
                </div>
                <div>
                  <div>Unquiped</div>
                  <div style={{display: 'grid', gridTemplateColumns: '10% 80% 10%'}}>
                    <div style={{cursor: 'pointer'}}
                      onClick={this.shiftSkills(-1, 0)}
                      title='Shift skills left'>&lt;</div>
                    <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                      {character.choosenSkills.slice(5, 10).map( (skill, index) =>
                        <ToolBox top='move' topButtomTitle='Equip' bottomButtomTitle='Remove' key={index}>
                          <Skill skill={skill} key={index} />
                        </ToolBox>
                      )}
                    </div>
                    <div style={{cursor: 'pointer'}}
                      onClick={this.shiftSkills(1, 1)}
                      title='Shift skills right'>&gt;</div>
                  </div>
                </div>
              </Paper>
            </div>

            <Paper style={styles.classes}>
              <div>Classes (Heart Seal)</div>
              { character.charClass.map( (classTree, index) =>
                <ClassTree classTree={classTree} onSkillClick={this.AddSkill} charName={character.name} charSex={character.sex} key={index}/>
              )}
              {character.isChild?
                <div>
                  <div>Inherited Class (Heart Seal)</div>
                  {character.inheritedClass? <ClassTree classTree={character.inheritedClass} onSkillClick={this.AddSkill} charSex={character.charSex} charName={character.name} /> : null}
                </div>: null
              }
              <div>Support S Class (Partner Seal)</div>
              {character.supportClass ? <ClassTree classTree={character.supportClass} onSkillClick={this.AddSkill} charSex={character.charSex} charName={character.name} /> : null }
              <div>Support A+ Class (Friend Seal)</div>
              {character.friendClass ? <ClassTree classTree={character.friendClass} onSkillClick={this.AddSkill} charSex={character.charSex} charName={character.name} /> : null }
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
