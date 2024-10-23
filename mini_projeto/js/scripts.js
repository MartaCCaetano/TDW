/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};


//Código para o projeto

//Vai buscar todas as classes existentes na API
const urlall = "https://www.dnd5eapi.co/api/classes";

//Array para guardar os url das classes
let allclasses = [];

let nrMax = 12
let nrMin = 0
let countcards = 1;
//Array para gardar as classes que já foram utilizadas
let usedClasses = [];

const createCharacters = document.getElementById("randombtn");
createCharacters.addEventListener("click", randomizeCharacters);

function randomizeCharacters(){
if(countcards <= 3){
    countcards++
    //Utilizado para depois escolher uma posição random dos urls
    let random;
    do{ 
        random = Math.floor(Math.random() * (nrMax - nrMin));
      //Verifica se uma classe já foi utilizada  
    } while(usedClasses.includes(random));

    //Adiciona a class utilizada no final da lista de classes utilizadas
    usedClasses.push(random);

fetch(urlall).then(function (res) {
                return res.json();
            }).then(function (data) {
                //console.log(data);
                data.results.forEach(function (classes) {
                    //guardar os url das API uns a seguir aos outros dentro do array
                    allclasses.push(classes.url);
                });

                //Guarda na variável "classesurl" o url da classe na posição random do allClasses
                let classesurl = allclasses[random];
                //console.log(classesurl);
                //console.log(random);
            
const cards = document.getElementById('characters');

//Criar Cards com as informações dos personagens aleatórios
function buildCharacter(classCharacter, proficiencies, equipment, subClasses) {
    return `<div class="card col-md-3 mx-2 mb-3">
                <img src="imgs/character.png" class="card-img-top col-md-3 mb-3" alt="...">
                <div class="card-body">
                    <p id="classname" class="card-text"><b>Class Name: </b>${classCharacter}</p>
                    <p id="proficiencies" class="card-text"><b>Proficiency: </b>${proficiencies}</p>
                    <p id="equipment" class="card-text"><b>Equipment: </b>${equipment}</p>
                    <p id="subclass" class="card-text"><b>SubClass: </b>${subClasses}</p>
                </div>
            </div>`;
}

fetch("https://www.dnd5eapi.co"+classesurl).then(function (res) {
                return res.json();
            }).then(function (data) {
                //console.log(data);
                    let classCharacter = data.name;
                    let proficiencies = data.proficiencies[0].name + "/" + data.proficiencies[1].name + "/" + data.proficiencies[2].name;
                    let equipment = "No equipment"; //default
                    //console.log(data.starting_equipment.length);
                    if(random!=4){
                        equipment = "";
                        //Percorrer o array de equipment e adicionar conteúdo que existe
                        for(let cnt=0; cnt<data.starting_equipment.length;cnt++){
                            //console.log(cnt);
                            //Retira a "/" no final do texto
                            if(cnt!=data.starting_equipment.length - 1){
                            equipment+=data.starting_equipment[cnt].equipment.name + "/";
                            }
                            else{
                            equipment+=data.starting_equipment[cnt].equipment.name;
                            }
                        }
                    }
                    subClasses = data.subclasses[0].name;

                    cards.innerHTML += buildCharacter(classCharacter, proficiencies, equipment, subClasses);

                    //console.log(classCharacter);

                
            }).catch(function (error) {
                console.log(error);
            });
         


            }).catch(function (error) {
                console.log(error);
            });
            //console.log(allclasses);
        }    

}

           
             