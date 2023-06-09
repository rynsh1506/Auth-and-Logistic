# Backend App dengan Node.js

## Instalasi

1. Clone repositori ini ke mesin Anda.
2. Buka terminal dan arahkan ke direktori repositori.
3. Jalankan perintah `npm/yarn install` untuk menginstal semua dependensi.
4. Setelah instalasi selesai, jalankan perintah `npm/yarn dev` untuk menjalankan aplikasi.
5. Aplikasi akan berjalan di `http://localhost:8000`.
6. Tidak usah setup database jika aplikasi berjalan dengan lancar,


## Endpoint

### Auth

1. **POST /api/auth/register**

    - Menerima parameter `msisdn`, `name`, `username`, dan `password`.
    - Menyimpan data yang diberikan ke database jika `username` dan `msisdn` belum ada.
    - Menyimpan password yang dienkripsi ke database.
    - Mengembalikan respons dengan status 200 dan pesan "User registered successfully" jika berhasil.
    - Mengembalikan respons dengan status 400 dan pesan "Username or msisdn already exists" jika `username` atau `msisdn` sudah ada.

2. **POST /api/auth/login**

    - Menerima parameter `msisdn` dan `password`.
    - Memeriksa apakah `msisdn` ada dalam database.
    - Memeriksa kecocokan password.
    - Menghasilkan JWT dengan isi private claim `id` dari database.
    - Mengembalikan respons dengan status 200 dan token JWT jika berhasil.

### Logistic

1. **GET /api/logistic/rates**

    - Memeriksa apakah pengguna terotentikasi (JWT valid).
    - Mengambil data tarif kurir dari database.
    - Mengembalikan respons dengan status 200 dan data tarif jika berhasil.
    - Mengembalikan respons dengan status 401 dan pesan "Token missing" jika token tidak ada

2. **GET /api/logistic/data**

    - Menerima parameter `origin_name` dan `destination_name`.
    - Mengembalikan data asal dan tujuan dari database sesuai parameter yang diberikan.
    - Mengembalikan respons dengan status 200 dan data logistik jika berhasil.
    - Mengembalikan respons dengan status 404 dan pesan "Logistic data not found" jika data tidak ditemukan.
    - Mengembalikan respons dengan status 401 dan pesan "Token mising" jika token tidak ada

3. **POST /api/logistic/add**
    - Menerima parameter `logistic_name`, `amount`, `destination_name`, `origin_name` dan `duration`
    - Menambahkan data logistic dengan parameter yang sesuai
    - Mengembalikan respons dengan status 200 dan pesan "Logistic data added successfully" jika logistic berhasil di tambahkan
    - Mengembalikan respons dengan status 400 dan pesan "Bad request" jika data yang dimasukan tidak sesuai
    - Mengembalikan respons dengan status 401 dan pesan "Token missing" jika token tidak ada
