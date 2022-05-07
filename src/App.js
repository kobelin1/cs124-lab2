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
    useSignInWithGoogle,

} from 'react-firebase-hooks/auth';

import {
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut } from "firebase/auth";

import {useMediaQuery} from 'react-responsive';

import {initializeApp} from "firebase/app";

import {collection, deleteDoc, doc, getFirestore, query, setDoc, orderBy, serverTimestamp, where} from "firebase/firestore";

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


const collectionName = "MasterListWRules"
const listName = "List"


function App(props) {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            <SignedInApp {...props} user={user}/>
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
    const [recoveryEmail, setRecoveryEmail] = useState("")

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }

    return <div id="signin_text">
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}
        <br/>
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
        <br/><br/>
        <p>Forgot Password? Enter your email below and click "Send Reset Email"</p>
        <input type="text" id='recoveryEmail' value={recoveryEmail}
               onChange={e=>setRecoveryEmail(e.target.value)}/>
        <button onClick={() => resetPassword(auth, recoveryEmail, setRecoveryEmail)}>Send Reset Email</button>
        <br/><br/>
        <hr/>
        <br/>
    </div>
}

function resetPassword(auth, email, setRecoverEmail){
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email...')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
    setRecoverEmail("")
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
    return <div id={"signup_text"}>
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
            {(!props.hideCompleted && props.areYouSure && props.listItems && props.listItems.length > 0 && !props.addingItem) &&
                <button type="button" id="show_uncompleted_button" name="show_uncompleted_button"
                        onClick={() => props.setHideCompleted(true)}>Hide Completed</button>}
            {(props.hideCompleted && props.areYouSure && props.listItems && props.listItems.length > 0 && !props.addingItem) &&
                <button type="button" id="show_uncompleted_button" name="show_uncompleted_button"
                        onClick={() => props.setHideCompleted(false)}>Show All Items</button>}

            {props.selectedItems && props.selectedItems.length > 0 && !props.addingItem && props.areYouSure &&
                <button type="button" id="delete_button" name="delete_button"
                        onClick={() => props.setAreYouSure(false)}>Delete Selected</button>}
            {props.selectedItems && props.selectedItems.length > 0 && !props.addingItem && !props.areYouSure &&
                <button type="button" id="delete_button" name="delete_button" onClick={props.handleDeleteClick}>Confirm
                    Deletions</button>}
            {props.selectedItems && props.selectedItems.length >= 0 && !props.addingItem && !props.areYouSure &&
                <button type="button" id="delete_button" name="delete_button"
                        onClick={() => props.setAreYouSure(true)}>Cancel</button>}
        </div>
    );
}

function TaskList(props) {
    return (<div className={"list_body"}>
            {props.hideCompleted
                ? props.listItems && props.listItems.map((item) => (item.checked === false) &&
                    <Item id={item.id} key={item.id} checked={item.checked} text={item.text}
                          handleToggleItemSelect={handleToggleItemSelect} listItems={props.listItems}
                          selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}
                          priority={item.priority} listId={props.listId}
                          user={props.user} editors={props.editors}
                          verified={props.verified} owner={props.owner}/>)
                : props.listItems && props.listItems.map((item) => <Item id={item.id} key={item.id} checked={item.checked} text={item.text}
                                                      handleToggleItemSelect={handleToggleItemSelect}
                                                      listItems={props.listItems} selectedItems={props.selectedItems}
                                                      setSelectedItems={props.setSelectedItems}
                                                      priority={item.priority}
                                                      listId={props.listId}
                                                      user={props.user} editors={props.editors}
                                                      verified={props.verified} owner={props.owner}/>)}
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
                   onChange={() => props.handleToggleItemSelect(props.checked, props.selectedItems, props.setSelectedItems, props.id, props.listId, props.editors.includes(props.user.email), props.verified, props.owner)}/>
            <span className={'item_text'}> {!props.checked ?
                <input className={"item_text"} onChange={e => handleRenaming(e, props.id, props.listId, props.editors.includes(props.user.email), props.verified, props.owner)}
                       defaultValue={props.text}
                       key={props.id} id={props.id} readOnly={!(props.owner || (props.editors.includes(props.user.email) && props.verified))}/>
                : <input className={"item_text_done"} aria-disabled={"true"} disabled="disabled" defaultValue={props.text} key={props.id} id={props.id}
                         readOnly={true}/>} </span>
            <button aria-label={(props.priority === 1) ? "low-priority, current priority" : "low-priority"} onClick={() => handlePriorityClick(1, props.id, props.priority, props.listId, props.editors.includes(props.user.email), props.verified, props.owner)} value={1}
                  className={1 > props.priority ? "unchecked" : "checked"} aria-pressed={(1 === props.priority) ? "true" : "false"}>!    </button>
            <button aria-label={(props.priority === 2) ? "medium-priority, current priority" : "medium-priority"} onClick={() => handlePriorityClick(2, props.id, props.priority, props.listId, props.editors.includes(props.user.email), props.verified, props.owner)} value={2}
                  className={2 > props.priority ? "unchecked" : "checked"} aria-pressed={(2 === props.priority) ? "true" : "false"}   >!   </button>
            <button aria-label={(props.priority === 3) ? "high-priority, current priority" : "high-priority"} onClick={() => handlePriorityClick(3, props.id, props.priority, props.listId,  props.editors.includes(props.user.email), props.verified, props.owner)} value={3}
                  className={3 > props.priority ? "unchecked" : "checked"} aria-pressed={(3 === props.priority) ? "true" : "false"}   >!   </button>
            <br/><br/>
            </span>
    );
}

function handlePriorityClick(value, id, priority, listId, allowed, verified, owner) {
    if((allowed && verified) || owner){
        if (value === priority) {
            setDoc(doc(db, collectionName, listId, listName, id),
                {"priority": value - 1}, {merge: true}).then(() => console.log("Set new priority"))
        } else {
            setDoc(doc(db, collectionName, listId, listName, id),
                {"priority": value}, {merge: true}).then(() => console.log("Set new priority"))
        }
    } else {
        if (allowed && !verified){
            alert("You need to verify your email before editing.")
        } else {
            alert("You are not allowed to edit priorities.")
        }
    }
}

function handleRenaming(e, id, listId, allowed, verified, owner) {
    if((allowed && verified) || owner){
        setDoc(doc(db, collectionName, listId, listName, id),
            {"text": e.target.value}, {merge: true}).then(() => console.log("Set new name"))
    } else {
        if (allowed && !verified){
            alert("You need to verify your email before editing.")
        } else {
            alert("You are not allowed to edit this item.")
        }
    }
}

function handleToggleItemSelect(checked, selectedItems, setSelectedItems, itemId, listId, allowed, verified, owner) {
    if((allowed && verified) || owner){
        setDoc(doc(db, collectionName, listId, listName, itemId),
            {"checked": !checked}, {merge: true}).then(() => console.log("Toggled item"))

        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(i => i !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    } else {
        if (!verified && allowed){
            alert("You need to verify your email before editing.")
        } else {
            alert("You are not allowed to select items.")
        }
    }
}

function SignedInApp(props) {
    const [filterType, setFilterType] = useState("created_up")
    const [reverse, setReverse] = useState(false)

    // const masterq = query(collection(db, collectionName), where("users", "array-contains-any", [{email: props.user.email, perms:"Edit",}, {email: props.user.email, perms:"View",}]));
    // const masterq = query(collection(db, collectionName))
    const masterq = query(collection(db, collectionName), where("viewers", "array-contains", props.user.email));

    const [masterListItems, masterLoadingPage] = useCollectionData(masterq);

    const [curList, setCurList] = useState(undefined)
    const isNarrow = useMediaQuery({maxWidth: 750})

    const [showAlert, setShowAlert] = useState(false);

    const [count, setCount] = useState(0);
    const user = props.user;

    function handleAlertOK() {
        console.log("Finished with sharing alert.")
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    function verifyEmail() {
        sendEmailVerification(props.user).then(() => alert("Sent verification email."));
    }

    if (masterListItems && !masterListItems[0] && count===0){
        const uniqueId = generateUniqueID()
        // noinspection JSCheckFunctionSignatures
        setDoc(doc(db, collectionName, uniqueId),
            {
                "id": uniqueId,
                "title": "Your TODO List",
                "owner": user.uid,
                "users": [{"email": user.email, "perms": "Edit"}],
                "viewers": [user.email],
                "editors": [user.email]
            }).then(() => console.log("Added new list"));
        setCount(1)
    }

    if (masterListItems && masterListItems[0] && !curList) {
        setCurList(masterListItems[0]);
    }

    const q = reverse ?
        query(collection(db, collectionName, masterLoadingPage ? "1" : (curList ? curList.id : (masterListItems && masterListItems[0] ? masterListItems[0].id : "1")), listName), orderBy(filterType.slice(0, filterType.length - 3), "desc"))
        : query(collection(db, collectionName, masterLoadingPage ? "1" : (curList ? curList.id : (masterListItems && masterListItems[0] ? masterListItems[0].id : "1")), listName), orderBy(filterType.slice(0, filterType.length - 3), "asc"));

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
        let curEditors = curList.editors

        if(curEditors.includes(user.email) && (user.emailVerified || user.uid === curList.owner)){
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
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to change this user's permissions.")
            }

            alert("You are not allowed to create new items.")
        }
    }

    function handleDeleteClick() {
        if(curList.editors.includes(user.email) && (user.emailVerified || user.uid === curList.owner)) {
            // noinspection JSCheckFunctionSignatures
            selectedItems.forEach(id => deleteDoc(doc(db, collectionName, curList.id, listName, id)));
            setSelectedItems([]);
            setAreYouSure(true);
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to change this user's permissions.")
            }

            alert("You are not allowed to delete items.")
        }
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
        let curEditors = curList.editors
        if(curEditors.includes(user.email) && (user.emailVerified || user.uid === curList.owner)) {
            setDoc(doc(db, collectionName, listId),
                {"title": e.target.value}, {merge: true}).then(() => console.log("Set new name"))
            setCurList({...curList, "title": e.target.value});
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to change this user's permissions.")
            }

            alert("You are not allowed to change the title name.")
        }
    }

    function handleAddList() {
        const uniqueId = generateUniqueID()
        // noinspection JSCheckFunctionSignatures
        setDoc(doc(db, collectionName, uniqueId),
            {
                "id": uniqueId,
                "title": curTitle,
                "owner": props.user.uid,
                "users": [{"email": props.user.email, "perms": "Edit"}],
                "viewers": [props.user.email],
                "editors": [props.user.email]
            }).then(() => console.log("Added new list"));
        setCurTitle("")

        let newCurList = {
            "id": uniqueId,
            "title": curTitle,
            "owner": props.user.uid,
            "users": [{"email": props.user.email, "perms": "Edit"}],
            "viewers": [props.user.email],
            "editors": [props.user.email]
        }

        setCurList(newCurList)
        setSharedUser(newCurList.users[0])
        setAddingList(false)
    }

    function handleCancelAddList() {
        setCurTitle("")
        setAddingList(false)
    }

    function handleListChange(e) {
        let dropd = document.getElementById("listItems");
        // let selectedList = dropd.options[dropd.selectedIndex];
        let selectedList = masterListItems[dropd.selectedIndex];
        setCurList({title: e.target.value, id: selectedList.id, owner: selectedList.owner,
            users: selectedList.users, viewers: selectedList.viewers, editors: selectedList.editors})
        setSharedUser(selectedList.users[0])
    }

    function handleDeleteList(){
        if(user.uid === curList.owner){
            listItems.forEach((item) => deleteDoc(doc(db, collectionName, curList.id, listName, item.id)));
            deleteDoc(doc(db, collectionName, curList.id)).then(() => console.log("Deleted List"))

            setReadyDeleteList(true)
            setCurList(masterListItems[0])
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to change this user's permissions.")
            }

            alert("You are not allowed to delete this list. You may need to verify your email first.")
        }
    }

    function handleShareEmail(){
        if(curList.editors.includes(user.email) && (user.emailVerified || user.uid === curList.owner) ){
            if(shareEmail === ""){
                return
            }

            let userList = curList.users
            let viewList = curList.viewers
            let editList = curList.editors

            userList.push({"email": shareEmail, "perms": newUserPerms})
            viewList.push(shareEmail)
            if(newUserPerms === "Edit"){
                editList.push(shareEmail)
            }

            setDoc(doc(db, collectionName, curList.id),
                {"users": userList, "viewers": viewList, "editors": editList}, {merge: true}).then(() => console.log("Shared with new user"))

            setCurList({...curList, "users": userList, "viewers": viewList, "editors": editList});
            setShareEmail("")
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to change this user's permissions.")
            }

            alert("You are not allowed to share this list with others. You may need to verify your email first.")
        }
    }

    function handleChangeSharedUserPerms(e) {
        if(user.uid === curList.owner) {
            const updatedUserList = curList.users.map((curUser) => curUser.email === sharedUser.email ? {...curUser, "perms": e.target.value} : curUser)

            let updatedEditList = curList.editors

            if(e.target.value === "View"){
                updatedEditList = curList.editors.filter((curUser) => curUser !== sharedUser.email)
            } else {
                updatedEditList.push(sharedUser.email)
            }

            setDoc(doc(db, collectionName, curList.id),
                {"users": updatedUserList, "editors": updatedEditList}, {merge: true}).then(() => console.log("Changed user permissions"))
            setCurList({...curList, "users": updatedUserList, "editors": updatedEditList})
            setSharedUserPerms(e.target.value)
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to change this user's permissions.")
            }
        }
    }

    function handleChangedSharedUser(){
        let dropd = document.getElementById("sharedUser");
        let selectedUser = curList.users[dropd.selectedIndex];

        setSharedUser(selectedUser)
        setSharedUserPerms(selectedUser.perms)
    }

    function handleDeletePerson() {
        // Though about adding  || sharedUser.email === user.email so users can unshare themselves.
        if(user.uid === curList.owner || (curList.editors.includes(user.email) && user.emailVerified)){
            const updatedUserList = curList.users.filter((curUser) => curUser !== sharedUser)
            const updatedViewerList = curList.viewers.filter((curUser) => curUser !== sharedUser)
            const updatedEditList = curList.editors.filter((curUser) => curUser !== sharedUser)
            setDoc(doc(db, collectionName, curList.id),
                {"users": updatedUserList, "viewers": updatedViewerList, "editors": updatedEditList}, {merge: true}).then(() => console.log("Changed user permissions"))
            setCurList({...curList, "users": updatedUserList, "viewers": updatedViewerList, "editors": updatedEditList})
            setSharedUser(updatedUserList[0])
            setSharedUserPerms(updatedUserList[0].perms)
        } else {
            if (curList.editors.includes(user.email)){
                alert("You need to verify your email before editing.")
            } else {
                alert("You are not allowed to unshare this user.")
            }
        }
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
                        {masterListItems && masterListItems.length > 1 && <button onClick={()=>setReadyDeleteList(false)}>{isNarrow ? <FaTrashAlt/> : "Delete Current List"}</button>}
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
                                      value={curList ? curList.title : "Your TODO List"}>
                            <optgroup>
                                {masterListItems && masterListItems.map((list) => <option value={list.title} id={list.id}
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
                handleDeleteClick={handleDeleteClick}
                user={user}
                editors={curList ? curList.editors : []}/>}

            {(areYouSure && !addingItem && listItems && listItems.length > 0) &&
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
            {listItems && listItems.length === 0 && <i> No tasks left!</i>}
            {!addingItem && <TaskList hideCompleted={hideCompleted} listItems={listItems} addingItem={addingItem}
                                      areYouSure={areYouSure} setAddingItem={setAddingItem}
                                      selectedItems={selectedItems} setSelectedItems={setSelectedItems}
                                      listId={curList ? curList.id : masterListItems && masterListItems[0] ? masterListItems[0].id : "1"}
                                      user={user} editors={curList ? curList.editors : []}
                                      verified={user.emailVerified}
                                      owner={curList ? curList.owner === user.uid : false}/>}
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
