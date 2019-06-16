import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormFeedback
} from 'reactstrap';

import categoriesArray from '../assets/dataBank';
import RecursiveTree from '../components/RecursiveTree';
import IterativeTree from '../components/IterativeTree';
import './CategoryTree.css';

class CategoryTree extends Component {
  state = {
    traversal: 'RECURSIVE',
    parentCategory: '',
    currentInputValue: '',
    errorMessage: '',
    modalShown: false,
    dropdownOpen: false,
    isOrderShown: false,
    categoriesArray: []
  }

  orderNumber = [-1];

  // write down from a json-file to the state
  componentWillMount() {
    this.setState({ categoriesArray });
  }

  // add a new category
  addCategory = () => {
    const categoriesArray = this.state.categoriesArray;

    const add = (array, element, newElement) => {
      if (array[0] === element) {
        array.push([newElement]);
      } else {
        for (let i = 1; i < array.length; i++) {
          add(array[i], element, newElement);
        }
      }
    }

    if (this.isNotEmpty(this.state.currentInputValue)) {
      if (this.isUnique(this.state.currentInputValue, categoriesArray)) {
        add(categoriesArray, this.state.parentCategory, this.state.currentInputValue);
        this.setState({ categoriesArray });
        this.cleanState();
        this.toggleModal();
      }
    }
  }

  // save category's name where new category will be put in
  setParentCategory = (parentCategory) => {
    this.setState({ parentCategory });
    this.toggleModal();
  }

  // save a current value of the input field
  inputChanged = () => {
    this.setState({ currentInputValue: this.input.value, errorMessage: '' });
  }

  // clean parentCategory & currentInputValue fields after we add new category
  cleanState = () => {
    this.setState({
      parentCategory: '',
      currentInputValue: '',
      errorMessage: ''
    })
  }

  // check if value is empty
  isNotEmpty(value) {
    if (!value) {
      this.setState({ errorMessage: 'This field can not be empty' });
      return false;
    }
    return true;
  }

  // check if value is unique
  isUnique(value, array) {
    let result = true;

    const checkValue = (val, arr) => {
      if (arr[0] === val) {
        result = false;
        return;
      } else {
        for (let i = 1; i < arr.length; i++) {
          checkValue(val, arr[i]);
        }
      }
    }

    checkValue(value, array);
    if (!result) { this.setState({ errorMessage: 'This category exists already' }) }
    return result;
  }

  // toggle the modal
  toggleModal = () => {
    this.setState(prevState => ({
      modalShown: !prevState.modalShown
    }));
  }

  // toggle the dropdown
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  // change a tree traversal
  onChangeTraversal = () => {
    if (this.state.traversal === 'RECURSIVE') {
      this.setState({ traversal: 'ITERATIVE' });
    } else {
      this.setState({ traversal: 'RECURSIVE' });
    }
  }

  increaseOrderNumber = () => {
    this.orderNumber[0]++;
  }

  render() {
    this.orderNumber = [-1];
    let tree = null;
    if (this.state.traversal === 'RECURSIVE') {
      tree = <RecursiveTree
        categoriesArray={[...this.state.categoriesArray]}
        onAddCategory={this.setParentCategory}
        orderNumber={this.orderNumber}
        increaseOrderNumber={this.increaseOrderNumber} />;
    } else {
      tree = <IterativeTree
        categoriesArray={this.state.categoriesArray}
        onAddCategory={this.setParentCategory} />
    }
    return (
      <div>
        {/* HEADER */}
        <header className="header d-flex justify-content-between align-items-center">
          <h1 className="heading-primary">Category Tree</h1>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle className="dropdown__btn" caret>
              {this.state.traversal === 'RECURSIVE' ? 'Recursive' : 'Iterative'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="dropdown__btn" header>
                {this.state.traversal === 'RECURSIVE' ? 'Recursive' : 'Iterative'}
              </DropdownItem>
              <DropdownItem className="dropdown__btn" onClick={this.onChangeTraversal}>
                {this.state.traversal === 'RECURSIVE' ? 'Iterative' : 'Recursive'}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </header>

        {/* CATEGORY TREE */}
        {tree}

        {/* MODAL */}
        <Modal isOpen={this.state.modalShown} toggle={this.toggleModal}
          className='modal-dialog-centered'>
          <ModalHeader className="modal__header heading-secondary" toggle={this.toggleModal}>
            <span className="heading-secondary">Add New Category</span>
          </ModalHeader>
          <ModalBody>
            <Input className="modal__input" placeholder="Category" onChange={this.inputChanged}
              innerRef={input => this.input = input}
              invalid={this.state.errorMessage ? true : null} />
            <FormFeedback className="modal__feedback">{this.state.errorMessage}</FormFeedback>
          </ModalBody>
          <ModalFooter className="modal__footer">
            <Button className="modal__btn" color="secondary" onClick={this.toggleModal}>Cancel</Button>
            <Button className="modal__btn" color="primary" onClick={this.addCategory}>Add</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default CategoryTree;