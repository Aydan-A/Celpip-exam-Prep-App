// CareerAxis full listening mock tests (user-supplied playlist):
// https://www.youtube.com/playlist?list=PLRZwE790uWkCllvrnOoi5J3iUbxftCrda
// Each video is a complete 6-part CELPIP listening mock with questions and
// answers shown in-video. `answers` is the correct-answer key entered by a
// content admin: one letter per question in order, e.g. "BCADA CBBDA ..."
// (spaces/punctuation are ignored, case-insensitive). Until a key is added,
// the test can be watched but not auto-scored.

// Official 6-part structure; question counts follow the real exam (38 total).
export const LISTENING_MOCK_PARTS = [
  { name: 'Part 1 · Problem Solving', count: 8 },
  { name: 'Part 2 · Daily Life Conversation', count: 5 },
  { name: 'Part 3 · Information', count: 6 },
  { name: 'Part 4 · News Item', count: 5 },
  { name: 'Part 5 · Discussion', count: 8 },
  { name: 'Part 6 · Viewpoints', count: 6 },
];

export const MOCK_OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const V = (id, label, youtube, answers = null) => ({ id, label, youtube, answers });

export const VIDEO_MOCKS = [
  // 2025 series
  V('vm-2025-01', 'Mock Test 1 (2025)', '0x-4Lj-n8Ng', 'BBABABBD DCBBA BBBCAC CBDBA BCBACBAB CCBCAB'),
  V('vm-2025-02', 'Mock Test 2 (2025)', 'tzJTklT5kTk', 'BCCBCBBA ABBCB CBDBAB DCCBA DACABDAA CCCBBB'),
  V('vm-2025-03', 'Mock Test 3 (2025)', '9l4Mv6BxxRc', 'BCCBCCDB CBBDA CDBBAD BACBB ACCBBABB ABBCBC'),
  V('vm-2025-04', 'Mock Test 4 (2025)', 'nxft8EqHgCA', 'BCBCBBBD BBCBD BBCBCC CBABD ABAAAAAA BCBABA'),
  V('vm-2025-05', 'Mock Test 5 (2025)', 's4hptkTHl_0', 'ABBDBCBC CBADB DBBCAC BCCCC BBCBCABC BCCAAB'),
  V('vm-2025-06', 'Mock Test 6 (2025)', 'bkH4buF3icQ', 'CBCBBBBC DBCCB BDDBCB CBBAD CBDBBCDB BBCCCA'),
  V('vm-2025-07', 'Mock Test 7 (2025)', 'KsEa7byrynU', 'BCCCABBB DBABB CBCABB CDABA DBCBBCCC DBBACB'),
  V('vm-2025-08', 'Mock Test 8 (2025)', 'kyZGdiKcnug', 'BBCBCAAA CBACB BABDAB BABAB ABBDBABC BACABC'),
  V('vm-2025-10', 'Mock Test 10 (2025)', 'z4DSQQuRNds', 'BBABCBBA BABBA ABAABB CABBC BBBBBCBA BACCBB'),
  V('vm-2025-11', 'Mock Test 11 (2025)', 'UItOXj4MeNI', 'BABBCBCB BDCBA DCBBAA BBDCB BCABCBAA BCBABB'),
  V('vm-2025-12', 'Mock Test 12 (2025)', '1IPVmkRarl4', 'ADABDADA CBCCB CBBBCC ACBBC BCBCCCCB ABDBBC'),
  V('vm-2025-13', 'Mock Test 13 (2025)', 'DFVO-xzwMP4'),
  V('vm-2025-14', 'Mock Test 14 (2025)', 'WM-w_HV6mAk', 'CBABCBAC DCBDC CBACDB BCDBC CBADBDCA BDCBCA'),
  V('vm-2025-15', 'Mock Test 15 (2025)', 'RsolEXenVMs', 'CCBCDBCC CBCBB CBCCBB BBBBC DBCCCBAB BBCCCD'),
  V('vm-2025-16', 'Mock Test 16 (2025)', '_2ns4KB6G_Q', 'BBDCCCCB BCBBB CCDCCC CADBC CCDBAACB CDBCCB'),
  V('vm-2025-17', 'Mock Test 17 (2025)', 'BWAxYlYQWy4', 'CBCBCCCC BCBBB CACCCB CCBDA BCCCBCCB CCCDBC'),
  V('vm-2025-18', 'Mock Test 18 (2025)', 'Uy5Faqkyj4A', 'CBCCCCBC CCACC CCBBCB CBCBC BCBCCDCC ADABCB'),
  V('vm-2025-19', 'Mock Test 19 (2025)', 'tBRM3psTP8w', 'CCCBBCDD CACBC BCCCCC CDBBC BBBCBCCC CBCBBB'),
  V('vm-2025-20', 'Mock Test 20 (2025)', 'BhpFF3_mww8', 'CBBCCBCB DCCCB CBBBBC CCCBC BCBBCBCB BBDBCB'),
  V('vm-2025-21', 'Mock Test 21 (2025)', '--NVG5Ko2tE', 'CBCCBBCD CBDDA CCBCAB CCCBB CCBCCCAC BBCCCB'),
  V('vm-2025-22', 'Mock Test 22 (2025)', 'fdcXztUFB3g', 'ABCCCCCC DCCDC CCBBCC BABCC CCBBCCCB CBBBCC'),
  V('vm-2025-23', 'Mock Test 23 (2025)', 'Nh_TdiSk1tw', 'BACBDBAD CCACD CDCACB CADCC CBCDCCDB CCBBDA'),
  V('vm-2025-24', 'Mock Test 24 (2025)', 'CeUitmbtgy0', 'BAAADCAC BADBC BDABBC BBCCD CDCBCACC DCABCD'),
  V('vm-2025-25', 'Mock Test 25 (2025)', 'uLJcvfjVYbo', 'CBDBCBCB BCBAB CCCBCC DCBCC BBCCBCCC BCBCCB'),
  V('vm-2025-26', 'Mock Test 26 (2025)', 'Y4LrtzrVqFQ', 'CCBBBCDD CADBC BBCBDD DCCBB BCDCBCAB BCDCAB'),
  V('vm-2025-27', 'Mock Test 27 (2025)', 'trOG31jSw7E', 'CBBCCBCB CABBC CCBDCA CBABC BCDABCAA CBDCDB'),
  V('vm-2025-28', 'Mock Test 28 (2025)', '-FKWMutlryY', 'CCBBBCBC BBCCA DCCBCB DCCBC BDBACBCB CAACBD'),
  V('vm-2025-29', 'Mock Test 29 (2025)', 'hytaXBLWgw0', 'ABBBABAB DBBAB BCCBAB BCCBC CBBDCABC DBCCBA'),
  V('vm-2025-30', 'Mock Test 30 (2025)', 'sbXEKpzUh7c', 'DBCBCBCB CBBAD BCCBAC DCDDB BCACBCCD CBCACD'),
  V('vm-2025-31', 'Mock Test 31 (2025)', 'jJlBbzZMfd0', 'ABBBCCCD BCBAD DCBCBC BCBDB BACBDBAC CBDCCD'),
  V('vm-2025-32', 'Mock Test 32 (2025)', 'qg5swF0Sx1o', 'CBBBCBBD BCBCC CBCDBB BABBC CBCABABB CBCCDB'),
  V('vm-2025-33', 'Mock Test 33 (2025)', 'edCG-ayczXY', 'BCCBBCAB CDBCB ABBCAB BCBCD DCBCCBCB CDBCBC'),
  V('vm-2025-34', 'Mock Test 34 (2025)', '5dwaj_yVcsw', 'AAABBCAA DACAB DAACAB DBABC CABADACA DCBAAB'),
  V('vm-2025-35', 'Mock Test 35 (2025)', 'XXshOazCmaM', 'ACDABBAB DBCBA DACABA BABDC BABDABBC BBADCA'),
  V('vm-2025-36', 'Mock Test 36 (2025)', '7vvaakwqgV8', 'CADBADBD DACBA DBACBA BABAD AACBACDA BACBAD'),
  V('vm-2025-37', 'Mock Test 37 (2025)', '4jytkcvTP2s', 'DBABABCB ABBDA DABAAC CBBDA BDBADABB BABDBA'),
  V('vm-2025-38', 'Mock Test 38 (2025)', 'Gam3BgkVfC4', 'BACDBBBA ABAAA BBDDCB BDCCB ADBAACAD ABADBA'),
  V('vm-2025-39', 'Mock Test 39 (2025)', '4VtcpsYZoFQ', 'DBCDBCDA BABDB AABBCD BDBAB CBBDAABB DBBACB'),
  V('vm-2025-40', 'Mock Test 40 (2025)', 'MyB2s6W54M4', 'CBADBCBA BDABB CAABAD BDBCA CAADBCAA BDBBAA'),
  V('vm-2025-42', 'Mock Test 42 (2025)', '63N9YacB5JI', 'CBAAABBD BACDA DACABD BABCD DAACDAAC DACABA'),
  V('vm-2025-43', 'Mock Test 43 (2025)', 'nysWSZep054', 'DBCABDBA CABAD BBADCB ADACB BDCBADAB BACADB'),
  V('vm-2025-44', 'Mock Test 44 (2025)', 'cI1z_XxU2ug', 'BDBBCCCB ABBAA BDAACD CAABB BBCCDABA CAADAD'),
  // 2026 series
  V('vm-2026-07', 'Mock Test 7 (2026)', 'GHKl6hDh2qE', 'BBCCABDC DBCBB DBBABB BCBBC CBCBAABB BCCBCB'),
  V('vm-2026-08', 'Mock Test 8 (2026)', 'rweBrRFT0i8', 'BCBBCABD CBCBC BCBCBB CAABD ABAABACD BBAACA'),
  V('vm-2026-09', 'Mock Test 9 (2026)', 'TAU0_5CZd5k', 'DBBBBACB DBBAA CDBBAB BAABA DABAACAB CAABAD'),
  V('vm-2026-10', 'Mock Test 10 (2026)', '0CqGSgrn-24', 'DBCCBAAB ABACC CABACB BCCCB BCCABCBC BCCBCB'),
  V('vm-2026-11', 'Mock Test 11 (2026)', 'vW6CDbe5a9E', 'CBCCBCCB ABCBB CBABBC BACBB ABBCCCCA BCABCB'),
  V('vm-2026-12', 'Mock Test 12 (2026)', '1PfqSN6mxog', 'CCAAABDA ABCBA ABCCCB BCDBC ABCCACAC CBACBB'),
  V('vm-2026-13', 'Mock Test 13 (2026)', 'nKgOgr2eo-8', 'BBCBBABB BCBBB BCBCBB BBAAC BDCBBCCB CBCCCA'),
  V('vm-2026-14', 'Mock Test 14 (2026)', 'L6-ojhmX16Y', 'BBABBBBB BCDBB BBBCBB ACBBC BCDCBCCB CBCCCA'),
  V('vm-2026-15', 'Mock Test 15 (2026)', 'nAIJ-4w8BHA', 'BADABCCC BCBBB ABCBBB BBCCB BBBCDABB BBBBBB'),
  V('vm-2026-16', 'Mock Test 16 (2026)', 'fymyc063J1U', 'BCBDACBA CADAB BCBBBB BBBBB BBBCCCDB BBACBB'),
  V('vm-2026-17', 'Mock Test 17 (2026)', 'q-Y00ehdXxY', 'BCAACBBB BBCAC BCBBBB BCACB BACACADC BDAABC'),
  V('vm-2026-18', 'Mock Test 18 (2026)', 'v3OymmC_3gc', 'CABBBCBA BCBBB BCCCBB BCBBB ABCDBCCD BDAACB'),
  V('vm-2026-19', 'Mock Test 19 (2026)', '-upQpjr38so', 'BBCCACCC BBBAC BCDCBC CBBBC BCACBCBA BCBCBB'),
  V('vm-2026-20', 'Mock Test 20 (2026)', '43k2oYI6Nq8', 'BCBBDCCA BDCBC BCCCAC CBCAB BCBCDBCA BCCBAB'),
  V('vm-2026-21', 'Mock Test 21 (2026)', 'liv4ebHljKE', 'DBDCCDCD ABCBB BCCABB CBBCB BBCCADBB BCABBA'),
  V('vm-2026-22', 'Mock Test 22 (2026)', 'qt5tQDJGxrQ', 'ACDABBBA CBABD BBCCAB AACDB BCBCDABC BCCDBC'),
  V('vm-2026-23', 'Mock Test 23 (2026)', 'jMgDbzqrCZE', 'ACBCBABC ACBCD CBAABD CBCDB BACBDCCA BCCDAA'),
  V('vm-2026-24', 'Mock Test 24 (2026)', 'XoiCG5jQ4zg', 'CABCCBCC BCBAC BADCBB DABCC ABBDAACB CBDBAA'),
  V('vm-2026-25', 'Mock Test 25 (2026)', 'rbDKIZAZMoU', 'ACDDCAAC DBBAC CBBACB AABCB BBBABBBC ABABBA'),
  V('vm-2026-fp', 'Full Practice Mock (2026, CLB 9+)', 'b6LZgKvFmAA', 'BABDBAAA ABACD BACDCC DBBAB CABBCABD DBBBCD'),
  V('vm-2026-26', 'Full Mock Test 26 (2026)', '2sAMexuAFJc', 'DBACDDCA CADAA CBAADD BAADC DBABABDC CDAABD'),
];

// "BC AD..." → ['B','C','A','D',...]; anything that isn't a letter is ignored.
export function parseAnswerKey(answers) {
  if (!answers) return null;
  const letters = String(answers).toUpperCase().match(/[A-Z]/g);
  return letters && letters.length ? letters : null;
}
