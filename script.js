const saveData = async () => {
  let date = document.getElementById('tanggal').value;
  let name = document.getElementById('nama').value;
  let age = document.getElementById('usia').value;
  let poli = document.getElementById('politek').value;

  // Validasi
  if (name == '' || age == '') {
    alert('Inputan Harus Terisi Semua');
  } else {
    await axios
      .post(`http://localhost:3000/patients`, {
        date: date,
        name: name,
        age: age,
        poli: poli,
      })

      .then((Response) => {
        alert('Data Berhasil Disimpan');
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const editData = async (id, date, nama, usia, poli) => {
  document.getElementById('tanggal').value = date;
  document.getElementById('nama').value = nama;
  document.getElementById('usia').value = usia;
  document.getElementById('politek').value = poli;
  document.getElementById('btn').innerText = 'Update';
  document.getElementById('btn').setAttribute('onclick', `updateData(${id})`);
};

const updateData = async (id) => {
  let date = document.getElementById('tanggal').value;
  let nama = document.getElementById('nama').value;
  let usia = document.getElementById('usia').value;
  let poli = document.getElementById('politek').value;

  let konfirmasi = 'Serius data ' + nama + ' Akan Di Ubah ?';

  if (confirm(konfirmasi)) {
    await axios
      .patch(`http://localhost:3000/patients/${id}`, {
        date: date,
        name: nama,
        age: usia,
        poli: poli,
      })

      .then((Response) => {
        alert('Data Berhasil Diupdate');
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const deleteData = async (id) => {
  let nama = document.getElementById('nama').value;
  let konfirmasi = 'Seriusan Data ' + nama + ' Mau Dihapus ?';
  if (confirm(konfirmasi)) {
    await axios
      .delete(`http://localhost:3000/patients/${id}`)
      .then((Response) => {
        alert('Data Berhasil Dihapus');
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const getPoli = async () => {
  await axios.get(`http://localhost:3000/polies`).then((Response) => {
    let bucket = ``;
    let pilih = Response.data;

    for (let i = 0; i < pilih.length; i++) {
      bucket += `
            <option value="${pilih[i].name}" selected>${pilih[i].name}</option>
        `;
    }

    document.getElementById('politek').innerHTML = bucket;
  });
};

getPoli();

const getData = async () => {
  await axios
    .get(`http://localhost:3000/patients`)
    .then((Response) => {
      let datas = ``;
      let poli = Response.data;

      if (poli.length > 0) {
        for (let i = 0; i < poli.length; i++) {
          datas += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${poli[i].date}</td>
                        <td>${poli[i].name}</td>
                        <td>${poli[i].age}</td>
                        <td>${poli[i].poli}</td>
                  
                        <td>
                            <button onclick="editData('${poli[i].id}', '${poli[i].date}',
                            '${poli[i].name}', '${poli[i].age}', '${poli[i].poli}')" style="Background-color: #fca311; border: none;
                             color: #fff; padding: 8px; cursor: pointer; font-weight: 600; border-radius: 5px">
                              EDIT
                            </button>
                            <button onclick="deleteData(${poli[i].id})" style="Background-color: red; border: none; color: #fff; 
                            padding: 8px; font-weight: 600; border-radius: 5px">DELETE</button>
                        </td>
                    </tr>
                   
                `;
        }
      } else {
        datas += `
            <tr>
                <td colspan="6" style="text-align: center; color: red">Data Tidak Ada</td>
            </tr>
        `;
      }
      document.getElementById('result').innerHTML = datas;
    })

    .catch((error) => {
      let datas = `
            <tr>
                <td colspan="6" style="text-align: center; color: red">${error.message}</td>
            </tr>
     `;
      document.getElementById('result').innerHTML = datas;
    });
};

getData();
