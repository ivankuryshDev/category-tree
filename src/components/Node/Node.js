import React, { Component } from 'react';

class Node extends Component {
  // generate an id for a key 
  generateId(length) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return id;
  }

  render() {
    const node = this.props.treeArray.map((element) => {
      if (!Array.isArray(element)) {
        // return a category
        return <p key={this.generateId(8)}>
          <span className="category__marker">&bull;</span>
          <span id={this.props.treeArray[0]}></span>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm category__btn"
            data-toggle="modal"
            data-target="#addCategoryModal"
            onClick={() => this.props.onAddCategory(element)}>+</button>
        </p>;;
      } else {
        // return a subcategory
        return <Node
          key={this.generateId(8)}
          treeArray={element}
          onAddCategory={this.props.onAddCategory}/>
      }
    });
    return (
      <div className="category">
        {node}
      </div>
    );
  }
}

export default Node;