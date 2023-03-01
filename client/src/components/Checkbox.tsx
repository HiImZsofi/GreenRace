function CheckboxDark(props: {
    darkTheme:boolean;
    onSwitchHandler: () => void;
}){
    return (
        <>
            <p className="mb-1">Darkmode:</p>
            <div className="checkbox-wrapper-54">
            <label className="switch">
            <input type="checkbox" checked={props.darkTheme} onChange={props.onSwitchHandler}/>
            <span className="slider"></span>
            </label>
            </div>
        </>
    );
}
export default CheckboxDark;
