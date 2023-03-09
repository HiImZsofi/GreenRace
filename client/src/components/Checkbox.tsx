function CheckboxDark(props: {
    onSwitchHandler: () => void;
}){
    let dark = localStorage.getItem('darkmode');
    return (
        <>
            <p className="mb-1">Éjszakai mód:</p>
            <div className="checkbox-wrapper-54">
            <label className="switch">
            <input type="checkbox" checked={dark == "false" ? true : false} onChange={props.onSwitchHandler}/>
            <span className="slider"></span>
            </label>
            </div>
        </>
    );
}
export default CheckboxDark;
