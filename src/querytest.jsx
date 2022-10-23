//초기형태의 api 함수  (새 폴더에 api.jsx 로 저장하면됨)
export async function 함수명() {
  const response = await fetch("url");
  const json = await response.json();
  return json;
}

//위 함수를 축약한 형태
export function 함수명2() {
  return fetch("url").then((response) => response.json());
}

function 함수형컴포넌트() {
  //data에는 위 함수에서 반환하는 json 데이터가 들어옴
  const { isLoading, data } = useQuery("고유 키", 함수명);
  return;
}
