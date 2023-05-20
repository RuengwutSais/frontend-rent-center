# frontend-v2-base

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Jenkins

```
agent docker  ใช้ docker executor มา run stages ทั้งหมดนี้
agent any ใช้ executor ใด ๆ ก็ได้
agent none คือ ไม่ใช้ executor ใด ๆ สำหรับ stages ทั้งหมด (ต้องไปกำหนด executor แยกสำหรับแต่ stage เอง)
```
