import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
const styles={
  container:{
    height: 48,
  },
  closeButton: {
    position:'relative',
    right: 0
  },
  backgroundColor: 'blue',
  button:{
    cursor: 'pointer',
    width: 24,
    height: 12,
    backgroundColor: '#DDDDDD'
  },
  hiddenButton:{
    height: 12
  }
}

class ToolBox extends React.Component {
  constructor(props){
    super(props)
    this.state={
      hover: false
    }
  }

  toggleOver = () => {
    this.setState({hover: !this.state.hover})
  }

  render(){
    const deleteButton = 'x'
    const { topButtomTitle } = this.props
    const { bottomButtomTitle } = this.props

    const { children } = this.props

    return(
      <div onMouseEnter={this.toggleOver}
          onMouseLeave={this.toggleOver}
          style={styles.container}>
          <div>
            {this.state.hover?
              <div style={styles.button} title={topButtomTitle}>
                {this.props.top === 'delete' ? deleteButton: '^'}
              </div>
            : <div style={styles.hiddenButtom}>.</div>
            }
            {children}
            {this.state.hover?
              <div style={styles.button} title={bottomButtomTitle}>
                {this.props.top === 'move' ? deleteButton : 'v'}
              </div>
              : <div style={styles.hiddenButtom}> </div>
            }
          </div>
      </div>
    )
  }
}

export default ToolBox
