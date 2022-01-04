export default function Filter(props){
    return(
        <div>
            filter shown with name<input value={props.filterWord} onChange={props.handleFilterInput} />
        </div>
    );
}