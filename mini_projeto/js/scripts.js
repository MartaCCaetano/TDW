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

let nrMax = 4
let nrMin = 0

//Utilizado para depois escolher uma posição random do "positions"
let random = Math.floor(Math.random() * (nrMax - nrMin));

fetch(urlall).then(function (res) {
                return res.json();
            }).then(function (data) {
                //console.log(data);
                data.results.forEach(function (classes) {
                    //guardar os url das API uns a seguir aos outros dentro do array
                    allclasses.push(classes.url);
                });

                //Variável positions para identificar urls das classes que quero usar
                let positions = [0, 1, 4, 8];

                //Guarda na variável "classesurl" o url da classe na posição random do allClasses
                let classesurl = allclasses[positions[random]];
                //console.log(classesurl);
            


fetch("https://www.dnd5eapi.co/"+classesurl).then(function (res) {
                return res.json();
            }).then(function (data) {
                //console.log(data);
                    let classCharacter = data.name;
                    let proficiencies = data.proficiencies.name;
                    let equipment = data.starting_equipment.name;
                    let subClasses = data.subclasses.name;
                   // let spellCasting = data.spellcasting.spellcasting_ability.name;

                    console.log(classCharacter);
                
            }).catch(function (error) {
                console.log(error);
            }); 


            }).catch(function (error) {
                console.log(error);
            });
            //console.log(allclasses);
          


           
           
             