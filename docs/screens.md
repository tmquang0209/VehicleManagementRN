# System Screens Structure

This document outlines all the current screens (pages) available in the project, structured based on Expo Router's file-based routing mechanism inside the `app/` directory.

## 1. Authentication Flow `(auth)`

These screens handle user sign-in and account recovery.

- **`app/(auth)/login.tsx`**
  - **Mục đích:** Màn hình đăng nhập chính của ứng dụng.
  - **Thành phần:** Form nhập số điện thoại và mật khẩu (PIN 6 số), kèm theo các liên kết chuyển hướng sang đăng ký hoặc quên mật khẩu. Sử dụng Zod và React Hook Form để parse dữ liệu.
- **`app/(auth)/signup.tsx`**
  - **Mục đích:** Màn hình đăng ký tài khoản mới cho người dùng.
- **`app/(auth)/forgot-password.tsx`**
  - **Mục đích:** Màn hình cung cấp luồng khôi phục mật khẩu.

## 2. Main Navigation Tabs `(tabs)`

The primary bottom tab navigation screens. Được định nghĩa cấu trúc trong `app/(tabs)/_layout.tsx`.

- **`app/(tabs)/index.tsx` (Trang chủ)**
  - **Mục đích:** Dashboard tổng quan của ứng dụng.
  - **Thành phần:** Hiển thị thống kê tổng số nhà trọ hiện tại, số lượng phòng (trống/đã thuê), tổng số xe. Cung cấp các thao tác nhanh (Thêm xe, Quét mã, Quản lý phòng) và hiển thị danh sách hoạt động xe ra vào gần đây, cũng như xe khách trong ngày.
- **`app/(tabs)/room-list.tsx` (Phòng)**
  - **Mục đích:** Tab liệt kê danh sách các phòng để truy cập nhanh.
- **`app/(tabs)/scan_tab.tsx` (Quét mã)**
  - **Mục đích:** Một tab đặc biệt (Nút nổi ở giữa) đóng vai trò là trigger để mở màn hình phụ (camera scan) thay vì điều hướng đến một tab cố định.
- **`app/(tabs)/notifications.tsx` (Thông báo)**
  - **Mục đích:** Màn hình hiển thị danh sách các thông báo hệ thống hoặc tin nhắn đến người dùng.
- **`app/(tabs)/profile.tsx` (Tài khoản)**
  - **Mục đích:** Quản lý thông tin cá nhân của người dùng, cài đặt ứng dụng (như đổi theme Sáng/Tối) và đăng xuất.

## 3. House & Room Management `(house)`

Chuyên quản lý cấu trúc nhà trọ và phòng.

- **`app/(house)/house-form.tsx`**
  - **Mục đích:** Form tạo mới hoặc chỉnh sửa thông tin của một khu nhà trọ.
- **`app/(house)/(room)/room-list.tsx`**
  - **Mục đích:** Màn hình danh sách phòng chi tiết của một nhà trọ cụ thể. Có tính năng tìm kiếm và bộ lọc (tất cả, phòng trống).
- **`app/(house)/(room)/room-details.tsx`**
  - **Mục đích:** Hiển thị và quản lý thông tin chi tiết một phòng (người đại diện, trạng thái, hợp đồng...).
- **`app/(house)/(room)/room-form.tsx`**
  - **Mục đích:** Form thêm mới hoặc cập nhật một phòng vào hệ thống.

## 4. Vehicle Management `(vehicle)` & `/vehicles`

Quản lý phương tiện ra vào và đăng ký xe.

- **`app/vehicles/index.tsx` (Quản lý xe toàn cục)**
  - **Mục đích:** Màn hình quy mô lớn hiển thị và quản lý toàn bộ phương tiện.
  - **Thành phần:** Có tính năng tìm kiếm mạnh mẽ bằng biển số, lọc theo phân loại (Tất cả, Xe cư dân, Xe khách) và giao diện thẻ card chi tiết hơn hiển thị ảnh, thông tin check-in.
- **`app/vehicles/[id].tsx`**
  - **Mục đích:** Màn hình chi tiết của một chiếc xe cụ thể khi bấm vào từ danh sách.
- **`app/(house)/(vehicle)/vehicle-list.tsx`**
  - **Mục đích:** Danh sách phương tiện nhưng giới hạn trong ngữ cảnh của một nhà trọ cụ thể.
- **`app/(house)/(vehicle)/add-vehicle.tsx`**
  - **Mục đích:** Form đăng ký thông tin cho một phương tiện mới (biển số, ảnh xe, thuộc phòng nào).
- **`app/(house)/(vehicle)/scan.tsx`**
  - **Mục đích:** Màn hình kích hoạt Camera, tích hợp OCR để quét và nhận diện biển số xe tự động.
