// export const urlDecode = (input: string): string => {
//   // # 기호의 위치를 찾습니다.
//   const hashIndex = input.indexOf('#');

//   // # 기호가 있는 경우와 없는 경우를 처리합니다.
//   if (hashIndex !== -1) {
//     // # 기호 이전의 부분과 이후의 부분을 분리합니다.
//     const base = input.substring(0, hashIndex);
//     const hash = input.substring(hashIndex); // # 포함
//     return decodeURIComponent(base) + hash; // 디코딩된 부분과 해시를 합칩니다.
//   } else {
//     // # 기호가 없는 경우 그냥 디코딩합니다.
//     return decodeURIComponent(input);
//   }
// };

export const urlDecode = (input: string): string => {
  return decodeURIComponent(input);
};
