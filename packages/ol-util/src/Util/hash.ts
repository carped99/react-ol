interface HashOptions {
  length?: number; // 해시 길이
  algorithm?: 'SHA-256' | 'SHA-384' | 'SHA-512'; // 해시 알고리즘
}

export const createHash = async (data: unknown, options: HashOptions = {}): Promise<string> => {
  const { length = 8, algorithm = 'SHA-256' } = options;

  // 데이터를 문자열로 변환
  const stringData = typeof data === 'string' ? data : JSON.stringify(data);

  // 해시 생성
  const hashBuffer = await crypto.subtle.digest(algorithm, new TextEncoder().encode(stringData));

  // Uint8Array로 변환
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // 짧은 해시를 원하는 경우 처음 8바이트만 사용
  const finalArray = length ? hashArray.slice(0, length) : hashArray;

  // 16진수 문자열로 변환
  return finalArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};
