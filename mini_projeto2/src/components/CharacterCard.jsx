function CharacterCard(props) {
  //console.log(props.data);
  return (
    <div className="card col-md-3 mx-2 mb-3">
      <img
        src={props.data.image}
        className="card-img-top"
        alt="{props.data.name}"
      />
      <div className="card-body">
        <p>
          <b>Class Name:</b> {props.data.name}
        </p>
        <p>
          <b>Proficiency:</b> {props.data.proficiencies}
        </p>
        <p>
          <b>Equipment:</b> {props.data.equipment}
        </p>
        <p>
          <b>SubClass:</b> {props.data.subclass.name}
        </p>
        {props.data.subclass.url && ( //Se existir informação no url da subclass, o botão é renderizado
          <button
            className="btn btn-primary mb-2 me-2"
            onClick={() => props.pmodalInfo(props.data)}
          >
            View SubClass
          </button>
        )}
        <button className="btn btn-danger mb-2" onClick={props.deleteCharacter}>
          Delete Character
        </button>
      </div>
    </div>
  );
}

export default CharacterCard;
