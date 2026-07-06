# Todo Manager - Fullstack Application

## Công nghệ sử dụng

**Frontend:**
- React (JavaScript / JSX)
- Vite (Build tool)
- CSS thuần (Biến CSS, Flexbox, UI/UX hiện đại)
- Axios (Gọi API)

**Backend:**
- Java 21 & Spring Boot 3
- Spring Data JPA
- MariaDB / MySQL (Database)
- Maven (Build tool)

---

##  Yêu cầu môi trường (Prerequisites)

Để chạy dự án này trên máy tính của bạn, hãy đảm bảo bạn đã cài đặt:
- **Node.js** (Phiên bản >= 18)
- **Java Development Kit (JDK)** (Phiên bản 21)
- **MariaDB** hoặc **MySQL** Server (Đang chạy ở cổng 3307 hoặc 3306)
- **Maven** (Tuỳ chọn nếu bạn không dùng Maven Wrapper có sẵn)

---

##  Hướng dẫn cài đặt & Chạy dự án

### 1. Cài đặt Backend (Spring Boot)

Backend được đặt trong thư mục `backend/`.

**Bước 1.1:** Cấu hình Cơ sở dữ liệu (Database)
Hãy tạo một Database trống trong MariaDB/MySQL của bạn.
```sql
CREATE DATABASE todo_list;
```

**Bước 1.2:** Cấu hình biến môi trường
Mở thư mục `backend/`, ứng dụng sử dụng các biến môi trường để kết nối Database (được định nghĩa trong `src/main/resources/application.properties`). Bạn có thể thiết lập các biến này trong IDE của bạn, hoặc terminal trước khi chạy:
- `DB_URL`: `jdbc:mariadb://localhost:3307/todo_list?createDatabaseIfNotExist=true` (thay port 3307 bằng 3306 nếu bạn dùng MySQL mặc định).
- `DB_USERNAME`: Tên đăng nhập DB (thường là `root`).
- `DB_PASSWORD`: Mật khẩu DB của bạn.

**Bước 1.3:** Chạy ứng dụng
Mở Terminal, di chuyển vào thư mục `backend/` và chạy lệnh:
```bash
# Đối với Windows
mvnw.cmd spring-boot:run

# Đối với Mac/Linux
./mvnw spring-boot:run
```
*Backend sẽ chạy tại: `http://localhost:8080`*

---

### 2. Cài đặt Frontend (React Vite)

Frontend được đặt trong thư mục `frontend/`.

**Bước 2.1:** Cài đặt thư viện (Dependencies)
Mở một Terminal mới, di chuyển vào thư mục `frontend/` và cài đặt các gói cần thiết:
```bash
cd frontend
npm install
```

**Bước 2.2:** Cấu hình kết nối API
File `.env` đã được tạo ở thư mục gốc của frontend với nội dung:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```
*(Bạn có thể thay đổi đường link này nếu Backend của bạn chạy ở cổng/domain khác).*

**Bước 2.3:** Chạy giao diện
Khởi động development server của Vite:
```bash
npm run dev
```
*Frontend sẽ chạy tại: `http://localhost:5173` (Hoặc theo cổng Vite hiển thị trên màn hình)*

---

##  Chức năng chính
- Thêm mới công việc.
- Đánh dấu hoàn thành / chưa hoàn thành.
- Sửa nội dung công việc trực tiếp (Inline edit).
- Xóa công việc.
- Tìm kiếm theo tên.
- Lọc công việc theo trạng thái (Tất cả, Đang chờ, Đã xong).
- UI/UX thân thiện, phản hồi mượt mà với Shadow & Hover effects.
