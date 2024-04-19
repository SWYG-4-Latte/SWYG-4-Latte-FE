## Getting Started
```bash
npm run dev 
# or
yarn dev
```

## Installed Library & Command
```bash
Eslint              # NEXT 설치 시 기본 설정
Prettier            # npm install -D prettier eslint-plugin-prettier eslint-config-prettier
Tailwindcss         # NEXT 설치 시 기본 설정
Daisyui             # npm i -D daisyui@latest
Axios               # npm i axios


```

## Projects Folder Explanation
```bash
Root
├──public            # 폰트 or 이미지와 같은 리소스 파일을 저장하는 폴더 
  ├── fonts          # 폰트
  ├── images         # 이미지
  └── svgs           # svgs
├──src               # 소스코드를 저장하는 폴더
  ├── app            # 앱의 라우팅 관련 파일만 정의
  ├── components     # 여러 페이지에서 공통으로 사용할 수 있는 컴포넌트를 정의
  ├── constants      # 여러 페이지에서 공통으로 사용할 수 있는 상수를 정의
  ├── containers     # app-page.tsx 안에서 보여줄 컨텐츠들을 정의하고 app에서 import해서 사용
  ├── hooks          # 여러 페이지에서 공통우로 사용할 수 있는 훅을 정의
  ├── libs           # 외부 라이브러리 정의
  ├── store          # Zustand Store 정의
  ├── styles         # 스타일 시트 정의
  ├── types          # 여러 페이지에서 공통으로 사용할 수 있는 타입을 정의
  └── utils          # 여러 페이지에서 공통으로 사용할 수 있는 유틸리티 함수를 정의
└── readme.md
└── .env.local
└── .env
```

## Commit Convention
```bash
- chore: 빌드 스크립트, 패키지 매니저 설정 등의 변경
- docs: 문서 변경
- style: 코드 포맷팅, 스타일링 등 스타일 변경
- feat: 새로운 기능 추가
- fix: 버그 수정
- !HOTFIX: 치명적인 버그수정
- etc: 그 외 기타 변경사항
- refactor: 코드 리팩토링
```
