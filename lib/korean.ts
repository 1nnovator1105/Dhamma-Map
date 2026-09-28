const hangulSyllableStart = 0xac00;
const hangulSyllableEnd = 0xd7a3;
const finalConsonantCount = 28;

/**
 * 단어의 마지막 글자에 받침이 있는지 판별한다.
 * 한글 음절이 아니면(영문·숫자 등) 받침이 없는 것으로 본다.
 */
export function hasFinalConsonant(word: string): boolean {
  const lastCharacterCode = word.trim().charCodeAt(word.trim().length - 1);
  if (lastCharacterCode < hangulSyllableStart || lastCharacterCode > hangulSyllableEnd) {
    return false;
  }
  return (lastCharacterCode - hangulSyllableStart) % finalConsonantCount !== 0;
}

/** 받침 유무에 맞는 조사를 고른다. 예: selectParticle("무상", "을", "를") → "을" */
export function selectParticle(
  word: string,
  particleAfterConsonant: string,
  particleAfterVowel: string,
): string {
  return hasFinalConsonant(word) ? particleAfterConsonant : particleAfterVowel;
}

/** 받침 유무에 맞는 조사를 붙인다. 예: attachParticle("무상", "이란", "란") → "무상이란" */
export function attachParticle(
  word: string,
  particleAfterConsonant: string,
  particleAfterVowel: string,
): string {
  return word + selectParticle(word, particleAfterConsonant, particleAfterVowel);
}
