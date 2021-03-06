# 🥕 당근마켓 클론코딩 - 1조
선택 이유 : 시가총액 3조원, 최근 1800억 투자를 받는 유니콘 기업의 user-friendly한 기능을 직접 코딩하며 학습해봄.
많은 이용자들의 니즈를 충족시키는 어플의 핵심 기능인 실시간 채팅 기능 구현을 시도.

## 1. 역할 배분(기능 별)
* 강유신 : 유저 관련 기능(회원가입, 로그인)
* 이진희 : 좋아요 관련 기능(좋아요/취소, 서버 배포)
* 최봉규 : 게시글 관련 기능(게시글 작성/조회/수정/삭제)

-----------------------
 ## 2. 초기 목표 및 구현 기능
 ### 초기 목표
 * 무한스크롤
 * 채팅 기능(구매자와 판매자)

### 구현 기능
* 회원가입, 로그인
* 게시글 전체 조회, 작성, 수정, 삭제
* 이미지 다중 업로드

---------------------------------
## 3. 트러블 슈팅
* 한국시간이 다시 발목을 잡음. 로컬 환경에서 올리더라도 DB 기준이라서 결국 프론트에서 볼 때는 GMT가 찍힘. moment를 활용하여 GMT+09시라는 코드로 해결함.
* map함수의 실제 사용이 어려웠음. 새로운 배열로 출력한다는 개념을 API에 적용하는 로직을 생각하는 부분이 어려웠음. 개발자에 가까운 사고를 하는 훈련을 하자!
* socket에 대한 사용이 쉽지 않았음. 클라이언트에서 확인하기 위해서 구글링을 많이 했고 구현에 성공함. 양방향 통신에 대한 개념을 별도 학습함. 
통신의 연결 및 클라이언트에서 메세지가 들어올 때 메세지를 클라이언트로 다시 넘기는 emit를 작성하는 것을 이해함.
