new DataTable("#example");

document.querySelectorAll(".delbut").forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    if (confirm("Apakah Anda yakin ingin menghapus data ini?"))
      fetch(`/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          console.log(data); // Pesan dari server
          window.location.reload(); // Perbarui tampilan jika perlu
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          // Tampilkan pesan kesalahan kepada pengguna jika diperlukan
        });
  });
});

// buka formulir
document
  .getElementById("callFormButton")
  .addEventListener("click", function () {
    window.location.href = "/form"; // Ganti '/form' dengan URL formulir yang diinginkan
  });
