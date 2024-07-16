document.addEventListener('DOMContentLoaded', function () {
    const busForm = document.getElementById('busForm');
    const busTableBody = document.querySelector('#busTable tbody');

    function loadBuses() {
        const buses = JSON.parse(localStorage.getItem('buses')) || [];
        busTableBody.innerHTML = '';
        buses.forEach((bus, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${bus.plat}</td>
                <td>${bus.jumlah_penumpang}</td>
                <td>${bus.jam_operasi}</td>
                <td>${bus.asal} - ${bus.tujuan}</td>
                <td>
                    <a href="#" class="btn btn-success text-decoration-none text-white" data-index="${index}" onclick="editBus(event)">Edit</a>
                    <a href="#" class="btn btn-danger text-decoration-none text-white" data-index="${index}" onclick="deleteBus(event)">Hapus</a>
                </td>
            `;
            busTableBody.appendChild(row);
        });
    }
    
    function saveBuses(buses) {
        localStorage.setItem('buses', JSON.stringify(buses));
    }

    busForm.addEventListener('submit', function (event) {
        const jumlah_penumpang = document.getElementById('jumlah_penumpang').value;
        const plat = document.getElementById('plat').value;
        const jam_operasi = document.getElementById('jam_operasi').value;
        const asal = document.getElementById('asal').value;
        const tujuan = document.getElementById('tujuan').value;

        const buses = JSON.parse(localStorage.getItem('buses')) || [];
        buses.push({ jumlah_penumpang, plat, jam_operasi, asal, tujuan });
        saveBuses(buses);
        loadBuses();

        busForm.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('tambahData'));
        modal.hide();
    });

    window.deleteBus = function (event) {
        const index = event.target.getAttribute('data-index');
        let buses = JSON.parse(localStorage.getItem('buses')) || [];
        buses.splice(index, 1);
        saveBuses(buses);
        loadBuses();
    };

    window.editBus = function (event) {
        const index = event.target.getAttribute('data-index');
        const buses = JSON.parse(localStorage.getItem('buses')) || [];
        const bus = buses[index];
        
        // Mengisi nilai input dengan data bus yang akan diedit
        document.getElementById('jumlah_penumpang').value = bus.jumlah_penumpang;
        document.getElementById('plat').value = bus.plat;
        document.getElementById('jam_operasi').value = bus.jam_operasi;
        document.getElementById('asal').value = bus.asal;
        document.getElementById('tujuan').value = bus.tujuan;
    
        // Mengganti judul modal menjadi "Edit Data Bus"
        document.querySelector('.modal-title').textContent = "Edit Data Bus";
    
        // Mengubah teks tombol "Simpan" modal
        document.querySelector('.modal-footer button[type="submit"]').textContent = "Simpan Perubahan";
    
        // Menambahkan atribut data-modal-type agar sesuai dengan mode edit
        document.getElementById('tambahData').setAttribute('data-modal-type', 'edit');
        document.getElementById('tambahData').setAttribute('data-edit-index', index);
    
        // Menampilkan modal
        const modal = new bootstrap.Modal(document.getElementById('tambahData'));
        modal.show();
    };
    

    loadBuses();
});