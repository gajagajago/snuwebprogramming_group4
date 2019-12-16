import React, {Component} from 'react';
import {Button} from 'reactstrap';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

class TodoItemList extends Component {
  render() {
    const {todos, onToggle, onRemove} = this.props;
    console.log('여기는 todolist class')
    console.log(todos);
    const todoList = todos.map(({id, text, done}) => (
      <div>
          <Checkbox
            checked={done}
            value="secondary"
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
            {text}
          <div className = "remove" onClick = {(e) => {
            e.stopPropagation();
          }}></div>
      </div>
    ))
    return todoList;
  }
}

class Schedule extends Component {
  id = 0;
  p;

  state =  {
    preValue: '',
    input: '',
    todos: [
      {id:0, text: '', done: false},
    ]
  }
  container = [];
  getId = () => ++this.id;

  setPost = (arr) => {
    this. p = new TodoItemList(this.contianer);
  }

  TodayOnChange = (e) => {
    const value = e.target.value;
    this.state.input = value;
  };

  TodayOnInsert = (e) => {
    const {input, todos} = this.state;
    if(input) {
      const newTodos = [
        ...todos,
        {
          id: this.getId(this.id),
          text: input,
          done: false
        }
      ];
      this.state = {
        preValue: input,
        input: '',
        todos: newTodos
      };
      document.getElementById('todayText').value = '';
      this.container.push({id:this.id, text: input, done: false});
      console.log(this.container);
      this.setPost();
    };
  }

  handleCreate = (e) => {

  };

  todayTodoList = (e) => {
    document.getElementById('todayTodo').style.visibility = 'visible';
    document.getElementById('weeklyTodo').style.visibility = 'hidden';
    document.getElementById('monthlyTodo').style.visibility = 'hidden';
  }

  weeklyTodoList = (e) => {
    document.getElementById('weeklyTodo').style.visibility = 'visible';
    document.getElementById('monthlyTodo').style.visibility = 'hidden';
    document.getElementById('todayTodo').style.visibility = 'hidden';

  }
  monthlyTodoList = (e) => {
    document.getElementById('monthlyTodo').style.visibility = 'visible';
    document.getElementById('weeklyTodo').style.visibility = 'hidden';
    document.getElementById('todayTodo').style.visibility = 'hidden';
  }
  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.TodayOnInsert(e);
    }
  }
 
render() {
  const { preValue } = this.state.preValue;
  const {
    TodayOnChange,
    handleKeyPress,
    TodayOnInsert
  } = this;
return (
  <div>
    <div>
      <Button className="ui button" onClick={this.todayTodoList}> Today </Button>
      <Button className="ui button" onClick={this.weeklyTodoList}> Week </Button>
      <Button className="ui button" onClick={this.monthlyTodoList}> Month </Button>
    </div>
    <div style={{ position: 'relative', top:'20px'}}>
      <form className="ui form" id = "weeklyTodo" 
      style = {{visibility: 'hidden', position: 'absolute'}}> 
      <div> 이번주 ToDo List </div>  
      </form>
      <form className="ui form" id = "monthlyTodo" 
      style = {{visibility: 'hidden', position: 'absolute'}}>
      <div> 이번달 ToDo List </div>
      </form>
      <form className="ui form" id = "todayTodo" 
      style ={{visibility: 'hidden', position: 'absolute'}}>
      <div> 오늘의 ToDo List </div>  
      <div style = {{
          display: 'inline-block',
          margin: '0 auto',
          position : 'relative'
        }} onChange = {TodayOnChange}>
        <Input id = 'todayText' placeholder="add your Task" 
        inputProps={{ 'aria-label': 'description' }} />
        <Button className="ui form" onKeyPress = {handleKeyPress}
        onClick = {TodayOnInsert} color = "blue" style = {{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginLeft: '1rem',
          cursor: 'pointer'
        }} >추가</Button>
        </div>
        {console.log(this.container)}
        <TodoItemList todos = {this.container}/>
      </form>
    </div>
  </div>  
)
};
}
export default Schedule;
