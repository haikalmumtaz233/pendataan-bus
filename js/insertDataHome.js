document.addEventListener('DOMContentLoaded', function () {
    const busFormHome = document.getElementById('busFormHome');

    busFormHome.addEventListener('submit', function (event) {
        event.preventDefault();
        const jumlah_penumpang = document.getElementById('no_unit_home').value;
        const plat = document.getElementById('plat_home').value;
        const jam_operasi = document.getElementById('jenis_kelamin_home').value;
        const asal = document.getElementById('asal_home').value;
        const tujuan = document.getElementById('tujuan_home').value;

        // Retrieve existing data from local storage
        let buses = JSON.parse(localStorage.getItem('buses')) || [];

        // Create a new bus object
        const newBus = {
            jumlah_penumpang: jumlah_penumpang,
            plat: plat,
            jam_operasi: jam_operasi,
            asal: asal,
            tujuan: tujuan
        };

        // Append the new bus object to the existing data array
        buses.push(newBus);

        // Save the updated array back to local storage
        localStorage.setItem('buses', JSON.stringify(buses));

        // Redirect to data.html after form submission
        window.location.href = "data.html";
    });
});