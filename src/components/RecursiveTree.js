import React, { Component } from 'react';

import './Category.css';

class RecursiveTree extends Component {
  generateId(length) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return id;
  }

  render() {
    let categoryStyle = 'category';
    let category = this.props.categoriesArray.map(item => {
      if (!Array.isArray(item)) {
        this.props.increaseOrderNumber();
        return <p key={this.generateId(8)}>
          <span className="category__marker">&bull;</span>
          {item}{this.props.orderNumber[0] === 0 ? null : <sup>[{this.props.orderNumber}]</sup>}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm category__btn"
            data-toggle="modal"
            data-target="#addCategoryModal"
            onClick={() => this.props.onAddCategory(item)}>+</button>
        </p>;
      } else {
        return <RecursiveTree
          key={this.generateId(8)}
          categoriesArray={item}
          onAddCategory={this.props.onAddCategory}
          orderNumber={this.props.orderNumber}
          increaseOrderNumber={this.props.increaseOrderNumber} />;
      };
    });

    return (
      <div className={categoryStyle}>
        {category}
      </div>
    );
  }
}

export default RecursiveTree;
