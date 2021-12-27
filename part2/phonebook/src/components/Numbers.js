export default function Numbers(props){
    return(
        <div>
            <h2>Numbers</h2>
            {
                props.data.filter((item) => {
                return item.name.toLowerCase().includes(props.filterWord.toLowerCase());
                })
                .map(person=><p key={person.id}>{person.name} {person.number}</p>)
            }
        </div>
    );
}