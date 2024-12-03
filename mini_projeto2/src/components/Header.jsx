import Button from "./Button.jsx";

function Header(props) {
  return (
    <header className="masthead d-flex align-items-center py-2">
      <div className="container text-center">
        <h1>D&D Characters' Builder</h1>
        <h3>Randomize until 3 different characters.</h3>
        {<h2>{props.message}</h2>}
        <div>
          <Button onClick={props.randomizeCharacters} />
        </div>
      </div>
    </header>
  );
}

export default Header;
