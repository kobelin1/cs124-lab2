import './App.css';
import React, {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";

import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import {GrCheckmark} from 'react-icons/gr';
import {FcGoogle} from 'react-icons/fc';
import {BsPersonCircle, BsFillPersonPlusFill} from 'react-icons/bs';
import {FiSend} from 'react-icons/fi';

import Alert from './Alert';


import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';

import {
    getAuth,
    sendEmailVerification,
    signOut } from "firebase/auth";

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
const auth = getAuth();

// Get to this later :/
// const collectionName = "People-AuthenticationRequired"

const collectionName = "MasterListWRules"
const listName = "List"

// const masterList = collection(db, "MasterList")

// setDoc(doc(db, "MasterList", listId, "List", id))

// const taskList = collection(db, "List")
// db.collection("MasterList").doc(ListId).collection("Tasks").doc(TaskId)
// setDoc(doc(masterList, listId, taskList, )
// q = query(tasksCollection)


function App(props) {
    const [user, loading, error] = useAuthState(auth);
    // function verifyEmail() {
    //     sendEmailVerification(user).then(() => console.log("Sent verification email."));
    // }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            <SignedInApp {...props} user={user}/>
            {/*<p>Signed in as {user.displayName || user.email}</p>*/}
            {/*<button type="button" onClick={() => signOut(auth)}>Sign out</button>*/}
            {/*{!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}*/}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <div><SignIn key="Sign In" id="signIn"/></div>
            <div><SignUp key="Sign Up" id="signUp"/></div>
        </>
    }
}


function SignIn() {
    const [
        signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}
        <label htmlFor='email' id='email_label'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>password: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button onClick={() => signInWithEmailAndPassword(email, pw)}>
            Sign in
        </button>
        <button onClick={() => signInWithGoogle()}>
            <FcGoogle/> Sign in with Google
        </button>
        <hr/>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>password: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Sign Up
        </button>
    </div>
}

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
            <input aria-label={(props.name)} type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked}
                   className="bigCheckbox" aria-checked={props.checked}
                   onChange={() => props.handleToggleItemSelect(props.checked, props.selectedItems, props.setSelectedItems, props.id, props.listId)}/>
            <span className={'item_text'}> {!props.checked ?
                <input className={"item_text"} onChange={e => handleRenaming(e, props.id, props.listId)}
                       defaultValue={props.text}
                       key={props.id} id={props.id}/>
                : <input className={"item_text_done"} aria-disabled={"true"} disabled="disabled" defaultValue={props.text} key={props.id} id={props.id}
                         readOnly={true}/>} </span>
            <button aria-label={(props.priority === 1) ? "low-priority, current priority" : "low-priority"} onClick={() => handlePriorityClick(1, props.id, props.priority, props.listId)} value={1}
                  className={1 > props.priority ? "unchecked" : "checked"} aria-pressed={(1 === props.priority) ? "true" : "false"}>!    </button>
            <button aria-label={(props.priority === 2) ? "medium-priority, current priority" : "medium-priority"} onClick={() => handlePriorityClick(2, props.id, props.priority, props.listId)} value={2}
                  className={2 > props.priority ? "unchecked" : "checked"} aria-pressed={(2 === props.priority) ? "true" : "false"}   >!   </button>
            <button aria-label={(props.priority === 3) ? "high-priority, current priority" : "high-priority"} onClick={() => handlePriorityClick(3, props.id, props.priority, props.listId)} value={3}
                  className={3 > props.priority ? "unchecked" : "checked"} aria-pressed={(3 === props.priority) ? "true" : "false"}   >!   </button>
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

function SignedInApp(props) {
    const [filterType, setFilterType] = useState("created_up")
    const [reverse, setReverse] = useState(false)

    const masterq = query(collection(db, collectionName));

    const [masterListItems, masterLoadingPage] = useCollectionData(masterq);

    const [curList, setCurList] = useState(undefined)

    const isNarrow = useMediaQuery({maxWidth: 750})

    const [showAlert, setShowAlert] = useState(false);

    function handleAlertOK() {
        console.log("Finished with sharing alert.")
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    function verifyEmail() {
        sendEmailVerification(props.user).then(() => console.log("Sent verification email."));
    }

    if (masterListItems && !curList) {
        setCurList(masterListItems[0])
    }

    const q = reverse ?
        query(collection(db, collectionName, masterLoadingPage ? "1" : (curList ? curList.id : (masterListItems ? masterListItems[0].id : "1")), listName), orderBy(filterType.slice(0, filterType.length - 3), "desc"))
        : query(collection(db, collectionName, masterLoadingPage ? "1" : (curList ? curList.id : (masterListItems ? masterListItems[0].id : "1")), listName), orderBy(filterType.slice(0, filterType.length - 3), "asc"));

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

    const [shareEmail, setShareEmail] = useState("")
    const [newUserPerms, setNewUserPerms] = useState("Edit")

    const [sharedUser, setSharedUser] = useState(undefined)
    const [sharedUserPerms, setSharedUserPerms] = useState(undefined)

    if (loadingPage || masterLoadingPage) {
        return (<span><h2>Page is loading...</h2></span>);
    }

    if (curList && !sharedUser) {
        setSharedUser(curList.users[0])
    }
    if (sharedUser && !sharedUserPerms) {
        setSharedUserPerms(sharedUser.perms)
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
                "owner": props.user.uid,
                "users": [{"email": props.user.email, "perms": "Edit"}]
            }).then(() => console.log("Added new list"));
        setCurTitle("")

        let newCurList = {
            "id": uniqueId,
            "title": curTitle,
            "owner": props.user.uid,
            "users": [{"email": props.user.email, "perms": "Edit"}]
        }

        setCurList(newCurList)
        setAddingList(false)

        // const uniqueId2 = generateUniqueID()
        // setDoc(doc(db, collectionName, newCurList ? newCurList.id : masterListItems[0].id, listName, uniqueId2),
        //     {
        //         id: uniqueId,
        //         text: "Sample Text!",
        //         checked: false,
        //         created: serverTimestamp(),
        //         priority: 0
        //     }).then(() => console.log("Added new item"));
    }

    function handleCancelAddList() {
        setCurTitle("")
        setAddingList(false)
    }

    function handleListChange(e) {
        let dropd = document.getElementById("listItems");
        // let selectedList = dropd.options[dropd.selectedIndex];
        let selectedList = masterListItems[dropd.selectedIndex];
        setCurList({title: e.target.value, id: selectedList.id, owner: selectedList.owner, users: selectedList.users})
    }

    function handleDeleteList(){
        deleteDoc(doc(db, collectionName, curList.id)).then(() => console.log("Deleted List"))
        setReadyDeleteList(true)
        setCurList(masterListItems[0])
    }

    function handleShareEmail(){

        if(shareEmail === ""){
            return
        }

        let userList = curList.users
        userList.push({"email": shareEmail, "perms": newUserPerms})

        setDoc(doc(db, collectionName, curList.id),
            {"users": userList}, {merge: true}).then(() => console.log("Shared with new user"))

        setCurList({...curList, "users": userList});
        setShareEmail("")
    }

    function handleChangeSharedUserPerms(e) {
        const updatedUserList = curList.users.map((user) => user === sharedUser ? {...user, "perms": e.target.value} : user)
        setDoc(doc(db, collectionName, curList.id),
            {"users": updatedUserList}, {merge: true}).then(() => console.log("Changed user permissions"))
        setCurList({...curList, "users": updatedUserList})
        setSharedUserPerms(e.target.value)
    }

    function handleChangedSharedUser(){
        let dropd = document.getElementById("sharedUser");
        let selectedUser = curList.users[dropd.selectedIndex];

        setSharedUser(selectedUser)
        setSharedUserPerms(selectedUser.perms)
    }

    function handleDeletePerson() {
        const updatedUserList = curList.users.filter((user) => user !== sharedUser)
        setDoc(doc(db, collectionName, curList.id),
            {"users": updatedUserList}, {merge: true}).then(() => console.log("Changed user permissions"))
        setCurList({...curList, "users": updatedUserList})
        setSharedUser(updatedUserList[0])
        setSharedUserPerms(updatedUserList[0].perms)
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


            {selectedItems && !loadingPage && <ButtonList
                hideCompleted={hideCompleted}
                areYouSure={areYouSure}
                listItems={listItems}
                addingItem={addingItem}
                setHideCompleted={setHideCompleted}
                selectedItems={listItems ? listItems.filter(item => item.checked) : []}
                setAreYouSure={setAreYouSure}
                handleDeleteClick={handleDeleteClick}/>}

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
            {listItems.length === 0 && <i> No tasks left!</i>}
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
        <span id="loggedInButtons">
            <BsPersonCircle onClick={toggleModal} size={isNarrow ? 30 : 40}/>
        </span>
            {showAlert && <Alert onClose={toggleModal} onOK={handleAlertOK} onCancel={signOut} auth={auth}>

                <div id="alert_title">
                    <div>List Owner: {curList.users[0].email}</div>
                    <hr/>
                    {<BsFillPersonPlusFill id="alert_icon" size={isNarrow ? 15 : 25}/>} <span id={isNarrow ? "alert_text_narrow" : "alert_text"}>Share with new users</span>
                    <br/>
                    <input id={isNarrow ? "add_user_narrow" : "add_user"} onChange={(e) => setShareEmail(e.target.value)} value={shareEmail}/>
                    {isNarrow && <br/>}
                    <select name="newUserPerms" id="newUserPerms" onChange={e => setNewUserPerms(e.target.value)} value={newUserPerms}>
                        <optgroup>
                            <option value="Edit">Edit</option>
                            <option value="View">View</option>
                        </optgroup>
                    </select>
                    <button id={isNarrow ? "share_button_narrow" : "share_button"} onClick={() => handleShareEmail()}>{isNarrow ? <FiSend size={12}/> : "Send"}</button>

                    <hr/>
                    <span id={isNarrow ? "alert_text_narrow" : "alert_text"}>Shared With</span>
                    <br/>


                    <select name="sharedUser" id="sharedUser" onChange={() => handleChangedSharedUser()} value={sharedUser.email}>
                        <optgroup>
                            {curList.users.map((user) => <option value={user.email} id={user.email}
                                                                 key={user.email}>{user.email}</option>)}
                        </optgroup>
                    </select>

                    { sharedUserPerms === "Edit" ?
                        <select name="sharedUserPerms" id="sharedUserPerms" onChange={e => handleChangeSharedUserPerms(e)} value={sharedUserPerms}>
                            <option value="Edit">Edit</option>
                            <option value="View">View</option>
                        </select>
                        :
                        <select name="sharedUserPerms" id="sharedUserPerms" onChange={e => handleChangeSharedUserPerms(e)} value={sharedUserPerms}>
                            <option value="View">View</option>
                            <option value="Edit">Edit</option>
                        </select>
                    }
                    {sharedUser.email !== curList.users[0].email && <button onClick={() => handleDeletePerson()}>Unshare</button>}


                    <hr/>
                    <p>Signed in as {props.user.displayName || props.user.email}</p>
                    {!props.user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
                </div>
            </Alert>}
        </div>
    );
}

export default App;
