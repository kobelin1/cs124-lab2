
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const data = [
    {
        id : generateUniqueID(),
        name: "Test Item",
        value: "Test Item",
        text: "Some text",
        checked: false
    },
    {
        id: generateUniqueID(),
        name: "Second Test Item",
        value: "Second Test Item",
        text: "Second Some text",
        checked: true
    }
]

function App() {
    const [listItems, setListItems] = useState(data)
    const initialSelected = listItems.filter(item => item.checked)
    const initialSelectedIds = []
    initialSelected.map(item => initialSelectedIds.push(item.id))
    const [selectedItems, setSelectedItems] = useState(initialSelectedIds)
    const [hideCompleted, setHideCompleted] = useState(false)

    const [curText, setCurText] = useState("")
    const [addingItem, setAddingItem] = useState(false)

    const [renaming, setRenaming] = useState(false)
    const [textBoxList, setTextBoxList] = useState([])

    const [areYouSure, setAreYouSure] = useState(true)

    function TaskList(){
        return(<div>

            {!renaming ? (hideCompleted ? listItems.map((item) => (item.checked === false) && <Item id={item.id} key={item.id} name={item.name} value={item.value} checked={item.checked} text={item.text}/>) : listItems.map((item) => <Item id={item.id} name={item.name} value={item.value} checked={item.checked} text={item.text}/>)) : false}
            {!addingItem && !renaming && <button type={"button"} id="item_button" name="item_button" onClick={() => setAddingItem(true)}>Create New Item +</button>}
            {renaming && textBoxList.map((item) => <span><input type="text" id={item.id} name={item.id} value={item.text} onChange={e => setTextBoxList(textBoxList.map(item => item.id === e.target.id ? item.text = e.target.value: false))}/><br/></span>)}

                {/*<button type="button" id="item_button" name="item_button">Create new item +</button>*/}
                {/*{selectedItems.length > 0 &&*/}
                {/*    <button type={"button"} onClick={handleDeleteClick}>Delete Selected</button>}*/}
                {/*{listItems.length > 0 &&*/}
                {/*    <button type={"button"}>Rename Items</button>}*/}
            </div>
        );
    }

    function handleAddItemClick(){
        console.log("add item click")

        return (<span>
            <label htmlFor = "item_enter"> Enter new item text:</label>
            <br/>
            <input type="text" id="item_enter" name="item_enter" value={curText} onChange={event => {setCurText(curText + event)}}/>
            <button type="button" id="add_item" name="add_item" onClick={handleNewItem}>Add</button>
        </span>);
    }

    function handleNewItem(){
        const uniqueId = generateUniqueID()
        setListItems([...listItems,
            {
                id: uniqueId,
                name: uniqueId,
                value: uniqueId,
                text: curText,
                checked: false
            }]);
        setCurText("")
        setAddingItem(false)
    }

    function handleDeleteClick(){
        setListItems(listItems.filter(i => !selectedItems.includes(i.id)));
        setSelectedItems([]);
        setAreYouSure(true);
    }

    function handleRenameClick(listId, field, value){

        setListItems(listItems.map(
            i => i.id === listId ? {...i, [field]: value} : i))
    }

    function handleStartRenaming(){
        setRenaming(true)
        const textList = []
        listItems.map(item => textList.push({id: item.id, text: item.text}))
        setTextBoxList(textList)
    }

    function handleEndRenaming(){

    }


    function handleToggleItemSelect(itemId){
        listItems.map(item => (item.id === itemId) ? (item.checked = !item.checked) : false);
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(i => i !== itemId));

            // let localSelectedOne = selectedItems;
            // console.log("selected after toggle: ", localSelectedOne);
        } else {
            setSelectedItems([...selectedItems, itemId]);
            // let localSelectedTwo = selectedItems;
            // console.log("selected after toggle: ", localSelectedTwo);
        }
    }

    function ButtonList(props){
        return (<div className="list">
                <br />

                {!addingItem && !renaming && listItems.length > 0 && <button type="button" id="rename_button" name="rename_button" onClick={() => handleStartRenaming}>Rename</button>}
                {!addingItem && renaming && listItems.length > 0 && <button type="button" id="rename_button" name="rename_button" onClick={() => handleEndRenaming}>Finish Renaming</button>}

                {(!hideCompleted && !renaming && listItems.length > 0 && !addingItem)  && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => setHideCompleted(true)}>Hide Completed</button>}
                {(hideCompleted && !renaming && listItems.length > 0 && !addingItem) && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => setHideCompleted(false)}>Show All Items</button>}

                {selectedItems.length > 0 && !renaming && !addingItem && areYouSure && <button type="button" id="delete_button" name="delete_button" onClick={() => setAreYouSure(false)}>Delete Selected</button>}
                {selectedItems.length > 0 && !renaming && !addingItem && !areYouSure &&<button type="button" id="delete_button" name="delete_button" onClick={handleDeleteClick}>Confirm Deletions</button>}
            </div>
        );
    }

    function Item(props){
        return (<span>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked} className="bigCheckbox" onChange={() => handleToggleItemSelect(props.id)} />
            <label htmlFor={props.id}>{props.text}</label><br/><br/>
            </span>
        );
    }


    return (<div className={"body"}>
      <div className="title_card">
          <h2>Your TODO List</h2>
      </div>
        {listItems.length === 0 && <i>There is nothing in your list!</i>}
        {TaskList()}

        {addingItem && !renaming && <span>
        <label htmlFor = "item_enter"> Enter new item text:</label>
        <br/>
        <input type="text" id="item_enter" name="item_enter" value={curText} onChange={event => {setCurText(event.target.value)}}/>
        <button type="button" id="add_item" name="add_item" onClick={handleNewItem}>Add</button></span>}
        {ButtonList()}
    </div>

    );
}

export default App;
