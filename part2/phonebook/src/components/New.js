export default function New(props){
    return(
        <div>
            <h3>add a new</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    name: <input value={props.newName} onChange={props.handleNameInput} />
                    <br></br>
                    number: <input value={props.newNumber} onChange={props.handleNumberInput} />
                    <br></br>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}