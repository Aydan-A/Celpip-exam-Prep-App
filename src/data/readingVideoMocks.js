// CareerAxis full reading mock tests (YouTube playlists):
// https://www.youtube.com/playlist?list=PLRZwE790uWkCNBHkpwRT4DNGljz5FZNLz
// https://www.youtube.com/playlist?list=PLRZwE790uWkDDUTsgWOwIL7TVygYSE3W8
// Each video is a complete 4-part CELPIP reading mock with questions and
// answers shown in-video. `answers` works exactly like the listening key in
// videoMocks.js (38 letters, spaces ignored). Keys were read from each
// video's closing "Answer Key" slides ("Option 2nd" → B). Until a key is
// added, the test can be taken but not auto-scored.

// Official 4-part structure; question counts follow the real exam (38 total).
export const READING_MOCK_PARTS = [
  { name: 'Part 1 · Correspondence', count: 11 },
  { name: 'Part 2 · Apply a Diagram', count: 8 },
  // Part 3 matches each statement to paragraph A–D, or E if none fits.
  { name: 'Part 3 · Information', count: 9, options: ['A', 'B', 'C', 'D', 'E'] },
  { name: 'Part 4 · Viewpoints', count: 10 },
];

const V = (id, label, youtube, answers = null) => ({ id, label, youtube, answers });

export const READING_VIDEO_MOCKS = [
  V('rm-2026-01', 'Mock Test 1 (2026)', 'K-cNdohsYMs', 'DABACADCADC CBDDCBBA DEABCDABC DAACBBCADB'),
  V('rm-2026-02', 'Mock Test 2 (2026)', '319WniHbdM0', 'BBDCBACABCA CCDDBCAC DABACDEBC CADBACCBCD'),
  V('rm-2026-03', 'Mock Test 3 (2026)', 'ItAh_Ud0Phs', 'BDCBCBBABCD BDABDDBC CBABECADD CCBACBCADC'),
  V('rm-2026-04', 'Mock Test 4 (2026)', 'RIPitsdtNQs', 'CDABCDBCADA BBABCBAB CDBACEDBA CCBCBBDCBA'),
  V('rm-2026-05', 'Mock Test 5 (2026)', '4rHClUNqLz4', 'DACBCABAABD CBBCBBBB BCADEBCDA CADBCBCDCD'),
  V('rm-2026-06', 'Mock Test 6 (2026)', 'Y3TkUXWTNds', 'BAACAABBACD BDABABCB DAABCDEBC BACDADBADB'),
  V('rm-2026-07', 'Mock Test 7 (2026)', '6ZE4ytasZms', 'BAAABABBACA BCADBBBB BDACAEBCD CBDBACBDCC'),
  V('rm-2026-08', 'Mock Test 8 (2026)', 'Vuwfr6Xv3wA', 'ABDBBCBDABA BBDBBCAB BAEBCDBCA BDDACDAACB'),
  V('rm-2026-09', 'Mock Test 9 (2026)', '-VFGrNCzX-s', 'CCBACDACCBB ABCABABB EBDDABCCA CDCBABCCAD'),
  V('rm-2026-10', 'Mock Test 10 (2026)', 'Vy-a7JLV4FU', 'BDCBDDABCAD BCDCBBAB BDAEBCDCA CBAABDCADC'),
  V('rm-2026-11', 'Mock Test 11 (2026)', 'dFzTt6_PvuY', 'CCBCCDCABAB BBCCDBBA CAEABCDBD BABCDDACAD'),
  V('rm-2026-12', 'Mock Test 12 (2026)', '-g-M7rmTR6Q', 'BAACDBBDAAB BBCBCBBB ADBCACEBD CBACCCBBBC'),
  V('rm-2026-13', 'Mock Test 13 (2026)', 'Pa16n2uih18', 'ABABDAABCBC BCBCDBCB ADABEBCDC CBCBDBCADC'),
  V('rm-2026-14', 'Mock Test 14 (2026)', 'I4vaPFCvuuY', 'BDCBABCBABD BCDBBBDC CDEABDEBC BDABCBABDB'),
  V('rm-2026-15', 'Mock Test 15 (2026)', 'GjoXBeEPbxw', 'BBDBCCCBABD CABCCBCA BCCDAABDE DBABBBACBB'),
  V('rm-2026-16', 'Mock Test 16 (2026)', 'vyXxcoRvkBk', 'BDDACBDAABB BBCBBCBC CDADBEBCE CBBDABBDAB'),
  V('rm-2026-17', 'Mock Test 17 (2026)', 'u-J-NY_T4HE', 'BBCAABDBAAB BCBBDBAB CDABDEACB DBABBCBADB'),
  V('rm-2026-18', 'Mock Test 18 (2026)', 'b2V8XDiT_ag', 'BBDBCCABBBA ADABCDBA CDABCABDE BDBCBBBBBC'),
  V('rm-2026-19', 'Mock Test 19 (2026)', 'hCG_5Bo4lY8', 'BCBACBCBABB CABCBACD CDBADEACB DBBDCDBBAB'),
  V('rm-2026-21', 'Mock Test 21 (2026)', 'LP2GlX4gemM', 'BBCBDABABBD BBBABBCB BCADEADBC DBDBABCABC'),
  V('rm-2026-22', 'Mock Test 22 (2026)', '6yK-PmbO4PQ', 'BACBBCBCACA ABCBCABB CDEAEABDE BCBACBACDA'),
  V('rm-2026-23', 'Mock Test 23 (2026)', 'iXTLRMZHS0c', 'BCBABCBABAD BCDBABDA DECEAEBCE BDBBCBACBA'),
  V('rm-2026-24', 'Mock Test 24 (2026)', 'GWdZehgpnwc', 'BBCBBACAABA CBACABBC AEBDCBDEA BADBBBCBAC'),
  V('rm-2026-25', 'Mock Test 25 (2026)', 'qY7J8MjI9Ac', 'BABBBBABCAA BBCBACBD BCADEDCBE BCCBCBBCBC'),
  V('rm-2026-26', 'Mock Test 26 (2026)', '_nnBf554HgM', 'CCABCBDBCAB BBBBACBC BEAECAECE BCBCADBBAC'),
  V('rm-2026-strat', 'Strategies & Mock Test (2026)', 'B_qcze5g4Oc', 'CBBDBABABBD BDACBBCB BCADEABDC ABDBCBBABD'),
  V('rm-2026-fp01', 'Full Practice 1 (2026)', 'BkfF9DOe8a0', 'ABBCBBBACAA BDCBBBAD CBAEEDEBE CCABBBCAAC'),
  V('rm-2026-fp02', 'Full Practice 2 (2026)', 'TegQpW_FQn8', 'ABCBBBBCADA BCDBBCDC BACEDEBDE BACBCBBDCA'),
  V('rm-2026-fp03', 'Full Practice 3 (2026)', 'A2dTgqJfrF4', 'DACACCABCAA BABCBBAB BDCDEAABE CADBBDCBAD'),
  V('rm-2026-fp04', 'Full Practice 4 (2026)', 'UCXgPtd38uM', 'ABBBBBABDAA ABCBBACB ABCDEDACE CBACCABBDA'),
  V('rm-2026-fp05', 'Full Practice 5 (2026)', 'lfcuKAE3ZKM', 'ADBDBCCADAD BADBCBAC CABEDEBCE ADCBCDCAAC'),
  V('rm-2026-fp06', 'Full Practice 6 (2026)', 'xP0abneBs9Q', 'DACADBCABDC BABCBDAD BDBEACEAC CDADADACAC'),
  V('rm-2026-fp07', 'Full Practice 7 (2026)', 'QScB_kwDspw', 'BABDCADACDA BACBCBDA BECEDBDEA DBABCDAADC'),
  V('rm-2026-fp08', 'Full Practice 8 (2026)', 'jXPiHxNFkyw', 'BAAABAACBAC BDAABBCD ECECBDADD ACBDABACDB'),
  V('rm-2026-fp09', 'Full Practice 9 (2026)', 'ADM-oMbHvH8', 'ABAABAABCDB BCBCBBDB ADEBCCEDB CBBAADBACB'),
  V('rm-2026-fp10', 'Full Practice 10 (2026)', 'WZr7SSd96vI', 'DABACDBBCAC BCABDABD CBECEDDBA BADACBACDC'),
  V('rm-2026-fp11', 'Full Practice 11 (2026)', '2WXQhltCLAI', 'DABCBBABCBD CABCBBAB DBECEADBA CABCCADBBC'),
  V('rm-pt-01', 'Practice Test 1', 'Z0Kci-8pQs0', 'CABBAACACCA ABBBCBBB BEDCACBDB CABBDBADAC'),
  V('rm-pt-02', 'Practice Test 2', 'r6MCfXpISI0', 'CABBABBBCAA BABCACBA BECADADBC CBDBADAACD'),
  V('rm-pt-03', 'Practice Test 3', 'At84PyFyqao', 'CABCCBBBABB DBCCAACC DACEBDACB CBCBBBCCAD'),
  V('rm-pt-04', 'Practice Test 4', 'YpZ1gYdWrg0', 'DCBCABDBBCB BBACDBCC BCACEDABD BCBCDADCBC'),
  V('rm-pt-05', 'Practice Test 5', 'EKoDwDhNpkI', 'CDBBCCBCBCB BCCDCCBC DACABDEBC CABCADACBA'),
  V('rm-pt-06', 'Practice Test 6', 'qWAnuU-Csb8', 'BDBCACABCDD CBACACBB ACDADBEBC DBACBBDBCC'),
  V('rm-pt-07', 'Practice Test 7', 'WTR9A_9xgdE', 'BCDBABABACB BCBAABCC AEBCACDBD DCBCACABAD'),
  V('rm-pt-08', 'Practice Test 8', 'b25RSPKIoO4', 'CBDBCBBACBA BDBCCBDC CBECABDAD DBACDDACDA'),
  V('rm-pt-09', 'Practice Test 9', 'CFmIrnY-NPc', 'CACCCBBACAD ABCABCDB DAECACBDB BBCBCDBABD'),
  V('rm-pt-10', 'Practice Test 10', '9A6gRXR0QH8', 'DCDBCBCDABA DBCBCBCB DBACEDCAB BBDCCCBCAD'),
  V('rm-pt-11', 'Practice Test 11', '3PrLqB_zbXE', 'BDCCABDBCDA DCBACBAB CDEDABEBC BCBBCDCBCA'),
  V('rm-pt-12', 'Practice Test 12', '-Y5QTGVQvqc', 'BDCBABBADBA BDABDBAC BCEABCDED BCBBCCCBDC'),
  V('rm-pt-13', 'Practice Test 13', 'jLbVeFfUFMo'),
  V('rm-pt-14', 'Practice Test 14', 'XTcNMv89xjk', 'DCCBBADCABD BCDDCDBC ECABDBCDE BCBCBBCADB'),
  V('rm-pt-15', 'Practice Test 15', 'HeffbxSnVFI', 'BADCABCDBAC CBADBDCC DEABABCDE BBBADCDBDA'),
  V('rm-pt-16', 'Practice Test 16', 'tUP-Ugz_GTk', 'BDACDAADACB BACADABD ECAEBAEDB BBCADBADAC'),
  V('rm-pt-17', 'Practice Test 17', '-4qhZBhdHWI', 'CABBCDCADBC DBBCADDC CDBACBEDA DABDAABDCC'),
  V('rm-2025-14', 'Mock Test 14 (2025)', 'EOGKazhwzdQ', 'CBCADBCBCCA BAAAABBB BCDBCAECD CBCACCACCA'),
];
