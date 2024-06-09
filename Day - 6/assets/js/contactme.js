function submitData(event) {
    event.preventDefault();

    const inputNama = document.getElementById("inputNama").value.trim();
    const inputEmail = document.getElementById("inputEmail").value.trim();
    const inputAlamat = document.getElementById("inputAlamat").value.trim();
    const inputNomorTelpon = document.getElementById("inputNomorTelpon").value.trim();
    const inputKeterangan = document.getElementById("inputKeterangan").value.trim();
    const inputPesan = document.getElementById("inputPesan").value.trim();

    // Membuat array untuk menyimpan pesan kesalahan
    var errors = [];

    // Memeriksa setiap input dan menambahkan pesan kesalahan ke array
    if (inputNama === "") {
        errors.push("Nama Harus Diisi");
    }
    if (inputEmail === "") {
        errors.push("Email Harus Diisi");
    }
    if (inputAlamat === "") {
        errors.push("Alamat Harus diisi");
    }
    if (inputNomorTelpon === "") {
        errors.push("Nomor Telpon Harus diisi");
    }
    if (inputKeterangan === "") {
        errors.push("Pilih Keterangan");
    }
    if (inputPesan === "") {
        errors.push("Pesan tidak boleh kosong");
    }

    // Menampilkan alert jika ada pesan kesalahan
    if (errors.length > 0) {
        alert("Berikut adalah kesalahan yang perlu diperbaiki:\n\n" + errors.join("\n"));
    } else {}
    //cek console.log di google inspect
    console.log(
        `Nama : ${inputNama}\nEmail : ${inputEmail}\nAlamat : ${inputAlamat}\nNomor Telpon : ${inputNomorTelpon}\nKeterangan : ${inputKeterangan}\nPesan : ${inputPesan}`
    );
    //kirim ke email
    const myemail = "syamsul.ariffin23@gmail.com";

    let a = document.createElement("a");
     a.href = `mailto:${myemail}?subject=${inputKeterangan}&body=Hai saya ${inputNama}, dan Nomor Telpon saya ${inputNomorTelpon} ${inputPesan}`;
     a.click();
}

