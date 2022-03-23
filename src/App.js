
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";

import {initializeApp} from "firebase/app";

import {collection, deleteDoc, doc, getFirestore, query, setDoc} from "firebase/firestore";

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

function App() {
    // const [listItems, setListItems] = useState(data)
    // const initialSelected = listItems.filter(item => item.checked)
    // const initialSelectedIds = []
    // initialSelected.map(item => initialSelectedIds.push(item.id))
    const [selectedItems, setSelectedItems] = useState([])
    const [hideCompleted, setHideCompleted] = useState(false)

    const [curText, setCurText] = useState("")
    const [addingItem, setAddingItem] = useState(false)

    const [areYouSure, setAreYouSure] = useState(true)

    const q = query(collection(db, collectionName));
    const [listItems, loadingPage, error] = useCollectionData(q);

    function TaskList(){
        return(<div className={"list_body"}>

            {hideCompleted
                    ? listItems.map((item) => (item.checked === false) && <Item id={item.id} key={item.id} name={item.name} value={item.value} checked={item.checked} text={item.text}/>)
                    : listItems.map((item) => <Item id={item.id} name={item.name} value={item.value} checked={item.checked} text={item.text}/>)}
            {!addingItem && areYouSure && <button type={"button"} id="item_button" name="item_button" onClick={() => setAddingItem(true)}>Create New Item +</button>}
            </div>
        );
    }

    function handleRenaming(e, id){
        setDoc(doc(db, collectionName, id),
            {["text"]: e.target.value}, {merge: true})
        // setListItems(listItems.map(// eslint-disable-next-line
        //     p => p.id === id ? {...p, ["text"]: e.target.value, ["value"]: e.target.value} : p))
    }

    function handleNewItem(){
        const uniqueId = generateUniqueID()
        setDoc(doc(db, collectionName, uniqueId),
            {
                id: uniqueId,
                name: uniqueId,
                value: uniqueId,
                text: curText,
                checked: false
            });

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
        selectedItems.forEach(id => deleteDoc(doc(db, collectionName, id)));
        setSelectedItems([]);
        setAreYouSure(true);

        // setListItems(listItems.filter(i => !selectedItems.includes(i.id)));
        // setSelectedItems([]);
        // setAreYouSure(true);
    }

    function handleToggleItemSelect(itemId){
        listItems.map(item => (item.id === itemId) ? (item.checked = !item.checked) : false);
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(i => i !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    function handleOnClick(id){
        setDoc(doc(db, collectionName, id),
            {["autoFocus"]: "autoFocus"}, {merge: true})

        // setlistItems.map(item => item.id === specifiedItem.id ? (item.autoFocus = "autoFocus") : false )
    }

    function ButtonList(){
        return (<div className="list">
                <br />

                {(!hideCompleted && areYouSure &&  listItems.length > 0 && !addingItem)  && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => setHideCompleted(true)}>Hide Completed</button>}
                {(hideCompleted && areYouSure &&  listItems.length > 0 && !addingItem) && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => setHideCompleted(false)}>Show All Items</button>}

                {selectedItems.length > 0 &&  !addingItem && areYouSure && <button type="button" id="delete_button" name="delete_button" onClick={() => setAreYouSure(false)}>Delete Selected</button>}
                {selectedItems.length > 0 && !addingItem && !areYouSure &&<button type="button" id="delete_button" name="delete_button" onClick={handleDeleteClick}>Confirm Deletions</button>}
                {selectedItems.length >= 0 &&  !addingItem && !areYouSure &&<button type="button" id="delete_button" name="delete_button" onClick={() => setAreYouSure(true)}>Cancel</button>}
            </div>
        );
    }

    function Item(props){
        return (<span>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked} className="bigCheckbox" onChange={() => handleToggleItemSelect(props.id)} />
                {!props.checked ?
                    <span className={'item_text'}><label htmlFor={props.id}><input className={"item_text"} autoFocus="autoFocus" onClick={() => handleOnClick(props.id)} onChange={e => handleRenaming(e, props.id)} value={props.text} key={props.id} id={props.id}/></label><br/><br/></span>
                    : <span className={'item_text'}><label htmlFor={props.id}><s>{props.text}</s></label><br/><br/></span>}
            </span>
        );
    }

    if(loadingPage){
        return(<span><h2>Page is loading...</h2></span>);
    }

    return (<div className={"body"}>
      <div className="title_card">
          <h2>Your TODO List</h2>
          {/*<input className="title" value={"Your TODO List"}/>*/}
      </div>
        {listItems.length === 0 && <i>There is nothing in your list!</i>}
        {!addingItem && TaskList()}

        {addingItem && <span className={"item_enter"}>
        <label htmlFor = "item_enter"> Enter new item text:</label>
        <br/>
        <input type="text" id="item_enter" name="item_enter" value={curText} onChange={event => {setCurText(event.target.value)}}/>
        <button type="button" id="add_item" name="add_item" onClick={handleNewItem}>Add</button></span>}
        {ButtonList()}
    </div>
    );
}

export default App;
