# AMS :THAI:
###### Advertising Management System ระบบบริหารและควบคุมการผลิตป้ายโฆษณาประชาสัมพันธ์


## สารสำคัญ
1. ความต้องการของระบบ
2. ติดตั้ง AMS
3. Run it

### :white_check_mark: 1. ความต้องการของระบบ
1. **node.js** v0.10.25 (หรือสูงกว่า)
2. **npm** v1.3.10 (หรือสูงกว่า)

##### 1.1 ติดตั้ง **node.js**
```shell
sudo apt-get install nodejs
sudo ls -n /usr/bin/nodejs /usr/bin/node
node -v
```
node version 0.10.25

##### 1.2 ติดตั้ง **npm**
```shell
sudo apt-get install npm
npm -v
```
npm version 1.3.10

### :white_check_mark: 2 ติดตั้ง AMS
##### 2.1 โคลน Source
```shell
git clone git://github.com/Yanatecho/ams.git
```
##### 2.2 ติดตั้ง Node Modules สำหรับ AMS
- **express** ^4.12.0
- **multer** ^0.1.8

```shell
npm install
```
### :white_check_mark: 3. เรียก AMS ให้ทำงาน
ขณะที่อยู่ภายใน directory [/path/ams/] ใช้คำสั่งดังนี้
```shell
node index.js
หรือ
npm start
```
