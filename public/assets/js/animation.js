document.addEventListener('DOMContentLoaded', function(e) {
    var elem = document.querySelector('.modal');
    var instances = M.Modal.init(elem);

    var cookie = new CookiePseudo();
    var fieldPseudo = new FieldPseudo();
    var logout = document.querySelector('#logout');

    // Si l'utilisateur est connecté
    if ( cookie.getCookie() ) {
        if ( cookie.getCookie().length !== 0 ) {
            // Ajout ou modification du cookie pseudo
            fieldPseudo.addPseudo(cookie.getCookie())
            // Affichage de lien de déconnexion
            logout.removeAttribute('class', 'logout');
        }

        // Si le cookie est défini, on ajoute un attribut disabled
        fieldPseudo.addDisabled();

        // Déconnexion et suppression du cookie
        logout.addEventListener('click', function() {
            cookie.remove();
            logout.setAttribute('class', 'logout')
        })
    }
    else {
        // Ouverture de la popup si le cookie est vide
        instances.open();

        // Au click la popup s'ouvre
        document.querySelector('#pseudo').addEventListener('click', function() {
            instances.open();
        });
    }
    
    // Dans la popup au click sur enregister, la valeur est enregistré dans un cookie
    document.querySelector('#addPseudo').addEventListener('submit', function(e) {
        var pseudo = document.querySelector("#pseudoSend").value.trim();
        cookie.add(pseudo);
    })
});

class FieldPseudo {
    constructor() {
        this.pseudo = document.querySelector('#pseudo');
        this.pseudoValue = document.querySelector('#pseudoValue');
    }

    // ajout de l'attribut disabled si le champ est vide
   addDisabled() {
        if ( this.pseudo.value.trim() !== '' ) {
            this.pseudo.setAttribute('disabled', true);
        }
    }

    // ajout la valeur dans le champ
    addPseudo(pseudo) {
        this.pseudo.value = pseudo;
        this.pseudoValue.value = pseudo;
    }

    // retire la valeur dans le champ
    removePseudo() {
        this.pseudo.value = '';
        this.pseudoValue.value = '';
    }
}

class CookiePseudo {
    // Ajout du cookie pseudo
    add(pseudo) {
        document.cookie = "pseudoTodo=" + pseudo;
    }

    // Suppression du cookie pseudo
    remove() {
        document.cookie= "pseudoTodo=";
    }

    // Return la valeur du cookie pseudo
    getCookie() {
        var name =  "pseudoTodo=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
}