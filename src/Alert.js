import './Alert.css';

function Alert(props) {
    return <div className={"backdrop"}>
        <div className="modal">
            {props.children}
            <div className="alert-buttons">
                <button className={"alert-button alert-cancel"} type={"button"}
                        onClick={() => {
                            props.onClose();
                            props.onCancel(props.auth);
                        }}>
                    Sign Out
                </button>
                <button className={"alert-button alert-ok"} type={"button"}
                        onClick={() => {
                            props.onClose();
                            props.onOK();
                        }}>
                    Done
                </button>
            </div>
        </div>
    </div>
}

export default Alert;