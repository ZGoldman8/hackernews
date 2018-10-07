import React, { Component } from "react"
import "./App.css"

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectId: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectId: 1
  }
]

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list,
      searchTerm: ""
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectId !== id)
    this.setState({ list: updatedList })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, list } = this.state
    return (
      <div className="page">
        <div className="interactions">
        <Search value={searchTerm} onChange={this.onSearchChange}>
          Search
        </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    )
  }
}

const Search = ({ value, onChange, children }) =>
        <form>
            {children}
            <input type="text" value={value} onChange={onChange}/>
        </form>

const Table = ({ list, pattern, onDismiss }) =>
      <div className="table">
        {list.filter(isSearched(pattern)).map(item => (
          <div key={item.objectId} className="table-row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button
                  onClick={() => onDismiss(item.objectId)}
                  className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        ))}
      </div>

const Button = ({ onClick, className, children}) =>
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>

export default App
