// Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({

                behavior:'smooth'

            });

    });

});

// Navbar shadow while scrolling

window.addEventListener('scroll',()=>{

    const header=document.querySelector('header');

    if(window.scrollY>40){

        header.style.boxShadow="0 8px 30px rgba(0,0,0,.35)";

    }

    else{

        header.style.boxShadow="none";

    }

});