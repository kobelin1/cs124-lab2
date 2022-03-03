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
        checked: false
    }
]

function App() {
    const [listItems, setListItems] = useState(data)
    const [selectedItems, setSelectedItems] = useState([])
    // const []
    console.log("selectedItems: ", selectedItems)

    function TaskList(){
        return(<div>
                {listItems.length <= 0 && <i>There is nothing in your list!</i>}
                {listItems.map((item) => <Item id={item.id} name={item.name} value={item.value} text={item.text}/>)}
                {/*<button type="button" id="item_button" name="item_button">Create new item +</button>*/}
                <button type={"button"} id="item_button" name="item_button" onClick={handleAddItemClick}>Create New Item</button>
                {selectedItems.length > 0 &&
                    <button type={"button"} onClick={handleDeleteClick}>Delete Selected</button>}
                {listItems.length > 0 &&
                    <button type={"button"}>Rename Items</button>}
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
                // work with this later
                {listItems.length === 0 && <i>There is nothing in your list!</i>}
                <button type="button" id="rename_button" name="rename_button">Rename</button>
                <button type="button" id="show_uncompleted_button" name="show_uncompleted_button">Hide Completed</button>
                <button type="button" id="delete_button" name="delete_button">Delete All Completed</button>

            </div>
        );
    }

    function Item(props){
        return (<span>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} className="bigCheckbox" onClick={() => handleToggleItemSelect(props.id, props.text)} />
            <label htmlFor={props.id}>{props.text}</label><br/><br/>
            </span>
        );
    }


    return (<div className={"body"}>
      <div className="title_card">
          <h2>Your TODO List</h2>
      </div>
        {TaskList()}
    </div>

    );
}

export default App;
