![header](https://capsule-render.vercel.app/api?type=waving&color=33FFFF&height=200&section=header&text=SmartHome%20InternShip&fontSize=50&fontColor=F0F8FF&fontAlignY=40)
## Tools & Language
<img src="https://img.shields.io/badge/AndroidStudio-77FF33?style=flat&logo=AndroidStudio&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/Java-007396?style=flat&logo=OpenJDK&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/Python-3349FF?style=flat&logo=Python&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/JavaScript-FFF633?style=flat&logo=JavaScript&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/mysql-4479A1?style=flat&logo=mysql&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/RaspberryPi-FF3377?style=flat&logo=RaspberryPi&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/nginx-39FF33?style=flat&logo=nginx&logoColor=FFFFFF"/>

## Description
2021 광운대학교 여름학기 하계장기인턴쉽 in (주)테크포아이

## Process

스마트홈 조작을 위한 스마트폰 앱, 백엔드와 서버 프로토타입 개발
```
1. 안드로이드 스튜디오에서 자바로 스마트폰 앱을 만들어 데이터를 기기(가전제품 등)에 전송
2. 기기에서 AI가 받은 데이터를 통해 계산하고 처리해서 결과값을 스마트폰과 서버에 전송. 이때 AI는 파이썬으로 작성되어서 프로토타입 또한 파이썬으로 구현함
3. 기기와 서버는 Node.js 환경에서 Javscript로 작성함. express.js 프레임워크를 사용. 기기로부터 받은 값은 서버에 mysql 데이터베이스에 저장됨
4. 기기 또한 Node.js환경에서 구동되나 스마트폰으로부터 받은 값을 파이썬 환경에서 계산한다는 특징이 있음. 이는 위에서 서술하였듯이 AI알고리즘이 파이썬으로 구현되었기 때문
5. 라즈베리파이3에서 Nginx로 서버를 구축함. 서버 동작이 단순하고 동시접속 처리에 능하다고하여 Nginx를 사용
```
