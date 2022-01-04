export default function Numbers(props){
    return(
        <div>
            <h2>Numbers</h2>
            {
                props.data.length > 0 ?
                    props.data.filter((item) => {
                    return item.name.toLowerCase().includes(props.filterWord.toLowerCase());
                    })
                    .map(person=>
                        <div key={person.id}>
                            {person.name} {person.number} <button onClick={()=>{props.handleDelete(person.id)}}>delete</button>
                        </div>
                    )
                    : <p>no data, please add numbers</p>
            }
        </div>
    );
}