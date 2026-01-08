# Ghi chú các bước đã làm

## 1. Cài đặt dependencies
npm install @prisma/client
npm install -D prisma
npm install dotenv

## 2. Khởi tạo Prisma
npx prisma init

## 3. Tạo file prisma.config.ts
- Tạo file prisma/prisma.config.ts để cấu hình Prisma
- Load biến môi trường từ .env
- Cấu hình datasource PostgreSQL
- Cấu hình generator Prisma Client

## 4. Cấu hình DATABASE_URL trong .env
DATABASE_URL="postgresql://username:password@127.0.0.1:port/db_nestjs_postgres"

## 5. Tạo schema trong prisma/schema.prisma
- Định nghĩa models (User, Note, etc.)
- Cấu hình generator và datasource

## 6. Chạy migration
npx prisma migrate dev --name init
npx prisma generate

## 7. Tạo PrismaService và PrismaModule
- Tạo src/modules/prisma/prisma.service.ts
- Tạo src/modules/prisma/prisma.module.ts
- Export PrismaService từ PrismaModule

## 8. Sửa lỗi dependency injection
- Lỗi: AppService không thể inject PrismaService
- Nguyên nhân: PrismaService chưa được export từ PrismaModule
- Giải pháp: Thêm exports: [PrismaService] vào PrismaModule

## 9. Import PrismaModule vào AppModule
- Import PrismaModule vào imports array của AppModule
- Bây giờ có thể inject PrismaService vào các service khác

## 10. Chạy ứng dụng
npm run start:dev
