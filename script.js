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
    const compteur = document.getElementById("nombre-panier");

if (compteur) {
    compteur.innerHTML = panier.length;
}

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
if(compteur){

    compteur.innerHTML = panier.length;

}


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

    let filtre = document.getElementById("recherche").value.toLowerCase().trim();

    let produits = document.querySelectorAll(".carte");
let suggestions = document.getElementById("suggestions");
let nbResultats = document.getElementById("nb-resultats");

if(!suggestions || !nbResultats){
    return;
}

    let compteur = 0;

    let dejaAjoutes = [];

    suggestions.innerHTML = "";

    produits.forEach(function(carte){

        let texte = carte.innerText.toLowerCase();

        let titre = carte.querySelector("h3");

        if(!titre) return;

        let nom = titre.innerText;

        if(texte.includes(filtre)){

            carte.style.display = "flex";

            compteur++;

            if(
                filtre.length > 0 &&
                nom.toLowerCase().includes(filtre) &&
                !dejaAjoutes.includes(nom) &&
                dejaAjoutes.length < 5
            ){

                dejaAjoutes.push(nom);

                suggestions.innerHTML +=
              '<div onclick="choisirProduit(\'' + nom + '\')">🔍 ' + nom + '</div>';
            }

        }else{

            carte.style.display = "none";

        }

    });

    suggestions.style.display =
        suggestions.innerHTML ? "block" : "none";

    nbResultats.innerHTML =
        compteur + " produit(s) trouvé(s)";
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
// =========================
// Compte à rebours Promotion
// =========================

// Date de fin de la promotion
const dateFin = new Date("December 31, 2026 23:59:59").getTime();

setInterval(function(){

    const maintenant = new Date().getTime();

    const difference = dateFin - maintenant;

    if(difference <= 0){

        document.getElementById("timer").innerHTML =
        "Promotion terminée";

        return;

    }

    const jours = Math.floor(difference / (1000 * 60 * 60 * 24));

    const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    const secondes = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
    jours + " j " +
    heures + " h " +
    minutes + " min " +
    secondes + " s";

},1000);

function choisirProduit(nom){

    document.getElementById("recherche").value = nom;

    document.getElementById("suggestions").style.display="none";

    rechercherProduit();

}
/* ===== Navigation clavier des suggestions ===== */

let indexSuggestion = -1;

document.getElementById("recherche").addEventListener("keydown", function(e){

    let items = document.querySelectorAll("#suggestions div");

    if(items.length === 0) return;

    if(e.key === "ArrowDown"){

        e.preventDefault();

        indexSuggestion++;

        if(indexSuggestion >= items.length) indexSuggestion = 0;

        majSuggestion(items);

    }

    else if(e.key === "ArrowUp"){

        e.preventDefault();

        indexSuggestion--;

        if(indexSuggestion < 0) indexSuggestion = items.length - 1;

        majSuggestion(items);

    }

    else if(e.key === "Enter"){

        if(indexSuggestion >= 0){

            e.preventDefault();

            items[indexSuggestion].click();

        }

    }

    else if(e.key === "Escape"){

        document.getElementById("suggestions").style.display = "none";

        indexSuggestion = -1;

    }

});

function majSuggestion(items){

    items.forEach(item => item.classList.remove("active"));

    items[indexSuggestion].classList.add("active");

}
