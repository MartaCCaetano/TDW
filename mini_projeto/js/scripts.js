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

// Código para o projeto

// Vai buscar todas as classes existentes na API
const urlall = "https://www.dnd5eapi.co/api/classes";

// Array para guardar os url das classes
let allclasses = [];
let countcards = 1;
// Array para guardar as classes que já foram utilizadas
let usedClasses = [];

//Array para imagens das classes
const classimgs = [
    "imgs/barbarian.png", //ir buscar imagens
    "imgs/bard.png",
     "imgs/cleric.png",
     "imgs/druid.png",
    "imgs/fighter.png", 
     "imgs/monk.png",
     "imgs/paladin.png",
     "imgs/ranger.png",
    "imgs/rogue.png",
    "imgs/sorcerer.png",
    "imgs/warlock.png",
    "imgs/wizard.png",
]

// Preenche o array de classes
fetch(urlall).then(function(res) {
    return res.json();
}).then(function(data) {
    data.results.forEach(function(classes) {
        allclasses.push(classes.url);
    });
}).catch(function(error) {
    console.log(error);
});

const createCharacters = document.getElementById("randombtn");
createCharacters.addEventListener("click", randomizeCharacters);

function randomizeCharacters() {
    if (countcards <= 3) {
        countcards++;
        
        // Utilizado para depois escolher uma posição random dos urls
        let random;
        do {
            random = Math.floor(Math.random() * allclasses.length); // Usa o comprimento real do array
        } while (usedClasses.includes(random));

        // Adiciona a class utilizada no final da lista de classes utilizadas
        usedClasses.push(random);

        // Espaço para os cards                
        const cards = document.getElementById('characters');
        // Espaço para o modal
        const espaçomodal = document.getElementById('modal');

        // Guarda na variável "classesurl" o url da classe na posição random do allClasses
        let classesurl = allclasses[random];

        // Criar Cards com as informações dos personagens aleatórios
        function buildCharacter(classCharacter, proficiencies, equipment, subClassesName, subClassDetails, imgpath) {
            // Card do personagem
            return `<div class="card col-md-3 mx-2 mb-3">
                        <img src="${imgpath}" class="card-img-top col-md-2 mb-2" alt="...">
                        <div class="card-body">
                            <p id="classname" class="card-text"><b>Class Name: </b>${classCharacter}</p>
                            <p id="proficiencies" class="card-text"><b>Proficiency: </b>${proficiencies}</p>
                            <p id="equipment" class="card-text"><b>Equipment: </b>${equipment}</p>
                            <p id="subclass" class="card-text"><b>SubClass: </b>${subClassesName}</p>
                            <a class="btn-primary btn-xl mb-4 btnsubClassDetails" data-subclass="${subClassesName}" data-subclassurl="${subClassDetails}">Ver SubClass</a>
                        </div>
                    </div>`;
        }

        fetch("https://www.dnd5eapi.co" + classesurl).then(function(res) {
            return res.json();
        }).then(function(data) {
            let classCharacter = data.name;
            let proficiencies = data.proficiencies.map(function(p) { return p.name; }).join("/");
            let equipment = "No equipment"; // default
            let subClassesName = data.subclasses[0] ? data.subclasses[0].name : 'Não há subclass';
            let subClassDetails = data.subclasses[0] ? data.subclasses[0].url : '';

            if (random != 4) {
                equipment = "";
                // Percorrer o array de equipment e adicionar conteúdo que existe
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

            cards.innerHTML += buildCharacter(classCharacter, proficiencies, equipment, subClassesName, subClassDetails, classimgs[random]);

            document.querySelectorAll('.btnsubClassDetails').forEach(function(button) {
                button.addEventListener('click', function() {
                    const subClassName = button.getAttribute('data-subclass'); // Obter o valor do data-subclass
                    const subClassDetails = button.getAttribute('data-subclassurl'); // url da subclass

                    fetch("https://www.dnd5eapi.co" + subClassDetails).then(function(res) {
                        return res.json();
                    }).then(function(data) {
                        let subClassDesc = data.desc[0]; // descrição da subclass

                        espaçomodal.innerHTML = subclassinfo(subClassName, subClassDesc); // Atualizar o modal com informações
                        const modalElement = document.querySelector('.modal'); // Selecionar o modal
                        const modal = new bootstrap.Modal(modalElement); // Inicializar o modal
                        modal.show(); // Exibir o modal
                    }).catch(function(error) {
                        console.log(error);
                    });
                });
            });
        }).catch(function(error) {
            console.log(error);
        });
    }
}

// Função para criar o modal de subclass
function subclassinfo(subClassesName, subClassDesc) {
    return `<div class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${subClassesName}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${subClassDesc}</p>
                        </div>
                    </div>
                </div>
            </div>`;
}


             