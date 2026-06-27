// ===========================
// LE PRESTIGE - PANIER
// ===========================

let panier = [];
let total = 0;

// Ajouter un produit
function ajouterPanier(nom, prix) {

    panier.push({
        nom: nom,
        prix: prix
    });

    afficherPanier();

}

// Afficher le panier
function afficherPanier() {

    const liste = document.getElementById("liste-panier");
    const totalElement = document.getElementById("total");

    if (!liste || !totalElement) return;

    liste.innerHTML = "";

    total = 0;

    panier.forEach(function(produit, index){

        total += produit.prix;

        liste.innerHTML += `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #444;">

            <div>

                <strong>${produit.nom}</strong><br>

                ${produit.prix.toLocaleString()} FCFA

            </div>

            <button onclick="supprimerProduit(${index})">
                ❌
            </button>

        </div>
        `;

    });

    if (panier.length === 0) {

        liste.innerHTML = "<p>Votre panier est vide.</p>";

    }

    totalElement.innerHTML = total.toLocaleString();

}

// Supprimer un produit

function supprimerProduit(index){

    panier.splice(index,1);

    afficherPanier();

}

// Vider le panier

function viderPanier(){

    panier = [];

    afficherPanier();

}

// Commander

function commanderWhatsApp(){

    if(panier.length===0){

        alert("Votre panier est vide.");

        return;

    }

    let message =
`Bonjour Le Prestige Vins & Spiritueux,

Je souhaite commander :

`;

    panier.forEach(function(produit){

        message +=
`• ${produit.nom}
  ${produit.prix.toLocaleString()} FCFA

`;

    });

    message +=
`Total : ${total.toLocaleString()} FCFA

Nom :
Téléphone :
Adresse :

Merci.`;

    const lien =
"https://wa.me/2290197592841?text="+encodeURIComponent(message);

    window.open(lien,"_blank");

}

// Charger le panier

window.onload = function(){

    afficherPanier();

}
// Recherche

function rechercherProduit(){

    let filtre = document.getElementById("recherche").value.toUpperCase();

    let produits = document.querySelectorAll(".carte");

    produits.forEach(function(carte){

        let titre = carte.querySelector("h3");

        if(!titre) return;

        if(titre.innerHTML.toUpperCase().indexOf(filtre) > -1){

            carte.style.display="block";

        }else{

            carte.style.display="none";

        }

    });

}

// Catégories

function filtrerCategorie(categorie){

    let produits = document.querySelectorAll(".produits .carte");

    produits.forEach(function(carte){

        if(categorie==="tous"){

            carte.style.display="block";

        }

        else if(carte.classList.contains(categorie)){

            carte.style.display="block";

        }

        else{

            carte.style.display="none";

        }

    });

}
