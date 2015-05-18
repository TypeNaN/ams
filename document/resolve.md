# AMS :THAI:
###### รับมือกับปัญาที่อาจเกิดขึ้นขณะติดตั้ง


## 1.
js-bson: Failed to load c++ bson extension, using pure JS version
ปัญหา : พบข้อความแจ้งดังข้างต้นภายหลังการอัพเกรด node.js
การแก้ไข :

+ rm -rf node_modules
+ npm cache clean
+ npm install

หรือจบด้วยคำสั่งเดียวตามด้านล่างนี้

+ npm update

หากยังไม่หายให้ทำตามวิธีต่อไปนี้

+ npm remove ตามด้วยชื่อ package ทุกตัวที่ติดตั้งไว้
+ sudo npm cache clean -f
+ npm imstall
