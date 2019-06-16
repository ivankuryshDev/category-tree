import React, { Component } from 'react';

import './Category.css';
import Node from './Node/Node'

class IterativeTree extends Component {
  queue = [];

  // fill the line by the nodes
  fillQueue(matrix, queue) {
    const arrayForNextIteration = [];
    matrix.forEach((array) => {
      array.forEach((element) => {
        if (!Array.isArray(element)) {
          this.pushToQueue(queue, element);
        } else {
          arrayForNextIteration.push(element);
        }
      });
    });

    if (arrayForNextIteration.length !== 0) {
      this.fillQueue(arrayForNextIteration, queue);
    }
  }

  // push the item into the line
  pushToQueue = (queue, item) => {
    queue.push(item);
  }

  // pop the item from the line
  popFromQueue = (queue) => {
    const first = queue[0];
    queue.splice(0, 1);
    return first;
  }

  // fill tree's nodes
  fillTree() {
    this.queue.forEach((element, index) => {
      if (element !== null) {
        document.getElementById(element).innerHTML = `${element}<sup>[${index}]</sup>`;
      }
    });
  }

  componentDidMount() {
    // fill a tree
    this.fillTree();
  }

  componentDidUpdate() {
    // update a tree
    this.fillTree();
  }

  render() {
    // Create a nodes' queue
    this.queue = [];
    const arrayConvertor = [];
    arrayConvertor.push(this.props.categoriesArray); // convert a vector into a matrix
    this.fillQueue(arrayConvertor, this.queue);

    return (
      <div>
        <Node
          treeArray={this.props.categoriesArray}
          onAddCategory={this.props.onAddCategory} />
      </div>
    );
  }
}

export default IterativeTree;