# StudyManager

Ứng dụng React Native giúp sinh viên theo dõi môn học, thời khóa biểu, bài tập và kết quả học tập. Giao diện và dữ liệu mẫu hiện được trình bày bằng tiếng Việt.

## Chức năng

- Tổng quan hồ sơ sinh viên, tiến độ học kỳ, môn đang học và bài tập sắp đến hạn.
- Danh sách môn học có tìm kiếm theo tên/mã môn và màn hình chi tiết.
- Thời khóa biểu theo ngày, có thông tin chi tiết từng buổi học.
- Danh sách bài tập có lọc trạng thái, cập nhật hoàn thành và màn hình chi tiết.
- Hồ sơ sinh viên có thể chỉnh sửa họ tên, email, số điện thoại; kết quả học tập có trang chi tiết.
- Bottom Tab Navigation với năm mục chính và Native Stack Navigation cho các trang chi tiết.
- Trạng thái bài tập và thông tin cá nhân được lưu bằng AsyncStorage trên thiết bị.

## Chạy ứng dụng

```sh
npm install
npm start
```

Mở terminal khác để chạy nền tảng tương ứng:

```sh
npm run android
npm run ios
```

## Kiểm tra

```sh
npx tsc --noEmit
npm test -- --runInBand
npm run lint
```

## Cấu trúc chính

- `App.tsx`: điều hướng tab và stack.
- `src/data.ts`: dữ liệu mẫu dùng chung.
- `src/StudyContext.tsx`: trạng thái ứng dụng và đồng bộ AsyncStorage.
- `src/screens.tsx`: các màn hình chính và chi tiết.
- `src/ui.tsx`: bảng màu, thành phần giao diện và style dùng chung.
