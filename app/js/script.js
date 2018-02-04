window.addEventListener('DOMContentLoaded', init);

function init() {
    var d = document,
          html = d.documentElement,
          body = d.body;
    /** first page **/
    var heightClientScreen = html.clientHeight, // client height of document html
        navLink = d.querySelectorAll('#nav_link'), // the array of nav link
        btnHomeUp = d.querySelector('#btn-up'), // button on Home page - fixed
        btnContactUs = d.querySelector('#contact-us-btn');
    // function for height of section 
    var heightOfSection = function(id) {
        if(typeof(id) === 'string')
            item = d.querySelector('#'+id);
        return item.clientHeight;
    }

    var heightWork = heightOfSection('about-us')+heightOfSection('about-us_2'),
        heightProcess = heightWork+heightOfSection('works_2')+heightOfSection('works'),
        heightServices = heightWork+heightProcess,
        heightTestim = heightServices+heightOfSection('testim'),
        heightContact = heightTestim+heightOfSection('emblem')+heightOfSection('form');

    // event for display or hide button to Home page
    window.addEventListener('scroll', function() {
        var pageY = window.pageYOffset || html.scrollTop;
        btnHomeUp.style.visibility = (pageY >= heightClientScreen) ? 'visible' : 'hidden';
    })
    // event for return on click to Home page
    btnHomeUp.addEventListener('click', function() {
        window.scrollTo(0, 0);
    })
    btnContactUs.addEventListener('click', function() {
        window.scrollTo(0, heightClientScreen+heightContact);
    })
    // work nav menu
    navLink.forEach( function(el) {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            switch(el.textContent) {
                case "About" : window.scrollTo(0, heightClientScreen); break;
                case "Work" : window.scrollTo(0, heightClientScreen+heightWork); break;
                case "Process" : window.scrollTo(0, heightClientScreen+heightProcess); break;
                case "Services" : window.scrollTo(0, heightClientScreen+heightServices); break;
                case "Testimonials" : window.scrollTo(0, heightClientScreen+heightTestim); break;
                case "Contact": window.scrollTo(0, heightClientScreen+heightContact);break;
            }

        });
    })

    /** show image **/
    var allImgWorks = d.querySelectorAll('.maincontent__fotogallery-img');
    allImgWorks.forEach(function(el) {
        el.addEventListener('click', function(event) {
            var _self = event.currentTarget;
            var parent = _self.parentNode;
            parent.classList.add('modal');
            _self.classList.add('modal-img');
            parent.addEventListener('click', function(event) {
                if(event.target === event.currentTarget) {
                    event.currentTarget.classList.remove('modal');
                    _self.classList.remove('modal-img');
                }
            });
         });
    });

    /** show reviews */
    var selectedBtn = d.querySelector('#btn-rev2'),
        selectedRev = d.querySelector('#michael'),
        mainDivRev = d.querySelector('.maincontent__quote-wrap');

    var showBtn = function(node) {
        if(selectedBtn) {
            selectedBtn.classList.remove('active-quote-btn');
        }
        selectedBtn = node;
        selectedBtn.classList.add('active-quote-btn');
    }

    var showRev = function(id) {
        var rev = d.querySelector('#'+id);
        if(selectedRev) {
            selectedRev.classList.remove('quote-wrap-active');
        }
        selectedRev = rev;
        selectedRev.classList.add('quote-wrap-active');

    }

    mainDivRev.addEventListener('click', function(event) {
        var target = event.target;
        var idRev = target.getAttribute('data-user');
        if(target.tagName != 'BUTTON') return;
        showBtn(target);
        showRev(idRev);
    })

    /**     filling fields  **/
    var inputName = d.querySelector('.maincontent__order-form-name'),
        inputEmail = d.querySelector('.maincontent__order-form-email'),
        inputTitle = d.querySelector('.maincontent__order-form-title'),
        inputComment = d.querySelector('.maincontent__order-form-comment'),
        sendBtn = d.querySelector('#btn'),
        list = d.querySelector('.list');

    sendBtn.addEventListener('click', function(event) {
        var name = inputName.value.trim(),
            email = inputEmail.value.trim(),
            title = inputTitle.value.trim(),
            comment = inputComment.value.trim(),
            forms =[name, email, title, comment];
        createTask(name, email, title, comment);
        inputName.value = '';
        inputEmail.value = '';
        inputTitle.value = '';
        inputComment.value = '';
    });
    
    var createTask = function(v1, v2, v3, v4) {
        var li = d.createElement('li');
        if(v1.length && v2.length && v3.length && v4.length){
        li.textContent = 'Your name:' + v1 + ' ' + 'Your email:' + v2+ ' ' + 'Your title:' + v3+ ' ' + 'Your comment:' + v4;
        list.appendChild(li);
        } else {
            alert('Заполните все поля!');
        }
    }
}