# Film Favorit API

API untuk manajemen Film Favorit dengan autentikasi dan fitur penyimpanan film favorit pengguna.

## Deskripsi

Proyek ini merupakan sebuah RESTful API untuk manajemen daftar film favorit yang memungkinkan pengguna untuk:

- Melihat daftar film
- Melihat detail film
- Menambahkan film ke daftar favorit
- Menghapus film dari daftar favorit
- Admin dapat menambahkan, mengedit, dan menghapus data film

API ini dibangun dengan Node.js, Express.js, dan MySQL sebagai database. Proyek ini juga dilengkapi dengan autentikasi berbasis JWT (JSON Web Token) untuk mengamankan endpoint API tertentu.

## Teknologi yang Digunakan

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Autentikasi
- **Bcrypt** - Enkripsi password
- **Swagger** - Dokumentasi API
- **Cors** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables
- **Express Rate Limit** - Pembatasan request

## Struktur Proyek

```txt
app.js                 # Entry point aplikasi
package.json           # Konfigurasi NPM dan dependencies
swagger.js             # Konfigurasi Swagger untuk dokumentasi API
config/
  db.js                # Konfigurasi koneksi database
controllers/
  authController.js    # Kontroller untuk autentikasi
  favoriteController.js # Kontroller untuk manajemen film favorit
  filmController.js    # Kontroller untuk manajemen film
docs/
  docs.yaml            # Dokumentasi API dengan format Swagger/OpenAPI
middlewares/
  auth.js              # Middleware autentikasi dan otorisasi
  errorHandler.js      # Penanganan error global
models/
  Favorite.js          # Model untuk film favorit
  Film.js              # Model untuk film
  User.js              # Model untuk pengguna
routes/
  authRoutes.js        # Route untuk autentikasi
  favoriteRoutes.js    # Route untuk manajemen film favorit
  filmRoutes.js        # Route untuk manajemen film
utils/
  errorResponse.js     # Utility untuk format response error
```

## Endpoint API

### Autentikasi

- `POST /api/auth/register` - Registrasi pengguna baru
- `POST /api/auth/login` - Login pengguna

### Film

- `GET /api/films` - Mendapatkan semua film
- `GET /api/films/:id` - Mendapatkan film berdasarkan ID
- `POST /api/films` - Menambahkan film baru (admin)
- `PUT /api/films/:id` - Mengubah data film (admin)
- `DELETE /api/films/:id` - Menghapus film (admin)

### Favorit

- `GET /api/favorites` - Mendapatkan semua film favorit pengguna
- `POST /api/favorites/:filmId` - Menambahkan film ke favorit
- `DELETE /api/favorites/:filmId` - Menghapus film dari favorit

## Instalasi dan Penggunaan

### Prasyarat

- Node.js (versi terbaru)
- MySQL

### Langkah Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/username/film-favorit-api.git
   cd film-favorit-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Buat file `.env` di root folder dengan isi:

   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=filmfavorit
   PORT=5000
   JWT_SECRET=rahasia_yang_sangat_aman
   JWT_EXPIRE=30d
   ```

4. Buat database MySQL:

   ```sql
   CREATE DATABASE filmfavorit;
   USE filmfavorit;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nama VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(100) NOT NULL,
     role ENUM('user', 'admin') DEFAULT 'user',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE films (
     id INT AUTO_INCREMENT PRIMARY KEY,
     judul VARCHAR(200) NOT NULL,
     sutradara VARCHAR(100) NOT NULL,
     tahun INT NOT NULL,
     genre JSON NOT NULL,
     rating DECIMAL(3,1) DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE favorites (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     film_id INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
     UNIQUE KEY (user_id, film_id)
   );
   ```

5. Jalankan server:

   ```cmd
   npm run dev
   ```

6. Server akan berjalan di `http://localhost:5000`

## Dokumentasi API

Dokumentasi API tersedia melalui Swagger UI di endpoint `/api-docs` ketika server dijalankan.

## Deployment

API ini telah di-deploy dengan menggunakan layanan Railway, dan dapat diakses melalui URL:
`https://pat-filmfavourite-api-production.up.railway.app/api`

## Keamanan

- Autentikasi menggunakan JWT
- Password di-hash menggunakan bcrypt
- Rate limiting untuk mencegah serangan brute force
- Validasi input
- Penanganan error yang baik

## Lisensi

MIT License

## Kontak

Jika ada pertanyaan atau masukan, silakan hubungi melalui:

- Email: ahmadnoval.muhyiddin@gmail.com
- GitHub: [ahmadNoval](https://github.com/vall-here)
