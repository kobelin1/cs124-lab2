import './App.css';
import React, {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";

import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import {GrCheckmark} from 'react-icons/gr';

// import {GiHamburgerMenu} from 'react-icons/gi';
import {useMediaQuery} from 'react-responsive';

import {initializeApp} from "firebase/app";
import {serverTimestamp} from "firebase/firestore";

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

const collectionName = "MasterList"
const listName = "List"

// const masterList = collection(db, "MasterList")

// setDoc(doc(db, "MasterList", listId, "List", id))

// const taskList = collection(db, "List")
// db.collection("MasterList").doc(ListId).collection("Tasks").doc(TaskId)
// setDoc(doc(masterList, listId, taskList, )
// q = query(tasksCollection)


function ButtonList(props) {
    return (<div className="list">
            {(!props.hideCompleted && props.areYouSure && props.listItems.length > 0 && !props.addingItem) &&
                <button type="button" id="show_uncompleted_button" name="show_uncompleted_button"
                        onClick={() => props.setHideCompleted(true)}>Hide Completed</button>}
            {(props.hideCompleted && props.areYouSure && props.listItems.length > 0 && !props.addingItem) &&
                <button type="button" id="show_uncompleted_button" name="show_uncompleted_button"
                        onClick={() => props.setHideCompleted(false)}>Show All Items</button>}

            {props.selectedItems.length > 0 && !props.addingItem && props.areYouSure &&
                <button type="button" id="delete_button" name="delete_button"
                        onClick={() => props.setAreYouSure(false)}>Delete Selected</button>}
            {props.selectedItems.length > 0 && !props.addingItem && !props.areYouSure &&
                <button type="button" id="delete_button" name="delete_button" onClick={props.handleDeleteClick}>Confirm
                    Deletions</button>}
            {props.selectedItems.length >= 0 && !props.addingItem && !props.areYouSure &&
                <button type="button" id="delete_button" name="delete_button"
                        onClick={() => props.setAreYouSure(true)}>Cancel</button>}
        </div>
    );
}

function TaskList(props) {
    return (<div className={"list_body"}>
            {props.hideCompleted
                ? props.listItems.map((item) => (item.checked === false) &&
                    <Item id={item.id} key={item.id} checked={item.checked} text={item.text}
                          handleToggleItemSelect={handleToggleItemSelect} listItems={props.listItems}
                          selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}
                          priority={item.priority} listId={props.listId}/>)
                : props.listItems.map((item) => <Item id={item.id} key={item.id} checked={item.checked} text={item.text}
                                                      handleToggleItemSelect={handleToggleItemSelect}
                                                      listItems={props.listItems} selectedItems={props.selectedItems}
                                                      setSelectedItems={props.setSelectedItems}
                                                      priority={item.priority}
                                                      listId={props.listId}/>)}
            {!props.addingItem && props.areYouSure && <button type={"button"} id="item_button" name="item_button"
                                                              onClick={() => props.setAddingItem(true)}>Create New Item
                +</button>}
        </div>
    );
}


function Item(props) {
    return (<span>
            <input aria-label="checkbox" type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked}
                   className="bigCheckbox" aria-checked={(props.checked === "checked")}
                   onChange={() => props.handleToggleItemSelect(props.checked, props.selectedItems, props.setSelectedItems, props.id, props.listId)}/>
            <span className={'item_text'}> {!props.checked ?
                <input className={"item_text"} onChange={e => handleRenaming(e, props.id, props.listId)}
                       defaultValue={props.text}
                       key={props.id} id={props.id}/>
                : <input className={"item_text_done"} defaultValue={props.text} key={props.id} id={props.id}
                         readOnly={true}/>} </span>
            <button aria-label="low-priority" onClick={() => handlePriorityClick(1, props.id, props.priority, props.listId)} value={1}
                  className={1 > props.priority ? "unchecked" : "checked"} aria-pressed={(1 < props.priority) ? "true" : "false"}>!    </button>
            <button aria-label="medium-priority" onClick={() => handlePriorityClick(2, props.id, props.priority, props.listId)} value={2}
                  className={2 > props.priority ? "unchecked" : "checked"} aria-pressed={(2 < props.priority) ? "true" : "false"}   >!   </button>
            <button aria-label="high-priority" onClick={() => handlePriorityClick(3, props.id, props.priority, props.listId)} value={3}
                  className={3 > props.priority ? "unchecked" : "checked"} aria-pressed={(3 < props.priority) ? "true" : "false"}   >!   </button>
            <br/><br/>
            </span>
    );
}

function handlePriorityClick(value, id, priority, listId) {
    if (value === priority) {
        setDoc(doc(db, collectionName, listId, listName, id),
            {"priority": value - 1}, {merge: true}).then(() => console.log("Set new priority"))
    } else {
        setDoc(doc(db, collectionName, listId, listName, id),
            {"priority": value}, {merge: true}).then(() => console.log("Set new priority"))
    }
}

function handleRenaming(e, id, listId) {
    setDoc(doc(db, collectionName, listId, listName, id),
        {"text": e.target.value}, {merge: true}).then(() => console.log("Set new name"))
}

function handleToggleItemSelect(checked, selectedItems, setSelectedItems, itemId, listId) {
    setDoc(doc(db, collectionName, listId, listName, itemId),
        {"checked": !checked}, {merge: true}).then(() => console.log("Toggled item"))

    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(i => i !== itemId));
    } else {
        setSelectedItems([...selectedItems, itemId]);
    }
}

function App() {
    const [filterType, setFilterType] = useState("created_up")
    const [reverse, setReverse] = useState(false)

    const masterq = query(collection(db, collectionName));
    const [masterListItems, masterLoadingPage] = useCollectionData(masterq);

    const [curList, setCurList] = useState(undefined)

    const isNarrow = useMediaQuery({maxWidth: 750})
    if (masterListItems && !curList) {
        setCurList(masterListItems[0])
    }

    const q = reverse ?
        query(collection(db, collectionName, masterLoadingPage ? "1" : (curList ? curList.id : masterListItems[0].id), listName), orderBy(filterType.slice(0, filterType.length - 3), "desc"))
        : query(collection(db, collectionName, masterLoadingPage ? "1" : (curList ? curList.id : masterListItems[0].id), listName), orderBy(filterType.slice(0, filterType.length - 3), "asc"));

    const [listItems, loadingPage,] = useCollectionData(q);

    const [selectedItems, setSelectedItems] = useState(listItems ? listItems.filter(item => item.checked) : []);

    const [hideCompleted, setHideCompleted] = useState(false)

    const [curText, setCurText] = useState("")
    const [curTitle, setCurTitle] = useState("")

    const [addingItem, setAddingItem] = useState(false)
    const [addingList, setAddingList] = useState(false)

    const [areYouSure, setAreYouSure] = useState(true)

    const [readyDeleteList, setReadyDeleteList] = useState(true)

    const [editingTitle, setEditingTitle] = useState(false)

    if (loadingPage || masterLoadingPage) {
        return (<span><h2>Page is loading...</h2></span>);
    }

    function handleNewItem() {
        const uniqueId = generateUniqueID()
        setDoc(doc(db, collectionName, curList ? curList.id : masterListItems[0].id, listName, uniqueId),
            {
                id: uniqueId,
                text: curText,
                checked: false,
                created: serverTimestamp(),
                priority: 0
            }).then(() => console.log("Added new item"));

        setCurText("")
        setAddingItem(false)
    }

    function handleDeleteClick() {
        // noinspection JSCheckFunctionSignatures
        selectedItems.forEach(id => deleteDoc(doc(db, collectionName, curList.id, listName, id)));
        setSelectedItems([]);
        setAreYouSure(true);
    }

    function handleSortChange(e) {
        setFilterType(e.target.value)
        if (e.target.value.slice(-2) === "up") {
            setReverse(false);
        } else {
            setReverse(true);
        }
    }

    function handleTitleChange(e, listId) {
        setDoc(doc(db, collectionName, listId),
            {"title": e.target.value}, {merge: true}).then(() => console.log("Set new name"))
        setCurList({...curList, "title": e.target.value});
    }

    function handleAddList() {
        const uniqueId = generateUniqueID()
        // noinspection JSCheckFunctionSignatures
        setDoc(doc(db, collectionName, uniqueId),
            {
                "id": uniqueId,
                "title": curTitle,
            }).then(() => console.log("Added new list"));
        setCurTitle("")
        setCurList({
            "id": uniqueId,
            "title": curTitle,
        })
        setAddingList(false)
    }

    function handleCancelAddList() {
        setCurTitle("")
        setAddingList(false)
    }

    function handleListChange(e) {
        let dropd = document.getElementById("listItems");
        let selectedId = dropd.options[dropd.selectedIndex].id;
        setCurList({title: e.target.value, id: selectedId})
    }

    function handleDeleteList(){
        deleteDoc(doc(db, collectionName, curList.id)).then(() => console.log("Deleted List"))
        setReadyDeleteList(true)
        setCurList(masterListItems[0])
    }


    return (<div className={"body"}>
            <div className="title_card">

                {readyDeleteList ? <span>
                {addingList ?
                    <span>
                        <label htmlFor={"item_enter"}>Enter name of new list</label>
                        <input type="text" className="item_enter" onChange={(e) => setCurTitle(e.target.value)}/>
                        <button value="Create new list" onClick={() => handleAddList()}>Create new list</button>
                        <button value="Cancel" onClick={() => handleCancelAddList()}>Cancel</button>
                    </span>
                    : <span id="titleEditors">
                        <button onClick={() => setAddingList(true)}>{isNarrow ? "+" : "Create New List +"}</button>
                        {masterListItems.length > 1 && <button onClick={()=>setReadyDeleteList(false)}>{isNarrow ? <FaTrashAlt/> : "Delete Current List"}</button>}
                    </span>
                } </span>
                :
                    <span>
                        <button onClick={() => handleDeleteList()}>Confirm Deletion of Current List</button>
                        <button onClick={() => setReadyDeleteList(true)}>Cancel</button>
                    </span>}

                {!addingList && readyDeleteList && <span>
                    {editingTitle ?
                        <h2><input type={"text"} defaultValue={curList.title} id="titleText"
                                   onChange={(e) => handleTitleChange(e, curList.id)}/></h2>
                        : <h2><select name="listItems" id="listItems" onChange={(e) => handleListChange(e)}
                                      value={curList.title}>
                            <optgroup>
                                {masterListItems.map((list) => <option value={list.title} id={list.id}
                                                                       key={list.id}>{list.title}</option>)}
                            </optgroup>
                        </select></h2>} </span>}

                {!addingList && readyDeleteList && <span>
                    <button aria-label={!editingTitle ? "Edit List Title" : "Finish Editing"} id="editTitle"
                            onClick={() => setEditingTitle(!editingTitle)}>{editingTitle ? (isNarrow ? <GrCheckmark/> : "Confirm Edit") :
                        (isNarrow ? <FaPencilAlt/> : "Edit Title")}</button> </span>}
            </div>

            {(areYouSure && !addingItem && listItems.length > 0) &&
                <span className={"filter"}><label htmlFor="filter"> Sorting by: </label>
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
            {!addingItem && <TaskList hideCompleted={hideCompleted} listItems={listItems} addingItem={addingItem}
                                      areYouSure={areYouSure} setAddingItem={setAddingItem}
                                      selectedItems={selectedItems} setSelectedItems={setSelectedItems}
                                      listId={curList ? curList.id : masterListItems[0].id}/>}
            {addingItem && <span className={"item_enter"}>
        <label htmlFor="item_enter"> Enter new item text:</label>
        <br/>
        <input type="text" id="item_enter" name="item_enter" value={curText} onChange={event => {
            setCurText(event.target.value)
        }}/>
        <button type="button" id="add_item" name="add_item" onClick={handleNewItem}>Add</button></span>}
            {selectedItems && !loadingPage && <ButtonList
                hideCompleted={hideCompleted}
                areYouSure={areYouSure}
                listItems={listItems}
                addingItem={addingItem}
                setHideCompleted={setHideCompleted}
                selectedItems={listItems ? listItems.filter(item => item.checked) : []}
                setAreYouSure={setAreYouSure}
                handleDeleteClick={handleDeleteClick}/>}
        </div>
    );
}

export default App;
