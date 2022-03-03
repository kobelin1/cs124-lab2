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
        text: "Some text",
        checked: true
    }
]


function App() {
    const [listItems, setListItems] = useState(data)
    const [selectedItems, setSelectedItems] = useState([])
    // const []


    function TaskList(){
        return(<div>
                {listItems.map((item) => <Item id={item.id} name={item.name} value={item.value} text={item.text}/>)}
                <button type="button" id="item_button" name="item_button">Create new item +</button>
            </div>
        );
    }

    function handleAddItemClick(){

    }

    function handleDeleteClick(){

    }

    function handleRenameClick(){

    }

    function handleShowClick(){

    }

    function handleToggleItemSelect(item){
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(i => i !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
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
            <input type="checkbox" id={props.id} name={props.name} value={props.value} className="bigCheckbox" onClick={handleToggleItemSelect} />
            <label htmlFor={props.id}>props.text</label><br/><br/>
            </span>
        );
    }


    return (<div className={"body"}>
      <div className="title_card">
          <h2>Your TODO List</h2>
      </div>
    </div>

    );
}

export default App;
