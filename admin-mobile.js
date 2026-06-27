// ===============================
// LE PRESTIGE - ADMIN MOBILE
// ===============================

// ---------- MOT DE PASSE ----------
const MOT_DE_PASSE = "Prestige@2026";

const saisie = prompt("🔐 Entrez le mot de passe administrateur");

if (saisie !== MOT_DE_PASSE) {
    alert("❌ Mot de passe incorrect !");
    window.location.href = "index.html";
}

// ---------- APERÇU PHOTO ----------
function apercuPhoto(event){

    const image = document.getElementById("imagePreview");

    image.src = URL.createObjectURL(event.target.files[0]);

    image.style.display = "block";

}

// ---------- GÉNÉRER LE CODE ----------
function genererCode(){

    const photo = document.getElementById("photo").files[0];
    const nom = document.getElementById("nom").value;
    const prix = document.getElementById("prix").value;
    const stock = document.getElementById("stock").value;
    const categorie = document.getElementById("categorie").value;
    const description = document.getElementById("description").value;

    if(
        !photo ||
        nom==="" ||
        prix==="" ||
        stock==="" ||
        description===""){

        alert("Veuillez remplir tous les champs.");

        return;

    }

    const image = photo.name;

    // Aperçu

    document.getElementById("apercu").innerHTML=`

<div class="carte">

<img src="${image}" style="width:100%;border-radius:10px;">

<h3>${nom}</h3>

<p>${description}</p>

<p><strong>${Number(prix).toLocaleString()} FCFA</strong></p>

<p>📦 Stock : ${stock}</p>

</div>

`;

    // Code HTML

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

// ---------- COPIER LE CODE ----------

function copierCode(){

    const code=document.getElementById("code").textContent;

    navigator.clipboard.writeText(code);

    alert("✅ Code HTML copié.");

}
