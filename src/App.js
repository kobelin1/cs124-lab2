
import './App.css';
import React, {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";

import {initializeApp} from "firebase/app";
import { serverTimestamp } from "firebase/firestore";
// import { Dropdown, DropdownMenu, DropdownItem, } from 'reactstrap';
// import { Dropdown } from 'semantic-ui-react';
// import Example from "./dropdown";

import {collection, deleteDoc, doc, getFirestore, query, setDoc, orderBy} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKYZNUq0Pdmt0jdMMUK_OD4f1Og9R1Vm4",
    authDomain: "cs124-lab3-cddb4.firebaseapp.com",
    projectId: "cs124-lab3-cddb4",
    storageBucket: "cs124-lab3-cddb4.appspot.com",
    messagingSenderId: "696592926540",
    appId: "1:696592926540:web:d7a095876592d165e831e9"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const collectionName = "List"

// const data = [
//     {
//         id : generateUniqueID(),
//         name: "Test Item",
//         value: "Test Item",
//         text: "Call Mom",
//         checked: false
//     },
//     {
//         id: generateUniqueID(),
//         name: "Second Test Item",
//         value: "Second Test Item",
//         text: "Buy groceries",
//         checked: true
//     }
// ]

function ButtonList(props){
    return (<div className="list">

            {/*<Dropdown text='File'>*/}
            {/*    <Dropdown.Menu>*/}
            {/*        <Dropdown.Item text='New' />*/}
            {/*        <Dropdown.Item text='Open...' description='ctrl + o' />*/}
            {/*        <Dropdown.Item text='Save as...' description='ctrl + s' />*/}
            {/*        <Dropdown.Item text='Rename' description='ctrl + r' />*/}
            {/*        <Dropdown.Item text='Make a copy' />*/}
            {/*        <Dropdown.Item icon='folder' text='Move to folder' />*/}
            {/*        <Dropdown.Item icon='trash' text='Move to trash' />*/}
            {/*        <Dropdown.Divider />*/}
            {/*        <Dropdown.Item text='Download As...' />*/}
            {/*        <Dropdown.Item text='Publish To Web' />*/}
            {/*        <Dropdown.Item text='E-mail Collaborators' />*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}

            {/*<Dropdown>*/}
            {/*    <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
            {/*        Sort By*/}
            {/*    </Dropdown.Toggle>*/}

            {/*    <Dropdown.Menu>*/}
            {/*        <Dropdown.Item href="#/action-1">Creation Date</Dropdown.Item>*/}
            {/*        <Dropdown.Item href="#/action-2">Name</Dropdown.Item>*/}
            {/*        <Dropdown.Item href="#/action-3">Priority</Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}



            {(!props.hideCompleted && props.areYouSure &&  props.listItems.length > 0 && !props.addingItem)  && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => props.setHideCompleted(true)}>Hide Completed</button>}
            {(props.hideCompleted && props.areYouSure &&  props.listItems.length > 0 && !props.addingItem) && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => props.setHideCompleted(false)}>Show All Items</button>}

            {props.selectedItems.length > 0 &&  !props.addingItem && props.areYouSure && <button type="button" id="delete_button" name="delete_button" onClick={() => props.setAreYouSure(false)}>Delete Selected</button>}
            {props.selectedItems.length > 0 && !props.addingItem && !props.areYouSure &&<button type="button" id="delete_button" name="delete_button" onClick={props.handleDeleteClick}>Confirm Deletions</button>}
            {props.selectedItems.length >= 0 &&  !props.addingItem && !props.areYouSure &&<button type="button" id="delete_button" name="delete_button" onClick={() => props.setAreYouSure(true)}>Cancel</button>}

        </div>


    );
}

function TaskList(props){
    return(<div className={"list_body"}>
            {props.hideCompleted
                ? props.listItems.map((item) => (item.checked === false) && <Item id={item.id} key={item.id} checked={item.checked} text={item.text} handleToggleItemSelect={handleToggleItemSelect} listItems={props.listItems} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} priority={item.priority}/>)
                : props.listItems.map((item) => <Item id={item.id} key={item.id} checked={item.checked} text={item.text} handleToggleItemSelect={handleToggleItemSelect} listItems={props.listItems} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} priority={item.priority}/>)}
            {!props.addingItem && props.areYouSure && <button type={"button"} id="item_button" name="item_button" onClick={() => props.setAddingItem(true)}>Create New Item +</button>}
        </div>
    );
}



function Item(props){
    return (<span>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked} className="bigCheckbox" onChange={() => props.handleToggleItemSelect(props.checked, props.selectedItems, props.setSelectedItems, props.id)} />
            <span className={'item_text'}> {!props.checked ? <input className={"item_text"}  onChange={e => handleRenaming(e, props.id)} value={props.text} key={props.id} id={props.id}/>
                : <input className={"item_text_done"} value={props.text} key={props.id} id={props.id} readOnly={true}/>} </span>
        {/*: <label htmlFor={props.id}><s className={"strikethrough"}>{props.text}</s></label> </span>*/}
            <span onClick={() => handlePriorityClick(1, props.id, props.priority)} value={1} className={1 > props.priority ? "unchecked" : "checked"}>!   </span>
            <span onClick={() => handlePriorityClick(2, props.id, props.priority)} value={2} className={2 > props.priority ? "unchecked" : "checked"}>!   </span>
            <span onClick={() => handlePriorityClick(3, props.id, props.priority)} value={3} className={3 > props.priority ? "unchecked" : "checked"}>!   </span>
            <br/><br/>
            </span>
    );
}

function handlePriorityClick(value, id, priority){
    if(value === priority){
        setDoc(doc(db, collectionName, id),
            {"priority": value - 1}, {merge: true}).then(() => console.log("Set new priority"))
    } else {
        setDoc(doc(db, collectionName, id),
            {"priority": value}, {merge: true}).then(() => console.log("Set new priority"))
    }
}


function handleRenaming(e, id){
    setDoc(doc(db, collectionName, id),
        {"text": e.target.value}, {merge: true}).then(() => console.log("Set new name"))
    // setListItems(listItems.map(// eslint-disable-next-line
    //     p => p.id === id ? {...p, ["text"]: e.target.value, ["value"]: e.target.value} : p))
}

function handleToggleItemSelect(checked, selectedItems, setSelectedItems, itemId){
    // listItems.map(item => (item.id === itemId) ? (item.checked = !item.checked) : false);
    setDoc(doc(db, collectionName, itemId),
        {"checked": !checked}, {merge: true}).then(() => console.log("Toggled item"))

    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(i => i !== itemId));
    } else {
        setSelectedItems([...selectedItems, itemId]);
    }
}

function App() {
    // const [listItems, setListItems] = useState(data)
    // const initialSelected = listItems.filter(item => item.checked)
    // const initialSelectedIds = []
    // initialSelected.map(item => initialSelectedIds.push(item.id))
    const [filterType, setFilterType] = useState("created_up")
    const [reverse, setReverse] = useState(false)

    const q = reverse ?
        query(collection(db, collectionName), orderBy(filterType.slice(0, filterType.length-3), "desc"))
        : query(collection(db, collectionName), orderBy(filterType.slice(0, filterType.length-3), "asc"));

    const [listItems, loadingPage, ] = useCollectionData(q);


    const [selectedItems, setSelectedItems] = useState(listItems === undefined ? [] : listItems.filter(i => i.checked))

    // console.log(listItems)
    // if(listItems !== undefined){
    //     console.log("HERE")
    //     console.log(listItems.filter(i => i.checked))
    //     setSelectedItems(listItems.filter(i => i.checked))
    // }

    const [hideCompleted, setHideCompleted] = useState(false)

    const [curText, setCurText] = useState("")
    const [addingItem, setAddingItem] = useState(false)

    const [areYouSure, setAreYouSure] = useState(true)

    if(loadingPage){
        return(<span><h2>Page is loading...</h2></span>);
    }

    function handleNewItem(){
        const uniqueId = generateUniqueID()
        setDoc(doc(db, collectionName, uniqueId),
            {
                id: uniqueId,
                text: curText,
                checked: false,
                created: serverTimestamp(),
                priority: 0
            }).then(() => console.log("Added new item"));

        // if(curText !== ""){
        //     setListItems([...listItems,
        //         {
        //             id: uniqueId,
        //             name: uniqueId,
        //             value: uniqueId,
        //             text: curText,
        //             checked: false
        //         }]);
        // }
        setCurText("")
        setAddingItem(false)
    }

    function handleDeleteClick(){
        // noinspection JSCheckFunctionSignatures
        selectedItems.forEach(id => deleteDoc(doc(db, collectionName, id)));
        setSelectedItems([]);
        setAreYouSure(true);

        // setListItems(listItems.filter(i => !selectedItems.includes(i.id)));
        // setSelectedItems([]);
        // setAreYouSure(true);
    }

    // function handleOnClick(id){
    //     setDoc(doc(db, collectionName, id),
    //         {["autoFocus"]: "autoFocus"}, {merge: true})
    //
    //     // setlistItems.map(item => item.id === specifiedItem.id ? (item.autoFocus = "autoFocus") : false )
    // }

    function handleSortChange(e){
        setFilterType(e.target.value)
        if(e.target.value.slice(-2) === "up"){
            setReverse(false);
        } else {
            setReverse(true);
        }


        // if(e.target.value === "Creation Date"){
        //     setFilterType("created")
        // }
        // if(e.target.value === "Name"){
        //     setFilterType("text")
        // }
        // if(e.target.value === "Priority"){
        //     setFilterType("priority")
        // }
        // console.log(filterType)
    }

    return (<div className={"body"}>
      <div className="title_card">
          <h2>Your TODO List</h2>
          {/*<input className="title" value={"Your TODO List"}/>*/}
      </div>
        {(areYouSure && !addingItem && listItems.length > 0) && <span className={"filter"}><label htmlFor="filter"> Sorting by: </label>
            <select name="filter" id="filter" onChange={e => handleSortChange(e)} value={filterType}>
                <optgroup>
                    <option value="created_up">Creation Date (Old to New)</option>
                        <option value="created_dn">Creation Date (New to Old)</option>
                    <option value="text_up">Name (A to Z)</option>
                        <option value="text_dn">Name (Z to A)</option>
                    <option value="priority_up">Priority (0 to 3)</option>
                        <option value="priority_dn">Priority (3 to 0)</option>
                </optgroup>
            </select></span>}
        {listItems.length === 0 && <i>There is nothing in your list!</i>}
        {!addingItem && <TaskList hideCompleted={hideCompleted} listItems={listItems} addingItem={addingItem} areYouSure={areYouSure} setAddingItem={setAddingItem} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>}
        {addingItem && <span className={"item_enter"}>
        <label htmlFor = "item_enter"> Enter new item text:</label>
        <br/>
        <input type="text" id="item_enter" name="item_enter" value={curText} onChange={event => {setCurText(event.target.value)}}/>
        <button type="button" id="add_item" name="add_item" onClick={handleNewItem}>Add</button></span>}
        <ButtonList hideCompleted={hideCompleted} areYouSure={areYouSure} listItems={listItems} addingItem={addingItem} setHideCompleted={setHideCompleted} selectedItems={selectedItems} setAreYouSure={setAreYouSure} handleDeleteClick={handleDeleteClick}/>
    </div>
    );
}

export default App;
