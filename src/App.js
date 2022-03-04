import logo from './logo.svg';
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
    const initalSelected = listItems.filter(item => item.checked)
    const initialSelectedIds = []
    initalSelected.map(item => initialSelectedIds.push(item.id))
    const [selectedItems, setSelectedItems] = useState(initialSelectedIds)
    const [hideCompleted, setHideCompleted] = useState(false)
    console.log("selectedItems: ", selectedItems)

    function TaskList(){
        return(<div>
                {/*<table>*/}
                {/*    <tbody>*/}
                {hideCompleted ? listItems.map((item) => (item.checked === false) && <Item id={item.id} name={item.name} value={item.value} checked={item.checked} text={item.text}/>) : listItems.map((item) => <Item id={item.id} name={item.name} value={item.value} checked={item.checked} text={item.text}/>)}
                {/*    </tbody>*/}
                {/*</table>*/}
                {/*<button type="button" id="item_button" name="item_button">Create new item +</button>*/}
                <button type={"button"} id="item_button" name="item_button" onClick={handleAddItemClick}>Create New Item +</button>
                {/*{selectedItems.length > 0 &&*/}
                {/*    <button type={"button"} onClick={handleDeleteClick}>Delete Selected</button>}*/}
                {/*{listItems.length > 0 &&*/}
                {/*    <button type={"button"}>Rename Items</button>}*/}
            </div>
        );
    }

    function handleAddItemClick(){
        console.log("add item click")
        setListItems([...listItems,
            {
                id: generateUniqueID(),
                name: "name",
                value: "value",
                text: generateUniqueID(),
                checked: false
            }]);
    }

    function handleDeleteClick(){
        setListItems(listItems.filter(i => !selectedItems.includes(i.id)));
        setSelectedItems([]);
        console.log(selectedItems);
    }

    function handleRenameClick(listId, field, value){

        setListItems(listItems.map(
            i => i.id === listId ? {...i, [field]: value} : i))
    }

    function handleShowClick(){

    }

    function handleToggleItemSelect(itemId, itemText){
        console.log(itemText)
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

                {listItems.length > 0 && <button type="button" id="rename_button" name="rename_button">Rename</button>}
                {!hideCompleted && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => setHideCompleted(true)}>Hide Completed</button>}
                {hideCompleted && <button type="button" id="show_uncompleted_button" name="show_uncompleted_button" onClick={() => setHideCompleted(false)}>Show All Items</button>}
                {selectedItems.length > 0 && <button type="button" id="delete_button" name="delete_button" onClick={handleDeleteClick}>Delete Selected</button>}

            </div>
        );
    }

    function Item(props){
        return (<span>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked} className="bigCheckbox" onChange={() => handleToggleItemSelect(props.id, props.text)} />
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
        {ButtonList()}
    </div>

    );
}

export default App;
