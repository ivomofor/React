import React, {Component} from 'react';
import './App.css';

const list = [
  {
  title: 'React',
  url: 'https://facebook.github.io/react/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  },
  {
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
  },
  ];
const searchInputData =(searchTerm) => {
  return (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {list, searchTerm:''}
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(id){
    const isNotList = (item) => item.objectID !== id;
    const updateList = this.state.list.filter(isNotList);
      this.setState({list:updateList});
  }
  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }
  render(){
    const {searchTerm, list} = this.state;
    return(
      <div className="page">
        <div className="interactions">
        <Search value ={searchTerm} onChange = {this.onSearchChange}>Search</Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  } 
} 
const Search = ({value, onChange, children})=> 
  <form>
    {children}<input type="text" value={value} onChange = {onChange}/>
  </form> 

const Table = ({list, pattern, onDismiss})=>
  <div className="table">
    {list.filter(searchInputData(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}>><a href={item.url}>{item.title}</a></span>
            <span style={{ width: '30%' }}>>{item.author}</span>
            <span style={{ width: '10%' }}>>{item.num_comments}</span>
            <span style={{ width: '10%' }}>>{item.points}</span>
            <span style={{ width: '10%' }}>>
              <Button onClick={()=>{onDismiss(item.objectID)}} className="button-inline">Button</Button>
            </span>
          </div> 
        )}
  </div>
const Button = ({onClick, children, className=""}) =>
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>

export default App;