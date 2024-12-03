function Button(props) {
  return (
    <button className="btn btn-primary btn-xl mb-4" onClick={props.onClick}>
      Randomize Characters
    </button>
  );
}

export default Button;
