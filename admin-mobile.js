function genererCode() {

    const image = document.getElementById("image").value;
    const nom = document.getElementById("nom").value;
    const prix = document.getElementById("prix").value;
    const stock = document.getElementById("stock").value;
    const categorie = document.getElementById("categorie").value;
    const description = document.getElementById("description").value;

    if (
        image === "" ||
        nom === "" ||
        prix === "" ||
        stock === "" ||
        description === ""
    ) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Aperçu du produit
    document.getElementById("apercu").innerHTML = `
        <div class="carte ${categorie}">

            <img src="${image}" alt="${nom}" style="width:100%;border-radius:10px;">

            <h3>${nom}</h3>

            <p>${description}</p>

            <p><strong>${Number(prix).toLocaleString()} FCFA</strong></p>

            <p>📦 En stock : ${stock}</p>

        </div>
    `;

    // Génération du code HTML
    const code = `
<div class="carte ${categorie}">

    <img src="${image}" alt="${nom}">

    <h3>${nom}</h3>

    <p>${description}</p>

    <p class="prix">${Number(prix).toLocaleString()} FCFA</p>

    <p class="stock">📦 En stock : ${stock}</p>

    <button onclick="ajouterPanier('${nom}', ${prix})">
        Ajouter au panier
    </button>

    <a href="https://wa.me/2290197592841?text=Bonjour,%20je%20souhaite%20commander%20${encodeURIComponent(nom)}." class="btn-commander">
        Commander
    </a>

</div>
`;

    document.getElementById("code").textContent = code;
}
// Copier le code HTML

function copierCode(){

    const code = document.getElementById("code").textContent;

    if(code.trim()==="" || code==="Le code sera généré ici."){

        alert("Aucun code à copier.");

        return;

    }

    navigator.clipboard.writeText(code)
    .then(function(){

        alert("✅ Le code HTML a été copié.");

    })
    .catch(function(){

        alert("Impossible de copier le code.");

    });

}
