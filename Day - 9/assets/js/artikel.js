let dataArtikel = [];

function getFullTime(tanggal) {
  const monthList = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const date = tanggal.getDate();
  const month = tanggal.getMonth();
  const year = tanggal.getFullYear();
  let hours = tanggal.getHours();
  let minutes = tanggal.getMinutes();

  if (hours <= 9) {
    hours = "0" + hours;
  }

  if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${monthList[month]} ${year} ${hours}:${minutes}`;
}

function getDistanceTime(time) {
  const timeNow = new Date().getTime();
  const timePosted = new Date(time).getTime();

  const distance = timeNow - timePosted;

  const distanceSeconds = Math.floor(distance / 1000);
  const distanceMinutes = Math.floor(distance / 1000 / 60);
  const distanceHours = Math.floor(distance / 1000 / 60 / 60);
  const distanceDays = Math.floor(distance / 1000 / 60 / 60 / 24);

  if (distanceDays > 0) {
    return `${distanceDays} Hari yang lalu`;
  } else if (distanceHours > 0) {
    return `${distanceHours} Jam yang lalu`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} Menit yang lalu`;
  } else if (distanceSeconds > 0) {
    return `${distanceSeconds} Detik yang lalu`;
  } else {
    return `Baru saja`;
  }
}

function getCurrentDate() {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('id-ID', options);
}

function submitArtikel(event) {
  event.preventDefault();

  let inputJudul = document.getElementById("inputJudul").value;
  let inputKonten = document.getElementById("inputKonten").value;
  let inputGambar = document.getElementById("inputGambar").files;

  // Mendapatkan nilai checkbox
  let kategoriArray = [];
  document.querySelectorAll('input[name="kategori"]:checked').forEach((checkbox) => {
    kategoriArray.push(checkbox.value);
  });

  var errors = [];

  if (inputJudul === "") {
    errors.push("Judul Belum Diisi");
  }
  if (inputKonten === "") {
    errors.push("Konten Harus dilengkapi");
  }
  if (inputGambar.length === 0) {
    errors.push("Gambar Harus dicantumkan");
  }
  if (kategoriArray.length === 0) {
    errors.push("Pilih minimal satu kategori");
  }

  if (errors.length > 0) {
    alert("Berikut adalah kesalahan yang perlu diperbaiki:\n\n" + errors.join("\n") + "\n===================================\nsegera perbaiki errornya sebelum diupload\nterimakasih");
    return;
  }

  inputGambar = URL.createObjectURL(inputGambar[0]);

  const artikel = {
    Judul: inputJudul,
    Konten: inputKonten,
    Gambar: inputGambar,
    Dipostingpada: new Date(),
    Penulis: "Gunawan Hidayat",
    Kategori: kategoriArray, // Menambahkan kategori ke objek artikel
  };

  dataArtikel.push(artikel);
  console.log("dataArray:", dataArtikel);
  renderArtikel();
}

function renderArtikel() {
  document.getElementById("konten").innerHTML = "";
  for (let index = 0; index < dataArtikel.length; index++) {
    document.getElementById("konten").innerHTML += `
      <div class="list-artikel-items">
        <div class="artikel-gambar">
          <img src="${dataArtikel[index].Gambar}" alt="upload gambar" />
        </div>
        <div class="artikel-konten">
          <div class="btn-group">
            <button class="btn-edit"> Edit Artikel </button>
            <button class="btn-post"> Post Artikel </button>
          </div>
          <h1>
            <a href="Artikel-detail.html" target="_blank">${dataArtikel[index].Judul}</a>
          </h1>
          <div class="detail-artikel">
            ${getFullTime(dataArtikel[index].Dipostingpada)} | ${dataArtikel[index].Penulis}
          </div>
          <p>${dataArtikel[index].Konten}</p>
          <p>${getDistanceTime(dataArtikel[index].Dipostingpada)}</p>
          <p>Kategori: ${dataArtikel[index].Kategori.join(', ')}</p> <!-- Menampilkan kategori -->
        </div>
      </div>
    `;
  }
}

setInterval(function () {
  renderArtikel();
}, 1000);
