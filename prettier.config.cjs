/** @type {import("prettier").Config} */
module.exports = {
    semi: true, // 항상 세미콜론을 붙임
    // 예시:
    // const name = '건우';
  
    singleQuote: true, // 문자열에 홑따옴표 사용
    // 예시:
    // const greeting = '안녕';
  
    printWidth: 100, // 한 줄 최대 길이 (이 이상이면 자동 줄바꿈)
    // 예시 (100자를 초과하면 아래처럼 줄바꿈 됨):
    // const msg = '이 문자열은 100자보다 길기 때문에 prettier에 의해 자동 줄바꿈이 될 수 있습니다.';
  
    tabWidth: 2, // 들여쓰기 간격을 2칸으로 설정
    // 예시:
    // function hello() {
    //   console.log('hi');
    // }
  
    useTabs: false, // 들여쓰기를 스페이스로 설정 (true면 tab 문자 사용)
    // 예시 (false일 때 스페이스 2칸 사용):
    // [스페이스][스페이스]console.log('hi');
  
    trailingComma: 'all', // 객체, 배열 등에서 마지막 요소에도 쉼표를 붙임
    // 예시:
    // const obj = {
    //   name: '건우',
    //   age: 25,
    // };
  
    bracketSpacing: true, // 객체 중괄호 안에 공백을 추가
    // 예시:
    // const obj = { name: '건우' }; // true일 때
    // const obj = {name: '건우'};   // false일 때
  
    arrowParens: 'always', // 화살표 함수의 매개변수 괄호 항상 유지
    // 예시:
    // const greet = (name) => console.log(name); // always
    // const greet = name => console.log(name);   // avoid
  
    jsxSingleQuote: false, // JSX에서 쌍따옴표 사용
    // 예시:
    // <div className="hello">안녕</div> // false일 때
    // <div className='hello'>안녕</div> // true일 때
  
    endOfLine: 'auto', // OS에 따라 줄바꿈 방식 자동 설정 (git에서 충돌 방지)
    // 예시: Windows는 \r\n, Unix/macOS는 \n
  };
  