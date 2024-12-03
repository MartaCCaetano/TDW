import { useState } from "react";

import Header from "./components/Header.jsx";
import CharacterCard from "./components/CharacterCard.jsx";
import Modal from "./components/Modal.jsx";

function App() {
  const [characters, setCharacters] = useState([]); //Array que vai permitir armazenar e alterar os personagens gerados
  const [modalInfo, setModalInfo] = useState(null); //vai permitir abrir e fechar o modal das informações da subclass, por defeito ele está fechado
  const [message, setMessage] = useState(""); //Mensagem que indica se um character foi gerado

  //console.log(modalInfo);
  //console.log(characters);

  //Identificar o index do character que queremos remover
  function deleteCharacter(indexRemove) {
    //console.log(indexRemove);

    //O estado de characters vai ser atualizado com um novo index conforme o elemento que for removido, permitindo ao utilizador randomizar um novo elemento
    setCharacters(function (deletedCharacters) {
      return deletedCharacters.filter(function (_, index) {
        return index !== indexRemove; //Se o index não for igual ao que queremos remover, o character é mantido
      });
    });
  }

  let countcards = 1;

  const classImages = {
    Barbarian: "imgs/barbarian.png",
    Bard: "imgs/bard.png",
    Cleric: "imgs/cleric.png",
    Druid: "imgs/druid.png",
    Fighter: "imgs/fighter.png",
    Monk: "imgs/monk.png",
    Paladin: "imgs/paladin.png",
    Ranger: "imgs/ranger.png",
    Rogue: "imgs/rogue.png",
    Sorcerer: "imgs/sorcerer.png",
    Warlock: "imgs/warlock.png",
    Wizard: "imgs/wizard.png",
  };

  //Função para o fetch das classes
  function fetchClasses() {
    const urlall = "https://www.dnd5eapi.co/api/classes"; //link da API
    return fetch(urlall)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        return data.results.map(function (classes) {
          //cria um array com os url de cada class
          return classes.url;
        });
      });
  }

  function randomizeCharacters() {
    if (countcards <= 3) {
      countcards++;

      fetchClasses().then(function (allClasses) {
        //console.log(allClasses);
        if (characters.length < 3) {
          const random = Math.floor(Math.random() * allClasses.length); //gera um número aleatório
          const classUrl = allClasses[random]; //Utiliza o número aleatório para randomizar o url da class

          //console.log(allClasses);
          //console.log(classUrl);

          fetch("https://www.dnd5eapi.co" + classUrl)
            .then(function (resp) {
              return resp.json();
            })
            .then(function (classData) {
              let proficiencies = "";
              let subclass = classData.subclasses[0].url;
              for (let i = 0; i < classData.proficiencies.length; i++) {
                proficiencies += classData.proficiencies[i].name;
                if (i < classData.proficiencies.length - 1) {
                  proficiencies += ", "; //Adiciona uma vírgula entre cada item
                }
                //console.log(subclass);
              }

              fetch("https://www.dnd5eapi.co" + subclass)
                .then(function (resp) {
                  return resp.json();
                })
                .then(function (subclassData) {
                  //console.log(subclassData);
                  let subclassDesc = subclassData.desc;
                  let subclassName = subclassData.name;
                  //console.log(subclassname);

                  //Objeto para armazenar dados dos personagens
                  const character = {
                    image: classImages[classData.name], //Associa o nome da imagem do objeto com o nome que recebe da API
                    name: classData.name,
                    proficiencies: proficiencies,
                    subclassname: subclassName,
                    description: subclassDesc,
                    equipment: classData.starting_equipment
                      ? classData.starting_equipment
                          .map(function (eq) {
                            return eq.equipment.name;
                          })
                          .join(", ")
                      : "No equipment", //Caso haja equipment, vai retornar os valores e separalos com vírgulas, caso não exista nenhum valor, vai escrever "No equipment"
                    subclass: classData.subclasses[0] || {
                      name: "None",
                      url: "",
                    }, //Verifica se existe alguma subclass, caso não exista vai escrever "None" no nome e deixar o url em branco, vai escrever uma das duas opções apresentadas
                  };

                  //console.log(classData.name);
                  //console.log(character);

                  setCharacters(function (newCharacter) {
                    const updatedCharacters = [...newCharacter, character]; //Cria um array com todos os elementos que existem no "newCharacter" e adiciona um novo "character"
                    //console.log(updatedCharacters);
                    return updatedCharacters;
                  });

                  setMessage(
                    `New randomized character below: ${character.name}`
                  );
                });
            });
        }
      });
    }
  }

  return (
    <div>
      <Header randomizeCharacters={randomizeCharacters} message={message} />
      <div className="backgroundCard">
        <div className="container mt-3">
          <div className="row">
            {characters.map(function (character, index) {
              //console.log(character);

              //Vai gerar um novo array com os componentes de "CharacterCard", para cada personagem gera um novo card
              //return <p key={index}>Test Card</p>;
              return (
                <CharacterCard
                  key={index}
                  data={character}
                  pmodalInfo={(character) => setModalInfo(character)}
                  deleteCharacter={() => deleteCharacter(index)} //Passa a função para o "CharacterCard"
                />
              );
            })}
          </div>
        </div>
      </div>
      {modalInfo && (
        <Modal
          name={modalInfo.subclassname}
          description={modalInfo.description}
          onClose={() => setModalInfo(null)}
        />
      )}
    </div>
  );
}

export default App;
