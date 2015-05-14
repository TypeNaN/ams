# AMS :THAI:
###### Advertising Management System ระบบบริหารและควบคุมการผลิตป้ายโฆษณาประชาสัมพันธ์


## สารสำคัญ
1. ความต้องการของระบบ
2. ติดตั้ง AMS
3. Run it

### :white_check_mark: 1. ความต้องการของระบบ
1. **node.js** v0.10.25 (หรือสูงกว่า)
2. **npm** v1.3.10 (หรือสูงกว่า)
3. **mongodb-enterprise**

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

##### 1.3 ติดตั้ง **mongodb-enterprise**
```shell
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.com/apt/ubuntu "$(lsb_release -sc)"/mongodb-enterprise/stable multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
sudo apt-get update
sudo apt-get install mongodb-enterprise

```
ฐานข้อมูลถูกเก็บไว้ที่ /var/lib/mongodb
ไฟล์เก็บประวัติถูกเก็บไว้ที่ /var/log/mongodb
ไฟล์ตั้งค่าถูกเก็บไว้ที่ /etc/mongod.conf

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
