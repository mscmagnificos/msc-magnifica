// CAMBIA ESTO
const cloudName = "dvjeu4rvz";
const uploadPreset = "mscmagnificos";

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if(user === "magnifica" && pass === "verano2026"){
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadImages();
  } else {
    alert("Datos incorrectos");
  }
}

function uploadImage() {
  const file = document.getElementById("fileInput").files[0];
  const stop = document.getElementById("stop").value;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "msc-magnifica/" + stop);

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    loadImages();
  });
}

function loadImages() {
  const stop = document.getElementById("stop").value;
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  fetch(`https://res.cloudinary.com/${cloudName}/image/list/msc-magnifica/${stop}.json`)
  .then(res => res.json())
  .then(data => {
    data.resources.forEach(img => {
      const image = document.createElement("img");
      image.src = img.secure_url;
      gallery.appendChild(image);
    });
  })
  .catch(() => {
    gallery.innerHTML = "<p>No hay fotos aún.</p>";
  });
}

document.getElementById("stop").addEventListener("change", loadImages);
