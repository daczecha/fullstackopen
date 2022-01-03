export default function Filter(props){
    return(
        <div>
            <h2>Phonebook</h2>
            filter shown with name<input value={props.filterWord} onChange={props.handleFilterInput} />
        </div>
    );
}