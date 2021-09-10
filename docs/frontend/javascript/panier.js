//PASSE LE LOCALSTORAGE DANS ITEMS
const items = JSON.parse(localStorage.getItem('items'));

//RETIRE LA LIGNE HTML CONTENANT LES INFOS DE L'OBJET
function removeItem(element) {
  const itemToRemove = element.parentElement.parentElement;
  itemToRemove.remove(1);
}

//AFFICHE LA LIGNE PANIER VIDE SI LE LOCALSTORAGE EST VIDE
// if (items < 1 ){
//     empty.innerHTML = "Votre panier est vide";
//     productHolder.innerHTML = "";
//     dismissTotal.innerHTML = "";
// } else {
  
  //REMPLISSAGE DU PANIER LIGNE PAR LIGNE AU CHARGEMENT DE LA PAGE
  window.addEventListener('load', () => {    
    if (items < 1 ){
        empty.innerHTML = "Votre panier est vide";
        productHolder.innerHTML = "";
        dismissTotal.innerHTML = "";
    } else {

    productHolder.innerHTML = "<theader>"
            // + "<th>Produit</th>"
            + "<th>Modèle</th>"
            + "<th>Produit</th>"
            + "<th>Prix</th>"
            + "<th>Retirer</th>"
          + "</theader>"

    // dismissTotal.innerHTML = "<div class='flex-row py-2 my-4 bg-primary rounded text-center'>"
    //         + "<div>"
    //             + "<p class='col-6 my-auto ml-auto'>Total : <span id='totalPanier'></span> €</p>"
    //         + "</div>"
    //     + "</div>"
    // + "<div class='my-4'>"
    //   + "<h2>Passer votre commande</h2>"
    //   + "<em>Veuillez renseigner vos informations personnelles dans le formulaire suivant.</em>"
    // + "</div>"

    // + "<form id='formToCheck' class='my-4 pb-5'>"
    //   + "<div class='form-row'>"
          
    //     + "<div class='form-group col-6'>"
    //         "<input type='text' class='form-control' id='firstName' placeholder='Prénom' maxlength='50' required />"
    //         "<div id='firstNameValidation'></div>"
    //     + "</div>"
  
    //     + "<div class='form-group col-6'>"
    //         + "<input type='text' class='form-control' id='lastName' placeholder='Nom' maxlength='50' required />"
    //         + "<div id='lastNameValidation'></div>"
    //     + "</div>"
  
    // +"<div class='form-group col-6'>"
    //     + "<input type='text' class='form-control' id='address' placeholder='Adresse' maxlength='50' required />"
    //     + "<div id='addressValidation'></div>"
    // +"</div>"
  
    // +"<div class='form-group col-6'>"
    //     + "<input type='text' class='form-control' id='city' placeholder='Ville' maxlength='50' required />"
    //     + "<div id='cityValidation'></div>"
    // +"</div>"
  
    // +"<div class='form-group col-12'>"
    //     + "<input type='email' class='form-control' id='email' placeholder='Email' required />"
    //     + "<div id='emailValidation'></div>"
    // + "</div>"

    // + "</div>"
      
    // + "<button type='submit'  id='Submit' class='submit float-right' disabled='true'>Commander</button>"
    // + "<div id='error'></div>"

    // + "</form>";

    items.forEach(element => {
      let newID = element.choice.replace(/\s/g, '');
      
      productHolder.innerHTML += "<tr id='" + element + "'>"
        + "<td class='align-middle col-2" + newID + "'>" + element.choice + "</td>"
        + "<td class='align-middle col-4'>" + "<img class='mw-100 rounded shadow'src='" + element.imageUrl + "'></td>"
        + "<td class='align-middle col-3'><span class='price'>" + element.price / 100 + "</span>€</td>"
        + "<td class='align-middle col-3'><button class='removeItem ' onclick='removeItem(this);'><i class='fas fa-trash'></i></button></td>"
      + "</tr>"
      ;
      
      //CALCUL DU TOTAL DU PANIER
      const price = document.getElementsByClassName('price');
      const totalPanier = document.getElementById('totalPanier');

      sum = 0;
      for(i = 0; i < price.length; i++){
        sum += parseInt(price[i].innerHTML);
        totalPanier.innerHTML = sum;
      }
      
      //RETIRER UN ELEMENT DU PANIER + UPDATE DU TOTAL DU PANIER
      const removeItem = document.getElementsByClassName('removeItem');

      for (i = 0; i < removeItem.length; i++) {
        
        removeItem[i].addEventListener("click", function() {
        
          //MISE A JOUR DU TOTAL
          sum = 0;
          for(i = 0; i < price.length; i++){
            sum += parseInt(price[i].innerHTML);
            totalPanier.innerHTML = sum;
          }

          //RETRAIT DE L'OBJET DANS LE LOCALSTORAGE
          let items = JSON.parse(localStorage.getItem('items'));
          items.splice(items.indexOf(items[i]), 1);
          localStorage.setItem('items', JSON.stringify(items));
            
          //AFFICHAGE DU "PANIER VIDE" S'IL N'Y A PLUS D'ELEMENT DANS LE LOCALSTORAGE
          if (items.length < 1) {
            empty.innerHTML = "Votre panier est vide";
            productHolder.innerHTML = "";
            dismissTotal.innerHTML = "";
          }
        });
      };          
    });


    //DESACTIVATION DU BOUTON SUBMIT SI LES REGEXPRs NE SONT PAS RESPECTER
    function disableSubmit(disabled) {
        if (disabled) {
            document.getElementById("Submit").setAttribute("disabled", true);
        } else {
            document.getElementById("Submit").removeAttribute("disabled");
        }
    }

    //REGEXPRs POUR CHAQUE INPUTs DU FORMULAIRE
    document.getElementById("firstName").addEventListener("input", function(event) {

        if (/^[A-zÀ-ÿ'\s-]{2,50}$/.test(event.target.value)) {
            document.getElementById("firstNameValidation").innerHTML = "";
            disableSubmit(false);
        } else {
            document.getElementById("firstNameValidation").innerHTML = "<sub>* Veuillez renseigner un prénom valide</sub>";
            disableSubmit(true);
        }
    });

    document.getElementById("lastName").addEventListener("input", function(event) {

        if (/^[A-zÀ-ÿ'\s-]{2,50}$/.test(event.target.value)) {
            document.getElementById("lastNameValidation").innerHTML = "";
            disableSubmit(false);
        } else {
            document.getElementById("lastNameValidation").innerHTML = "<sub>* Veuillez renseigner un nom valide</sub>";
            disableSubmit(true);
        }
    });

    document.getElementById("address").addEventListener("input", function(event) {

        if (/^[0-9]{1,6}[A-zÀ-ÿ'\s-]{3,50}$/.test(event.target.value)) {
            document.getElementById("addressValidation").innerHTML = "";
            disableSubmit(false);
        } else {
            document.getElementById("addressValidation").innerHTML = "<sub>* Veuillez renseigner une adresse valide</sub>";
            disableSubmit(true);
        }
    });

    document.getElementById("city").addEventListener("input", function(event) {

        if (/^[A-zÀ-ÿ'\s-]{2,50}$/.test(event.target.value)) {
            document.getElementById("cityValidation").innerHTML = "";
            disableSubmit(false);
        } else {
            document.getElementById("cityValidation").innerHTML = "<sub>* Veuillez renseigner un nom de ville valide</sub>";
            disableSubmit(true);
        }
    });

    document.getElementById("email").addEventListener("input", function(event) {

        if (/[a-z0-9._%+-]+@([a-z0-9]+\.)[a-z]{2,4}$/.test(event.target.value)) {
            document.getElementById("emailValidation").innerHTML = "";
            disableSubmit(false);
        } else {
            document.getElementById("emailValidation").innerHTML = "<sub>* Veuillez renseigner une adresse mail valide</sub>";
            disableSubmit(true);
        }
    });

    //RENVOIE LES INFORMATIONS AU BACKEND
    function addContact() {
      event.preventDefault();     
      localStorage.setItem("totalPanier", totalPanier.innerHTML);

      let contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
      }
      console.log(contact);
      localStorage.setItem("contact", JSON.stringify(contact));

      let products = [];

      items.forEach(element => {
        let productsId = element.id;
        products.push(productsId).toString();
      });
      console.log(products);

      let send = {
          contact,
          products,
      }
      console.log(send);

        // envoie des données au serveur
        const post = async function (data){
            try {
                let response = await fetch('http://localhost:3000/api/teddies/order', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(response.ok) {
                    let data = await response.json();
                    console.log(data.orderId);
                    localStorage.setItem("orderId", data.orderId);
                    console.log(localStorage);
                    window.location = "commande.html";
                }
            } catch (error) {} 
        };
        post(send);
    }

    //VERRIFIE QUE TOUTES LES INPUTS ONT ETE REMPLIES
    document.getElementById("Submit").addEventListener('click', inputFilledChecker);

    function inputFilledChecker (event) {
        event.preventDefault();  
        let inputFilled = true;

        document.getElementById('formToCheck').querySelectorAll("[required]").forEach(function(input){
            if (!input.value) {
              inputFilled = false;
            }
            if (!inputFilled) {
              document.getElementById('error').innerHTML = '<sub>* Veuillez remplir tous les champs</sub>'
            } else {
              return true;
            }
        })
        if (inputFilled == true){
          addContact(event);
          disableSubmit(false);
        }
    }}
  });