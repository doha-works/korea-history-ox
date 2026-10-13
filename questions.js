// 시대당 12~14문제 · 총 129문제
// level: basic(기본 4~6급) | advanced(심화 1~3급)
// confusionType(분야): person | achievement | order | institution
// answer: true = O, false = X
const QUESTIONS = [
  // ---------- 선사 시대 ----------
  {
    id: "prehistoric-001",
    era: "prehistoric",
    level: "basic",
    confusionType: "achievement",
    statement: "빗살무늬 토기는 청동기 시대의 대표적인 토기이다.",
    answer: false,
    explanation: "빗살무늬 토기는 신석기 시대의 대표 토기이다. 청동기 시대에는 민무늬 토기를 주로 사용했다.",
    compare: {
      title: "신석기 vs 청동기",
      rows: [
        ["신석기", "빗살무늬 토기, 간석기, 농경 시작, 움집"],
        ["청동기", "민무늬 토기, 비파형 동검, 고인돌, 계급 발생"]
      ]
    }
  },
  {
    id: "prehistoric-002",
    era: "prehistoric",
    level: "basic",
    confusionType: "achievement",
    statement: "구석기 시대 사람들은 주먹도끼, 찍개 같은 뗀석기를 사용하였다.",
    answer: true,
    explanation: "구석기 시대에는 돌을 깨뜨려 만든 뗀석기를 사용했다. 간석기는 신석기 시대부터 사용되었다."
  },
  {
    id: "prehistoric-003",
    era: "prehistoric",
    level: "basic",
    confusionType: "order",
    statement: "구석기 시대에 농경이 시작되어 정착 생활을 하게 되었다.",
    answer: false,
    explanation: "구석기 시대에는 사냥과 채집을 하며 이동 생활을 했다. 농경과 정착 생활은 신석기 시대에 시작되었다.",
    compare: {
      title: "구석기 vs 신석기",
      rows: [
        ["구석기", "뗀석기, 사냥·채집, 이동 생활, 동굴·막집"],
        ["신석기", "간석기, 농경 시작, 정착 생활, 움집"]
      ]
    }
  },
  {
    id: "prehistoric-004",
    era: "prehistoric",
    level: "advanced",
    confusionType: "institution",
    statement: "연천 전곡리 유적에서는 아슐리안형 주먹도끼가 발견되었다.",
    answer: true,
    explanation: "연천 전곡리에서 아슐리안형 주먹도끼가 발견되어, 동아시아에 주먹도끼 문화가 없다는 모비우스 학설을 반박하는 근거가 되었다."
  },
  {
    id: "prehistoric-005",
    era: "prehistoric",
    level: "basic",
    confusionType: "institution",
    statement: "고인돌은 신석기 시대의 대표적인 무덤이다.",
    answer: false,
    explanation: "고인돌은 청동기 시대 지배층의 무덤이다. 거대한 돌을 옮길 만큼 많은 사람을 동원할 수 있는 권력이 있었음을 보여준다."
  },
  {
    id: "prehistoric-006",
    era: "prehistoric",
    level: "basic",
    confusionType: "achievement",
    statement: "신석기 시대에는 가락바퀴와 뼈바늘로 옷이나 그물을 만들었다.",
    answer: true,
    explanation: "가락바퀴로 실을 뽑고 뼈바늘로 바느질을 하는 원시적인 수공업이 신석기 시대에 이루어졌다."
  },
  {
    id: "prehistoric-007",
    era: "prehistoric",
    level: "basic",
    confusionType: "achievement",
    statement: "반달 돌칼은 구석기 시대에 사냥 도구로 사용되었다.",
    answer: false,
    explanation: "반달 돌칼은 청동기 시대에 곡식의 이삭을 자르는 데 사용한 농기구이다.",
    compare: {
      title: "시대별 대표 도구",
      rows: [
        ["구석기", "주먹도끼, 찍개, 슴베찌르개"],
        ["신석기", "갈돌과 갈판, 가락바퀴, 뼈바늘"],
        ["청동기", "반달 돌칼, 비파형 동검, 거친무늬 거울"]
      ]
    }
  },
  {
    id: "prehistoric-008",
    era: "prehistoric",
    level: "advanced",
    confusionType: "institution",
    statement: "서울 암사동 유적은 대표적인 구석기 시대 유적이다.",
    answer: false,
    explanation: "서울 암사동은 움집 터와 빗살무늬 토기가 발견된 신석기 시대 유적이다.",
    compare: {
      title: "대표 유적",
      rows: [
        ["구석기", "연천 전곡리, 공주 석장리, 단양 금굴"],
        ["신석기", "서울 암사동, 양양 오산리, 부산 동삼동"]
      ]
    }
  },
  {
    id: "prehistoric-009",
    era: "prehistoric",
    level: "advanced",
    confusionType: "achievement",
    statement: "철기 시대 유적에서 명도전, 반량전 같은 중국 화폐가 출토되었다.",
    answer: true,
    explanation: "명도전, 반량전, 오수전 등 중국 화폐가 출토되어 철기 시대에 중국과 활발히 교류했음을 알 수 있다."
  },
  {
    id: "prehistoric-010",
    era: "prehistoric",
    level: "advanced",
    confusionType: "institution",
    statement: "창원 다호리 유적에서 출토된 붓은 이 시기에 한자를 사용했음을 보여준다.",
    answer: true,
    explanation: "철기 시대 유적인 창원 다호리에서 붓이 출토되어 한자를 사용했음을 알 수 있다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "prehistoric-011",
    era: "prehistoric",
    level: "basic",
    confusionType: "institution",
    statement: "부여 송국리 유적은 청동기 시대의 대표적인 마을 유적이다.",
    answer: true,
    explanation: "부여 송국리에서는 청동기 시대의 집터, 송국리형 토기, 비파형 동검 등이 발견되었다.",
    compare: {
      title: "시대별 대표 유적",
      rows: [
        ["구석기", "연천 전곡리, 공주 석장리"],
        ["신석기", "서울 암사동, 부산 동삼동"],
        ["청동기", "부여 송국리, 여주 흔암리"]
      ]
    }
  },
  {
    id: "prehistoric-012",
    era: "prehistoric",
    level: "advanced",
    confusionType: "achievement",
    statement: "세형 동검과 잔무늬 거울은 청동기 시대 초기에 처음 만들어졌다.",
    answer: false,
    explanation: "세형 동검과 잔무늬 거울은 철기 시대에 만들어졌다. 청동기 시대에는 비파형 동검과 거친무늬 거울을 사용했다. 거푸집이 출토되어 우리 땅에서 직접 청동기를 만들었음을 알 수 있다.",
    compare: {
      title: "청동기 vs 철기",
      rows: [
        ["청동기", "비파형 동검, 거친무늬 거울, 민무늬 토기"],
        ["철기", "세형 동검, 잔무늬 거울, 거푸집, 명도전"]
      ]
    }
  },

  // ---------- 고조선과 여러 나라 ----------
  {
    id: "gojoseon-001",
    era: "gojoseon",
    level: "basic",
    confusionType: "institution",
    statement: "고조선의 범금 8조 중 현재 전해지는 것은 3개 조목이다.",
    answer: true,
    explanation: "『한서』 지리지에 살인, 상해, 절도에 관한 3개 조목이 전해진다. 이를 통해 생명·노동력·사유 재산을 중시한 사회였음을 알 수 있다."
  },
  {
    id: "gojoseon-002",
    era: "gojoseon",
    level: "basic",
    confusionType: "person",
    statement: "위만은 준왕을 몰아내고 고조선의 왕이 되었다.",
    answer: true,
    explanation: "위만은 준왕을 몰아내고 왕이 되었다(기원전 194). 위만 조선 때 철기 문화가 본격적으로 수용되었다."
  },
  {
    id: "gojoseon-003",
    era: "gojoseon",
    level: "basic",
    confusionType: "order",
    statement: "고조선은 고구려 광개토대왕의 공격으로 멸망하였다.",
    answer: false,
    explanation: "고조선은 한 무제의 공격을 받아 왕검성이 함락되며 멸망했다(기원전 108). 광개토대왕보다 수백 년 앞선 일이다."
  },
  {
    id: "gojoseon-004",
    era: "gojoseon",
    level: "basic",
    confusionType: "institution",
    statement: "부여에는 영고라는 제천 행사가 있었다.",
    answer: true,
    explanation: "부여는 12월에 영고라는 제천 행사를 열었다.",
    compare: {
      title: "여러 나라의 제천 행사",
      rows: [
        ["부여", "영고 (12월)"],
        ["고구려", "동맹 (10월)"],
        ["동예", "무천 (10월)"],
        ["삼한", "수릿날 (5월), 계절제 (10월)"]
      ]
    }
  },
  {
    id: "gojoseon-005",
    era: "gojoseon",
    level: "advanced",
    confusionType: "institution",
    statement: "동예의 제천 행사는 동맹이다.",
    answer: false,
    explanation: "동예의 제천 행사는 무천이다. 동맹은 고구려의 제천 행사이다.",
    compare: {
      title: "동맹 vs 무천",
      rows: [
        ["고구려", "동맹 (10월)"],
        ["동예", "무천 (10월)"]
      ]
    }
  },
  {
    id: "gojoseon-006",
    era: "gojoseon",
    level: "basic",
    confusionType: "institution",
    statement: "민며느리제는 고구려의 혼인 풍습이다.",
    answer: false,
    explanation: "민며느리제는 옥저의 혼인 풍습이다. 고구려에는 서옥제(데릴사위제)가 있었다.",
    compare: {
      title: "혼인 풍습",
      rows: [
        ["고구려", "서옥제 (데릴사위제)"],
        ["옥저", "민며느리제"]
      ]
    }
  },
  {
    id: "gojoseon-007",
    era: "gojoseon",
    level: "advanced",
    confusionType: "institution",
    statement: "동예에는 다른 부족의 영역을 침범하면 노비나 소, 말로 갚게 하는 책화가 있었다.",
    answer: true,
    explanation: "책화는 동예의 풍습으로, 각 부족의 영역을 중시했음을 보여준다."
  },
  {
    id: "gojoseon-008",
    era: "gojoseon",
    level: "basic",
    confusionType: "institution",
    statement: "삼한에서는 제사장인 천군이 신성 지역인 소도를 다스렸다.",
    answer: true,
    explanation: "삼한은 정치적 지배자와 제사장(천군)이 분리된 제정 분리 사회였다. 소도에는 정치적 지배자의 힘이 미치지 못했다."
  },
  {
    id: "gojoseon-009",
    era: "gojoseon",
    level: "advanced",
    confusionType: "institution",
    statement: "고구려에서는 마가, 우가, 저가, 구가가 각자 사출도를 다스렸다.",
    answer: false,
    explanation: "사출도는 부여의 제도이다. 고구려에는 대가들이 모여 나라의 중대사를 결정하는 제가 회의가 있었다.",
    compare: {
      title: "부여 vs 고구려",
      rows: [
        ["부여", "사출도, 영고, 1책 12법"],
        ["고구려", "제가 회의, 동맹, 서옥제"]
      ]
    }
  },
  {
    id: "gojoseon-010",
    era: "gojoseon",
    level: "advanced",
    confusionType: "achievement",
    statement: "단군왕검 이야기는 『삼국사기』에 처음 기록되었다.",
    answer: false,
    explanation: "현존하는 기록 중 단군 이야기가 처음 실린 책은 일연의 『삼국유사』이다. 『삼국사기』에는 단군 이야기가 없다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "gojoseon-011",
    era: "gojoseon",
    level: "basic",
    confusionType: "institution",
    statement: "변한은 철을 많이 생산하여 낙랑과 왜에 수출하였다.",
    answer: true,
    explanation: "변한은 철이 풍부해 낙랑과 왜에 수출했고, 철을 화폐처럼 사용하기도 했다.",
    compare: {
      title: "삼한",
      rows: [
        ["마한", "54개 소국, 목지국 중심"],
        ["진한", "12개 소국, 사로국(신라)으로 발전"],
        ["변한", "12개 소국, 철 수출, 구야국(가야)으로 발전"]
      ]
    }
  },
  {
    id: "gojoseon-012",
    era: "gojoseon",
    level: "advanced",
    confusionType: "institution",
    statement: "가족이 죽으면 뼈만 추려 하나의 목곽에 안치하는 가족 공동 무덤은 동예의 풍습이다.",
    answer: false,
    explanation: "가족 공동 무덤(골장제)은 옥저의 장례 풍습이다.",
    compare: {
      title: "옥저 vs 동예",
      rows: [
        ["옥저", "민며느리제, 가족 공동 무덤, 해산물 풍부"],
        ["동예", "책화, 족외혼, 무천, 단궁·과하마·반어피"]
      ]
    }
  },

  // ---------- 삼국 시대 ----------
  {
    id: "three-kingdoms-001",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "achievement",
    statement: "광개토대왕은 수도를 국내성에서 평양으로 옮겼다.",
    answer: false,
    explanation: "평양 천도(427)는 장수왕의 업적이다. 광개토대왕은 영락 연호를 사용하고 신라에 침입한 왜를 격퇴했다.",
    compare: {
      title: "광개토대왕 vs 장수왕",
      rows: [
        ["광개토대왕", "영락 연호, 신라 구원(왜 격퇴), 요동 확보"],
        ["장수왕", "평양 천도, 한성 함락, 광개토대왕릉비 건립"]
      ]
    }
  },
  {
    id: "three-kingdoms-002",
    era: "three-kingdoms",
    level: "advanced",
    confusionType: "person",
    statement: "고구려 소수림왕은 율령을 반포하고 태학을 설립하였다.",
    answer: true,
    explanation: "소수림왕은 불교 수용(372), 태학 설립, 율령 반포로 중앙 집권 체제를 다졌다."
  },
  {
    id: "three-kingdoms-003",
    era: "three-kingdoms",
    level: "advanced",
    confusionType: "achievement",
    statement: "백제 근초고왕은 평양성을 공격해 고구려 고국원왕을 전사시켰다.",
    answer: true,
    explanation: "근초고왕은 371년 평양성을 공격해 고국원왕을 전사시키는 등 백제의 전성기를 이끌었다."
  },
  {
    id: "three-kingdoms-004",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "person",
    statement: "신라에서 불교를 공인한 왕은 진흥왕이다.",
    answer: false,
    explanation: "신라는 법흥왕 때 이차돈의 순교를 계기로 불교를 공인했다(527).",
    compare: {
      title: "법흥왕 vs 진흥왕",
      rows: [
        ["법흥왕", "율령 반포, 불교 공인, 병부 설치, 금관가야 병합"],
        ["진흥왕", "화랑도 개편, 한강 유역 차지, 대가야 정복, 순수비 건립"]
      ]
    }
  },
  {
    id: "three-kingdoms-005",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "person",
    statement: "진흥왕은 화랑도를 국가적인 조직으로 개편하였다.",
    answer: true,
    explanation: "진흥왕은 화랑도를 국가 조직으로 개편해 인재를 양성했다. 한강 유역을 차지하고 대가야를 정복한 것도 진흥왕이다."
  },
  {
    id: "three-kingdoms-006",
    era: "three-kingdoms",
    level: "advanced",
    confusionType: "person",
    statement: "백제 성왕은 수도를 웅진으로 옮겼다.",
    answer: false,
    explanation: "성왕은 사비로 천도했다(538). 웅진 천도는 한성이 함락된 뒤 문주왕 때의 일이다(475).",
    compare: {
      title: "백제의 천도",
      rows: [
        ["문주왕 (475)", "한성 → 웅진(공주)"],
        ["성왕 (538)", "웅진 → 사비(부여), 국호 남부여"]
      ]
    }
  },
  {
    id: "three-kingdoms-007",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "achievement",
    statement: "살수 대첩은 을지문덕이 당나라 군대를 물리친 전투이다.",
    answer: false,
    explanation: "살수 대첩(612)은 을지문덕이 수나라 군대를 물리친 전투이다.",
    compare: {
      title: "고구려의 대외 항쟁",
      rows: [
        ["살수 대첩 (612)", "수 양제 침입 → 을지문덕"],
        ["안시성 전투 (645)", "당 태종 침입 → 안시성 성주와 백성"]
      ]
    }
  },
  {
    id: "three-kingdoms-008",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "achievement",
    statement: "안시성 전투는 고구려가 당 태종의 침입을 막아낸 전투이다.",
    answer: true,
    explanation: "645년 당 태종이 침입했지만 안시성에서 성주와 백성들이 끝까지 버텨 물리쳤다."
  },
  {
    id: "three-kingdoms-009",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "order",
    statement: "백제는 고구려보다 먼저 멸망하였다.",
    answer: true,
    explanation: "백제는 660년, 고구려는 668년에 나당 연합군에 의해 멸망했다."
  },
  {
    id: "three-kingdoms-010",
    era: "three-kingdoms",
    level: "advanced",
    confusionType: "order",
    statement: "가야 연맹의 중심은 대가야에서 금관가야로 바뀌었다.",
    answer: false,
    explanation: "전기 가야 연맹의 중심은 김해의 금관가야였다. 고구려의 공격으로 금관가야가 약해진 뒤 고령의 대가야가 후기 가야 연맹을 이끌었다.",
    compare: {
      title: "전기 vs 후기 가야",
      rows: [
        ["전기", "금관가야 (김해) 중심"],
        ["후기", "대가야 (고령) 중심"]
      ]
    }
  },

  // 포켓카드 연결용 추가 문제
  {
    id: "three-kingdoms-011",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "achievement",
    statement: "광개토대왕은 '영락'이라는 독자적인 연호를 사용하였다.",
    answer: true,
    explanation: "광개토대왕은 영락 연호를 사용했다. 그의 업적은 장수왕이 세운 광개토대왕릉비에 기록되어 있다."
  },
  {
    id: "three-kingdoms-012",
    era: "three-kingdoms",
    level: "advanced",
    confusionType: "person",
    statement: "백제의 한성을 함락하고 개로왕을 전사시킨 고구려 왕은 광개토대왕이다.",
    answer: false,
    explanation: "475년 장수왕이 한성을 함락하고 개로왕을 전사시켰다. 이후 백제는 웅진으로 천도했다.",
    compare: {
      title: "광개토대왕 vs 장수왕",
      rows: [
        ["광개토대왕", "영락 연호, 신라 구원(왜 격퇴), 요동 확보"],
        ["장수왕", "평양 천도, 한성 함락, 광개토대왕릉비 건립"]
      ]
    }
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "three-kingdoms-013",
    era: "three-kingdoms",
    level: "advanced",
    confusionType: "person",
    statement: "백제 근초고왕은 동진에서 불교를 받아들였다.",
    answer: false,
    explanation: "백제는 침류왕 때 동진의 승려 마라난타를 통해 불교를 받아들였다(384).",
    compare: {
      title: "백제의 주요 왕",
      rows: [
        ["고이왕", "율령 반포, 6좌평·16관등"],
        ["근초고왕", "마한 정복, 평양성 공격, 왜에 칠지도"],
        ["침류왕", "불교 수용"],
        ["성왕", "사비 천도, 한강 하류 일시 회복"]
      ]
    }
  },
  {
    id: "three-kingdoms-014",
    era: "three-kingdoms",
    level: "basic",
    confusionType: "achievement",
    statement: "근초고왕은 마한의 남은 세력을 정복해 남해안까지 영역을 넓혔다.",
    answer: true,
    explanation: "근초고왕은 4세기 중반 마한을 정복하고, 고구려 평양성을 공격하는 등 백제의 전성기를 이끌었다.",
    compare: {
      title: "삼국의 전성기",
      rows: [
        ["백제 (4세기)", "근초고왕"],
        ["고구려 (5세기)", "광개토대왕, 장수왕"],
        ["신라 (6세기)", "진흥왕"]
      ]
    }
  },

  // ---------- 남북국 시대 ----------
  {
    id: "north-south-001",
    era: "north-south",
    level: "basic",
    confusionType: "person",
    statement: "발해를 건국한 인물은 대조영이다.",
    answer: true,
    explanation: "대조영은 698년 고구려 유민과 말갈인을 이끌고 동모산에서 발해(진)를 건국했다.",
    compare: {
      title: "발해 초기 왕",
      rows: [
        ["고왕(대조영)", "동모산에서 건국"],
        ["무왕", "인안 연호, 장문휴의 당 산둥 공격"],
        ["문왕", "대흥 연호, 상경 천도, 당과 친선"]
      ]
    }
  },
  {
    id: "north-south-002",
    era: "north-south",
    level: "advanced",
    confusionType: "institution",
    statement: "신라 신문왕은 관료전을 지급하고 녹읍을 폐지하였다.",
    answer: true,
    explanation: "신문왕은 관료전을 지급하고(687) 녹읍을 폐지해(689) 귀족의 경제 기반을 약화시켰다."
  },
  {
    id: "north-south-003",
    era: "north-south",
    level: "advanced",
    confusionType: "person",
    statement: "통일 신라에서 국학을 처음 설립한 왕은 경덕왕이다.",
    answer: false,
    explanation: "국학은 신문왕 때 설립되었다(682). 경덕왕은 국학의 이름을 태학감으로 바꿨다.",
    compare: {
      title: "신문왕 vs 경덕왕",
      rows: [
        ["신문왕", "김흠돌의 난 진압, 국학 설립, 관료전 지급, 녹읍 폐지, 9주 5소경"],
        ["경덕왕", "녹읍 부활, 국학 → 태학감 개칭, 한화 정책"]
      ]
    }
  },
  {
    id: "north-south-004",
    era: "north-south",
    level: "advanced",
    confusionType: "institution",
    statement: "폐지되었던 녹읍을 다시 부활시킨 왕은 신문왕이다.",
    answer: false,
    explanation: "녹읍은 신문왕 때 폐지되었다가 경덕왕 때 부활했다(757). 귀족 세력이 다시 강해졌음을 보여준다."
  },
  {
    id: "north-south-005",
    era: "north-south",
    level: "basic",
    confusionType: "person",
    statement: "발해 문왕은 '대흥'이라는 독자적인 연호를 사용하였다.",
    answer: true,
    explanation: "문왕은 대흥 연호를 사용하고 상경으로 천도했으며, 당과 친선 관계를 맺었다."
  },
  {
    id: "north-south-006",
    era: "north-south",
    level: "advanced",
    confusionType: "person",
    statement: "발해에서 상경으로 수도를 옮긴 왕은 무왕이다.",
    answer: false,
    explanation: "상경 천도는 문왕 때의 일이다. 무왕은 인안 연호를 사용하고 장문휴를 보내 당의 산둥 지방을 공격했다."
  },
  {
    id: "north-south-007",
    era: "north-south",
    level: "advanced",
    confusionType: "institution",
    statement: "발해의 최고 교육 기관은 국학이다.",
    answer: false,
    explanation: "발해의 최고 교육 기관은 주자감이다. 국학은 통일 신라의 교육 기관이다.",
    compare: {
      title: "국가별 최고 교육 기관",
      rows: [
        ["고구려", "태학"],
        ["통일 신라", "국학"],
        ["발해", "주자감"],
        ["고려", "국자감"],
        ["조선", "성균관"]
      ]
    }
  },
  {
    id: "north-south-008",
    era: "north-south",
    level: "basic",
    confusionType: "person",
    statement: "장보고는 완도에 청해진을 설치하고 해상 무역을 장악하였다.",
    answer: true,
    explanation: "장보고는 흥덕왕 때 완도에 청해진을 설치해 해적을 소탕하고 당·일본과의 해상 무역을 장악했다."
  },
  {
    id: "north-south-009",
    era: "north-south",
    level: "basic",
    confusionType: "order",
    statement: "원종과 애노의 난은 신라 진성여왕 때 일어났다.",
    answer: true,
    explanation: "진성여왕 때 무리한 세금 징수에 반발해 원종과 애노의 난(889)이 일어났다. 신라 말 사회 혼란을 보여준다."
  },
  {
    id: "north-south-010",
    era: "north-south",
    level: "advanced",
    confusionType: "person",
    statement: "최치원은 진성여왕에게 시무 28조를 올렸다.",
    answer: false,
    explanation: "최치원이 진성여왕에게 올린 것은 시무 10여 조이다. 시무 28조는 고려 성종 때 최승로가 올렸다.",
    compare: {
      title: "시무책",
      rows: [
        ["최치원", "시무 10여 조 → 신라 진성여왕"],
        ["최승로", "시무 28조 → 고려 성종"]
      ]
    }
  },

  // 포켓카드 연결용 추가 문제
  {
    id: "north-south-011",
    era: "north-south",
    level: "basic",
    confusionType: "institution",
    statement: "장보고가 청해진을 설치한 곳은 오늘날의 강화도이다.",
    answer: false,
    explanation: "청해진은 오늘날의 전라남도 완도에 설치되었다. 장보고는 이곳을 거점으로 해상 무역을 장악했다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "north-south-012",
    era: "north-south",
    level: "basic",
    confusionType: "person",
    statement: "원효는 화엄 사상을 정립하고 부석사를 창건하였다.",
    answer: false,
    explanation: "화엄 사상을 정립하고 부석사를 세운 인물은 의상이다. 원효는 일심 사상과 화쟁 사상을 내세웠다.",
    compare: {
      title: "원효 vs 의상",
      rows: [
        ["원효", "일심·화쟁 사상, 아미타 신앙, 『대승기신론소』, 『십문화쟁론』"],
        ["의상", "화엄 사상, 부석사 창건, 관음 신앙, 「화엄일승법계도」"]
      ]
    }
  },
  {
    id: "north-south-013",
    era: "north-south",
    level: "advanced",
    confusionType: "achievement",
    statement: "원효는 '나무아미타불'만 외우면 극락에 갈 수 있다는 아미타 신앙을 널리 퍼뜨렸다.",
    answer: true,
    explanation: "원효는 아미타 신앙을 전파해 불교 대중화에 기여했다.",
    compare: {
      title: "원효 vs 의상",
      rows: [
        ["원효", "일심·화쟁 사상, 아미타 신앙, 『대승기신론소』, 『십문화쟁론』"],
        ["의상", "화엄 사상, 부석사 창건, 관음 신앙, 「화엄일승법계도」"]
      ]
    }
  },

  // ---------- 고려 ----------
  {
    id: "goryeo-001",
    era: "goryeo",
    level: "advanced",
    confusionType: "person",
    statement: "노비안검법을 실시한 왕은 성종이다.",
    answer: false,
    explanation: "노비안검법은 광종이 실시했다. 성종은 최승로의 시무 28조를 받아들여 유교 정치를 펼쳤다.",
    compare: {
      title: "광종 vs 성종",
      rows: [
        ["광종", "노비안검법, 과거제, 칭제건원"],
        ["성종", "시무 28조 수용, 12목 설치, 국자감 정비"]
      ]
    }
  },
  {
    id: "goryeo-002",
    era: "goryeo",
    level: "advanced",
    confusionType: "institution",
    statement: "태조 왕건은 지방 호족을 통제하기 위해 사심관 제도와 기인 제도를 실시하였다.",
    answer: true,
    explanation: "태조는 혼인 정책과 함께 사심관 제도, 기인 제도로 호족을 포섭하고 견제했다."
  },
  {
    id: "goryeo-003",
    era: "goryeo",
    level: "advanced",
    confusionType: "person",
    statement: "고려 성종은 전국 주요 지역에 12목을 설치하고 지방관을 파견하였다.",
    answer: true,
    explanation: "성종은 최승로의 건의를 받아들여 12목을 설치하고 처음으로 지방관을 파견했다."
  },
  {
    id: "goryeo-004",
    era: "goryeo",
    level: "basic",
    confusionType: "person",
    statement: "서희는 거란과 외교 담판을 벌여 강동 6주를 확보하였다.",
    answer: true,
    explanation: "거란의 1차 침입(993) 때 서희는 소손녕과 담판을 벌여 강동 6주를 확보했다."
  },
  {
    id: "goryeo-005",
    era: "goryeo",
    level: "basic",
    confusionType: "person",
    statement: "귀주 대첩에서 거란군을 크게 물리친 인물은 윤관이다.",
    answer: false,
    explanation: "귀주 대첩(1019)은 강감찬이 거란의 3차 침입을 물리친 전투이다. 윤관은 여진을 정벌했다.",
    compare: {
      title: "고려의 대외 항쟁 인물",
      rows: [
        ["서희", "거란 1차 침입 → 외교 담판, 강동 6주"],
        ["강감찬", "거란 3차 침입 → 귀주 대첩"],
        ["윤관", "여진 → 별무반, 동북 9성"]
      ]
    }
  },
  {
    id: "goryeo-006",
    era: "goryeo",
    level: "basic",
    confusionType: "achievement",
    statement: "윤관은 별무반을 편성해 여진을 정벌하고 동북 9성을 쌓았다.",
    answer: true,
    explanation: "윤관은 숙종 때 별무반을 편성하고, 예종 때 여진을 정벌해 동북 9성을 쌓았다."
  },
  {
    id: "goryeo-007",
    era: "goryeo",
    level: "advanced",
    confusionType: "order",
    statement: "무신 정변은 이자겸의 난보다 먼저 일어났다.",
    answer: false,
    explanation: "이자겸의 난(1126)과 묘청의 서경 천도 운동(1135)이 먼저이고, 무신 정변(1170)은 그 뒤에 일어났다.",
    compare: {
      title: "고려 중기 사건 순서",
      rows: [
        ["1126", "이자겸의 난"],
        ["1135", "묘청의 서경 천도 운동"],
        ["1170", "무신 정변"]
      ]
    }
  },
  {
    id: "goryeo-008",
    era: "goryeo",
    level: "advanced",
    confusionType: "person",
    statement: "인사 행정 기구인 정방을 설치한 인물은 최충헌이다.",
    answer: false,
    explanation: "정방은 최우가 설치했다. 최충헌은 최고 권력 기구인 교정도감을 설치했다.",
    compare: {
      title: "최충헌 vs 최우",
      rows: [
        ["최충헌", "교정도감 설치, 봉사 10조"],
        ["최우", "정방·서방 설치, 삼별초 조직, 강화도 천도"]
      ]
    }
  },
  {
    id: "goryeo-009",
    era: "goryeo",
    level: "advanced",
    confusionType: "person",
    statement: "공민왕은 쌍성총관부를 공격해 철령 이북의 땅을 되찾았다.",
    answer: true,
    explanation: "공민왕은 반원 자주 정책으로 쌍성총관부를 공격해(1356) 철령 이북 땅을 수복했다."
  },
  {
    id: "goryeo-010",
    era: "goryeo",
    level: "basic",
    confusionType: "institution",
    statement: "『삼국유사』는 김부식이 편찬하였다.",
    answer: false,
    explanation: "『삼국유사』는 승려 일연이 편찬했다. 김부식은 『삼국사기』를 편찬했다.",
    compare: {
      title: "삼국사기 vs 삼국유사",
      rows: [
        ["『삼국사기』", "김부식, 인종, 기전체, 현존 최고(最古) 역사서"],
        ["『삼국유사』", "일연, 충렬왕, 단군 이야기 수록, 불교사·민간 설화"]
      ]
    }
  },

  // 포켓카드 연결용 추가 문제
  {
    id: "goryeo-011",
    era: "goryeo",
    level: "basic",
    confusionType: "person",
    statement: "고려에서 과거제를 처음 실시한 왕은 성종이다.",
    answer: false,
    explanation: "과거제는 광종이 후주 출신 쌍기의 건의를 받아 처음 실시했다(958).",
    compare: {
      title: "광종 vs 성종",
      rows: [
        ["광종", "노비안검법, 과거제, 칭제건원"],
        ["성종", "시무 28조 수용, 12목 설치, 국자감 정비"]
      ]
    }
  },
  {
    id: "goryeo-012",
    era: "goryeo",
    level: "advanced",
    confusionType: "achievement",
    statement: "공민왕은 원의 내정 간섭 기구인 정동행성 이문소를 폐지하였다.",
    answer: true,
    explanation: "공민왕은 반원 자주 정책으로 정동행성 이문소를 폐지하고, 몽골풍을 금지했으며, 쌍성총관부를 공격했다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "goryeo-013",
    era: "goryeo",
    level: "basic",
    confusionType: "person",
    statement: "묘청은 서경 천도와 금 정벌을 주장하였다.",
    answer: true,
    explanation: "묘청은 풍수지리설을 내세워 서경 천도, 칭제건원, 금 정벌을 주장했다(1135).",
    compare: {
      title: "개경파 vs 서경파",
      rows: [
        ["개경파", "김부식, 유교 이념, 금에 사대"],
        ["서경파", "묘청·정지상, 풍수지리설, 칭제건원·금 정벌"]
      ]
    }
  },
  {
    id: "goryeo-014",
    era: "goryeo",
    level: "advanced",
    confusionType: "person",
    statement: "묘청의 서경 천도 운동을 진압한 인물은 강감찬이다.",
    answer: false,
    explanation: "묘청의 서경 천도 운동은 김부식이 이끈 관군에 의해 진압되었다. 강감찬은 거란의 3차 침입을 물리쳤다.",
    compare: {
      title: "개경파 vs 서경파",
      rows: [
        ["개경파", "김부식, 유교 이념, 금에 사대"],
        ["서경파", "묘청·정지상, 풍수지리설, 칭제건원·금 정벌"]
      ]
    }
  },

  // ---------- 조선 전기 ----------
  {
    id: "joseon-early-001",
    era: "joseon-early",
    level: "advanced",
    confusionType: "institution",
    statement: "『경국대전』은 세조 때 편찬을 시작해 성종 때 완성·반포되었다.",
    answer: true,
    explanation: "세조 때 편찬을 시작했고 성종 때 완성되어 반포되었다. 조선의 기본 법전이다."
  },
  {
    id: "joseon-early-002",
    era: "joseon-early",
    level: "basic",
    confusionType: "institution",
    statement: "태종은 6조 직계제를 실시하여 왕권을 강화하였다.",
    answer: true,
    explanation: "태종은 6조가 의정부를 거치지 않고 왕에게 직접 보고하는 6조 직계제를 실시했다."
  },
  {
    id: "joseon-early-003",
    era: "joseon-early",
    level: "advanced",
    confusionType: "institution",
    statement: "세종은 6조 직계제를 실시하여 왕권을 강화하였다.",
    answer: false,
    explanation: "세종은 의정부가 6조의 업무를 먼저 심의하는 의정부 서사제를 실시했다.",
    compare: {
      title: "6조 직계제 vs 의정부 서사제",
      rows: [
        ["태종", "6조 직계제"],
        ["세종", "의정부 서사제"],
        ["세조", "6조 직계제 부활"]
      ]
    }
  },
  {
    id: "joseon-early-004",
    era: "joseon-early",
    level: "basic",
    confusionType: "person",
    statement: "훈민정음은 세조 때 반포되었다.",
    answer: false,
    explanation: "훈민정음은 세종 때 창제(1443)되고 반포(1446)되었다."
  },
  {
    id: "joseon-early-005",
    era: "joseon-early",
    level: "basic",
    confusionType: "achievement",
    statement: "세종 때 최윤덕과 김종서를 보내 4군 6진을 개척하였다.",
    answer: true,
    explanation: "세종 때 최윤덕이 4군, 김종서가 6진을 개척해 오늘날과 비슷한 국경선을 확정했다."
  },
  {
    id: "joseon-early-006",
    era: "joseon-early",
    level: "advanced",
    confusionType: "person",
    statement: "집현전을 폐지한 왕은 성종이다.",
    answer: false,
    explanation: "집현전은 세조가 폐지했다. 성종은 홍문관을 설치해 집현전의 기능을 이어받게 했다.",
    compare: {
      title: "세조 vs 성종",
      rows: [
        ["세조", "계유정난, 집현전 폐지, 6조 직계제 부활, 직전법"],
        ["성종", "홍문관 설치, 『경국대전』 완성, 관수관급제"]
      ]
    }
  },
  {
    id: "joseon-early-007",
    era: "joseon-early",
    level: "advanced",
    confusionType: "order",
    statement: "무오사화는 갑자사화보다 먼저 일어났다.",
    answer: true,
    explanation: "무오사화(1498)와 갑자사화(1504)는 모두 연산군 때 일어났으며, 무오사화가 먼저이다.",
    compare: {
      title: "4대 사화",
      rows: [
        ["무오사화 (1498)", "연산군, 김종직의 조의제문"],
        ["갑자사화 (1504)", "연산군, 폐비 윤씨 사건"],
        ["기묘사화 (1519)", "중종, 조광조 등 사림 제거"],
        ["을사사화 (1545)", "명종, 외척 간 대립"]
      ]
    }
  },
  {
    id: "joseon-early-008",
    era: "joseon-early",
    level: "advanced",
    confusionType: "person",
    statement: "조광조가 화를 입은 사화는 을사사화이다.",
    answer: false,
    explanation: "조광조는 중종 때 위훈 삭제 등을 추진하다가 기묘사화(1519)로 화를 입었다."
  },
  {
    id: "joseon-early-009",
    era: "joseon-early",
    level: "basic",
    confusionType: "achievement",
    statement: "『농사직설』은 세조 때 편찬된 농서이다.",
    answer: false,
    explanation: "『농사직설』은 세종 때 우리나라 실정에 맞는 농법을 정리해 편찬한 농서이다."
  },
  {
    id: "joseon-early-010",
    era: "joseon-early",
    level: "advanced",
    confusionType: "person",
    statement: "이황은 『성학십도』를, 이이는 『성학집요』를 저술하였다.",
    answer: true,
    explanation: "이황은 선조에게 『성학십도』를, 이이는 『성학집요』를 지어 올렸다.",
    compare: {
      title: "이황 vs 이이",
      rows: [
        ["이황", "『성학십도』, 『주자서절요』, 예안 향약"],
        ["이이", "『성학집요』, 『동호문답』, 『격몽요결』, 해주 향약"]
      ]
    }
  },

  // 포켓카드 연결용 추가 문제
  {
    id: "joseon-early-011",
    era: "joseon-early",
    level: "advanced",
    confusionType: "person",
    statement: "조광조는 중종에게 현량과 실시를 건의하였다.",
    answer: true,
    explanation: "조광조는 현량과로 사림을 등용하고 위훈 삭제를 주장했다. 이에 반발한 훈구 세력에 의해 기묘사화로 제거되었다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "joseon-early-012",
    era: "joseon-early",
    level: "advanced",
    confusionType: "institution",
    statement: "이황의 건의로 백운동 서원이 '소수 서원'이라는 사액을 받았다.",
    answer: true,
    explanation: "이황의 건의로 명종 때 백운동 서원이 소수 서원으로 사액되었다. 최초의 사액 서원이다.",
    compare: {
      title: "백운동 서원 → 소수 서원",
      rows: [
        ["주세붕 (중종)", "백운동 서원 건립 (최초의 서원)"],
        ["이황 (명종)", "사액 건의 → 소수 서원 (최초의 사액 서원)"]
      ]
    }
  },
  {
    id: "joseon-early-013",
    era: "joseon-early",
    level: "basic",
    confusionType: "person",
    statement: "우리나라 최초의 서원인 백운동 서원을 세운 인물은 이황이다.",
    answer: false,
    explanation: "백운동 서원은 주세붕이 세웠다(1543). 이황은 이 서원이 사액을 받도록 건의했다.",
    compare: {
      title: "백운동 서원 → 소수 서원",
      rows: [
        ["주세붕 (중종)", "백운동 서원 건립 (최초의 서원)"],
        ["이황 (명종)", "사액 건의 → 소수 서원 (최초의 사액 서원)"]
      ]
    }
  },

  // ---------- 조선 후기 ----------
  {
    id: "joseon-late-001",
    era: "joseon-late",
    level: "basic",
    confusionType: "order",
    statement: "병자호란은 임진왜란보다 먼저 일어났다.",
    answer: false,
    explanation: "임진왜란(1592)이 먼저이고, 정묘호란(1627)과 병자호란(1636)이 뒤이어 일어났다.",
    compare: {
      title: "전란 순서",
      rows: [
        ["1592", "임진왜란"],
        ["1627", "정묘호란"],
        ["1636", "병자호란"]
      ]
    }
  },
  {
    id: "joseon-late-002",
    era: "joseon-late",
    level: "basic",
    confusionType: "institution",
    statement: "대동법은 공납을 토지 결수에 따라 쌀, 베, 동전 등으로 내게 한 제도이다.",
    answer: true,
    explanation: "대동법은 집집마다 특산물을 내던 공납을 토지 결수 기준으로 바꿔 농민의 부담을 줄였다."
  },
  {
    id: "joseon-late-003",
    era: "joseon-late",
    level: "advanced",
    confusionType: "institution",
    statement: "대동법은 숙종 때 경기도에서 처음 실시되었다.",
    answer: false,
    explanation: "대동법은 광해군 때 경기도에서 처음 실시되었다(1608). 전국으로 확대된 것은 숙종 때이다.",
    compare: {
      title: "조선 후기 수취 제도 개편",
      rows: [
        ["대동법", "광해군, 공납 → 토지 결수 기준"],
        ["영정법", "인조, 전세 1결당 4~6두 고정"],
        ["균역법", "영조, 군포 2필 → 1필"]
      ]
    }
  },
  {
    id: "joseon-late-004",
    era: "joseon-late",
    level: "advanced",
    confusionType: "institution",
    statement: "균역법은 영조 때 군포 부담을 1년에 2필에서 1필로 줄인 제도이다.",
    answer: true,
    explanation: "영조는 균역법으로 군포를 1필로 줄이고, 부족한 재정은 결작, 선무군관포 등으로 보충했다."
  },
  {
    id: "joseon-late-005",
    era: "joseon-late",
    level: "basic",
    confusionType: "person",
    statement: "성균관 입구에 탕평비를 세운 왕은 정조이다.",
    answer: false,
    explanation: "탕평비는 영조가 세웠다. 정조는 영조의 탕평책을 이어 더 적극적인 탕평 정치를 펼쳤다.",
    compare: {
      title: "영조 vs 정조",
      rows: [
        ["영조", "탕평비, 균역법, 청계천 준설, 『속대전』"],
        ["정조", "규장각, 장용영, 수원 화성, 초계문신제, 『대전통편』"]
      ]
    }
  },
  {
    id: "joseon-late-006",
    era: "joseon-late",
    level: "basic",
    confusionType: "person",
    statement: "정조는 규장각을 설치하고 친위 부대인 장용영을 창설하였다.",
    answer: true,
    explanation: "정조는 규장각을 학문과 정책 연구 기관으로 키우고, 장용영으로 군사적 기반을 강화했다."
  },
  {
    id: "joseon-late-007",
    era: "joseon-late",
    level: "advanced",
    confusionType: "order",
    statement: "홍경래의 난은 임술 농민 봉기보다 먼저 일어났다.",
    answer: true,
    explanation: "홍경래의 난(1811, 순조)이 먼저이고, 임술 농민 봉기(1862, 철종)는 진주에서 시작되었다."
  },
  {
    id: "joseon-late-008",
    era: "joseon-late",
    level: "basic",
    confusionType: "person",
    statement: "정약용은 『열하일기』를 저술하였다.",
    answer: false,
    explanation: "『열하일기』는 박지원의 저술이다. 정약용은 『목민심서』, 『경세유표』 등을 남겼다.",
    compare: {
      title: "실학자와 저서",
      rows: [
        ["유형원", "『반계수록』, 균전론"],
        ["이익", "『성호사설』, 한전론"],
        ["정약용", "『목민심서』, 『경세유표』, 여전론"],
        ["박지원", "『열하일기』, 수레·선박 이용 주장"],
        ["박제가", "『북학의』, 소비 촉진 주장"]
      ]
    }
  },
  {
    id: "joseon-late-009",
    era: "joseon-late",
    level: "advanced",
    confusionType: "person",
    statement: "이익은 생활에 필요한 최소한의 토지 매매를 금지하는 한전론을 주장하였다.",
    answer: true,
    explanation: "이익은 영업전을 정해 매매를 금지하자는 한전론을 주장했다."
  },
  {
    id: "joseon-late-010",
    era: "joseon-late",
    level: "advanced",
    confusionType: "order",
    statement: "기해예송과 갑인예송은 숙종 때 일어났다.",
    answer: false,
    explanation: "두 차례의 예송은 모두 현종 때 일어났다(1659, 1674). 숙종 때는 환국이 반복되었다."
  },

  // 포켓카드 연결용 추가 문제
  {
    id: "joseon-late-011",
    era: "joseon-late",
    level: "basic",
    confusionType: "achievement",
    statement: "정약용은 거중기를 설계하여 수원 화성 축조에 활용하였다.",
    answer: true,
    explanation: "정약용은 정조의 명으로 거중기를 설계했고, 수원 화성을 쌓을 때 공사 기간과 비용을 크게 줄였다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "joseon-late-012",
    era: "joseon-late",
    level: "basic",
    confusionType: "achievement",
    statement: "광해군은 명과 후금 사이에서 중립 외교를 펼쳤다.",
    answer: true,
    explanation: "광해군은 명의 요청으로 강홍립을 파병하면서도 후금과 충돌을 피하는 중립 외교를 펼쳤다.",
    compare: {
      title: "광해군 vs 인조",
      rows: [
        ["광해군", "중립 외교, 대동법(경기), 『동의보감』 완성"],
        ["인조", "인조반정, 친명배금, 정묘·병자호란, 영정법"]
      ]
    }
  },
  {
    id: "joseon-late-013",
    era: "joseon-late",
    level: "advanced",
    confusionType: "achievement",
    statement: "허준의 『동의보감』은 인조 때 완성되었다.",
    answer: false,
    explanation: "『동의보감』은 광해군 때 완성되었다(1610).",
    compare: {
      title: "광해군 vs 인조",
      rows: [
        ["광해군", "중립 외교, 대동법(경기), 『동의보감』 완성"],
        ["인조", "인조반정, 친명배금, 정묘·병자호란, 영정법"]
      ]
    }
  },

  // ---------- 근대 (개항기) ----------
  {
    id: "opening-001",
    era: "opening",
    level: "advanced",
    confusionType: "order",
    statement: "갑신정변은 임오군란보다 먼저 일어났다.",
    answer: false,
    explanation: "임오군란(1882)이 먼저 일어났고, 2년 뒤 급진 개화파가 갑신정변(1884)을 일으켰다.",
    compare: {
      title: "임오군란 vs 갑신정변",
      rows: [
        ["임오군란 (1882)", "구식 군인 봉기 → 제물포 조약, 조·청 상민 수륙 무역 장정"],
        ["갑신정변 (1884)", "급진 개화파 정변 → 한성 조약, 톈진 조약"]
      ]
    }
  },
  {
    id: "opening-002",
    era: "opening",
    level: "basic",
    confusionType: "institution",
    statement: "강화도 조약은 우리나라 최초의 근대적 조약이자 불평등 조약이다.",
    answer: true,
    explanation: "강화도 조약(1876)으로 부산 외 2개 항구를 개항했다. 해안 측량권, 영사 재판권(치외 법권)을 인정한 불평등 조약이었다."
  },
  {
    id: "opening-003",
    era: "opening",
    level: "basic",
    confusionType: "order",
    statement: "신미양요는 병인양요보다 먼저 일어났다.",
    answer: false,
    explanation: "병인양요(1866)가 먼저이고, 신미양요(1871)는 그 뒤에 일어났다.",
    compare: {
      title: "병인양요 vs 신미양요",
      rows: [
        ["병인양요 (1866)", "프랑스, 병인박해 구실, 양헌수(정족산성), 외규장각 도서 약탈"],
        ["신미양요 (1871)", "미국, 제너럴셔먼호 사건 구실, 어재연(광성보), 척화비 건립"]
      ]
    }
  },
  {
    id: "opening-004",
    era: "opening",
    level: "basic",
    confusionType: "person",
    statement: "흥선 대원군은 신미양요 이후 전국에 척화비를 세웠다.",
    answer: true,
    explanation: "신미양요 이후 흥선 대원군은 통상 수교 거부 의지를 알리기 위해 전국 각지에 척화비를 세웠다."
  },
  {
    id: "opening-005",
    era: "opening",
    level: "basic",
    confusionType: "achievement",
    statement: "동학 농민군은 정부와 전주 화약을 맺고 집강소를 설치하였다.",
    answer: true,
    explanation: "동학 농민군은 전주성을 점령한 뒤 정부와 전주 화약을 맺고, 전라도 각지에 집강소를 설치해 개혁을 추진했다."
  },
  {
    id: "opening-006",
    era: "opening",
    level: "advanced",
    confusionType: "institution",
    statement: "갑오개혁 때 과거제가 폐지되고 신분제가 철폐되었다.",
    answer: true,
    explanation: "1차 갑오개혁 때 군국기무처를 중심으로 과거제 폐지, 신분제 철폐 등이 추진되었다."
  },
  {
    id: "opening-007",
    era: "opening",
    level: "advanced",
    confusionType: "institution",
    statement: "단발령은 1차 갑오개혁 때 실시되었다.",
    answer: false,
    explanation: "단발령은 을미사변 이후 추진된 을미개혁(1895) 때 실시되었다.",
    compare: {
      title: "갑오개혁 vs 을미개혁",
      rows: [
        ["1차 갑오개혁", "군국기무처, 과거제 폐지, 신분제 철폐"],
        ["2차 갑오개혁", "홍범 14조, 8도 → 23부"],
        ["을미개혁", "단발령, 태양력 사용, 건양 연호"]
      ]
    }
  },
  {
    id: "opening-008",
    era: "opening",
    level: "basic",
    confusionType: "achievement",
    statement: "독립 협회는 만민 공동회를 개최하였다.",
    answer: true,
    explanation: "독립 협회는 만민 공동회와 관민 공동회를 열어 자주 국권, 자유 민권 운동을 펼쳤다."
  },
  {
    id: "opening-009",
    era: "opening",
    level: "advanced",
    confusionType: "institution",
    statement: "을사늑약으로 대한 제국의 군대가 해산되었다.",
    answer: false,
    explanation: "을사늑약(1905)으로는 외교권을 빼앗기고 통감부가 설치되었다. 군대 해산은 한일 신협약(정미7조약, 1907) 때의 일이다.",
    compare: {
      title: "국권 피탈 과정",
      rows: [
        ["한일 의정서 (1904)", "군사 요지 사용"],
        ["제1차 한일 협약 (1904)", "고문 정치"],
        ["을사늑약 (1905)", "외교권 박탈, 통감부 설치"],
        ["한일 신협약 (1907)", "차관 정치, 군대 해산"],
        ["기유각서 (1909)", "사법권 박탈"]
      ]
    }
  },
  {
    id: "opening-010",
    era: "opening",
    level: "advanced",
    confusionType: "order",
    statement: "헤이그 특사 파견은 을사늑약 체결 이전의 일이다.",
    answer: false,
    explanation: "고종은 을사늑약(1905)의 부당함을 알리려고 1907년 헤이그에 특사를 보냈다. 이 일을 구실로 고종은 강제 퇴위되었다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "opening-011",
    era: "opening",
    level: "basic",
    confusionType: "person",
    statement: "갑신정변을 주도한 세력은 김옥균, 박영효 등 급진 개화파이다.",
    answer: true,
    explanation: "김옥균, 박영효 등 급진 개화파는 우정총국 개국 축하연을 틈타 갑신정변을 일으켰다(1884).",
    compare: {
      title: "온건 개화파 vs 급진 개화파",
      rows: [
        ["온건 개화파", "김홍집·김윤식·어윤중, 동도서기, 청 양무운동 모델"],
        ["급진 개화파", "김옥균·박영효·서광범, 문명개화, 일본 메이지 유신 모델"]
      ]
    }
  },
  {
    id: "opening-012",
    era: "opening",
    level: "advanced",
    confusionType: "achievement",
    statement: "급진 개화파는 청의 양무운동을 개혁의 모델로 삼았다.",
    answer: false,
    explanation: "급진 개화파는 일본의 메이지 유신을 모델로 삼았다. 청의 양무운동을 모델로 삼은 것은 온건 개화파이다.",
    compare: {
      title: "온건 개화파 vs 급진 개화파",
      rows: [
        ["온건 개화파", "김홍집·김윤식·어윤중, 동도서기, 청 양무운동 모델"],
        ["급진 개화파", "김옥균·박영효·서광범, 문명개화, 일본 메이지 유신 모델"]
      ]
    }
  },

  // ---------- 일제 강점기 ----------
  {
    id: "colonial-001",
    era: "colonial",
    level: "advanced",
    confusionType: "institution",
    statement: "회사령은 1920년대 문화 통치 시기에 처음 제정되었다.",
    answer: false,
    explanation: "회사령은 1910년 무단 통치 시기에 제정된 허가제 법령이다. 1920년에 신고제로 바뀌며 폐지되었다.",
    compare: {
      title: "무단 통치 vs 문화 통치",
      rows: [
        ["1910년대 무단 통치", "헌병 경찰, 회사령(허가제), 토지 조사 사업"],
        ["1920년대 문화 통치", "보통 경찰, 회사령 폐지(신고제), 산미 증식 계획"]
      ]
    }
  },
  {
    id: "colonial-002",
    era: "colonial",
    level: "basic",
    confusionType: "institution",
    statement: "1910년대에는 헌병 경찰제가 실시되었다.",
    answer: true,
    explanation: "1910년대 무단 통치 시기에는 헌병이 경찰 업무를 맡았고, 조선 태형령으로 한국인에게만 태형을 가했다."
  },
  {
    id: "colonial-003",
    era: "colonial",
    level: "advanced",
    confusionType: "order",
    statement: "토지 조사 사업은 1930년대에 실시되었다.",
    answer: false,
    explanation: "토지 조사 사업은 1910~1918년에 실시되었다. 기한부 신고제로 많은 농민이 토지를 잃었다.",
    compare: {
      title: "시기별 경제 수탈",
      rows: [
        ["1910년대", "토지 조사 사업, 회사령"],
        ["1920년대", "산미 증식 계획, 회사령 폐지"],
        ["1930년대 이후", "병참 기지화, 국가 총동원법, 남면북양 정책"]
      ]
    }
  },
  {
    id: "colonial-004",
    era: "colonial",
    level: "advanced",
    confusionType: "order",
    statement: "산미 증식 계획은 1920년대에 실시되었다.",
    answer: true,
    explanation: "산미 증식 계획(1920~1934)은 일본의 쌀 부족을 해결하려고 실시되었다. 증산량보다 많은 쌀이 일본으로 빠져나갔다."
  },
  {
    id: "colonial-005",
    era: "colonial",
    level: "basic",
    confusionType: "achievement",
    statement: "3·1 운동 이후 상하이에서 대한민국 임시 정부가 수립되었다.",
    answer: true,
    explanation: "3·1 운동을 계기로 1919년 상하이에서 대한민국 임시 정부가 수립되었다."
  },
  {
    id: "colonial-006",
    era: "colonial",
    level: "basic",
    confusionType: "person",
    statement: "봉오동 전투를 승리로 이끈 인물은 김좌진이다.",
    answer: false,
    explanation: "봉오동 전투(1920.6)는 홍범도의 대한 독립군이 중심이었다. 김좌진은 청산리 전투(1920.10)에서 북로 군정서를 이끌었다.",
    compare: {
      title: "봉오동 vs 청산리",
      rows: [
        ["봉오동 전투", "1920년 6월, 홍범도 (대한 독립군)"],
        ["청산리 전투", "1920년 10월, 김좌진 (북로 군정서), 홍범도 연합"]
      ]
    }
  },
  {
    id: "colonial-007",
    era: "colonial",
    level: "advanced",
    confusionType: "institution",
    statement: "신간회는 민족주의 계열과 사회주의 계열이 연합해 만든 단체이다.",
    answer: true,
    explanation: "신간회(1927)는 민족 유일당 운동으로 결성되었다. 광주 학생 항일 운동 때 진상 조사단을 파견했다."
  },
  {
    id: "colonial-008",
    era: "colonial",
    level: "advanced",
    confusionType: "order",
    statement: "6·10 만세 운동은 광주 학생 항일 운동보다 먼저 일어났다.",
    answer: true,
    explanation: "6·10 만세 운동(1926)은 순종의 장례일에 일어났고, 광주 학생 항일 운동(1929)은 그 뒤에 일어났다."
  },
  {
    id: "colonial-009",
    era: "colonial",
    level: "basic",
    confusionType: "person",
    statement: "의열단을 조직한 인물은 김구이다.",
    answer: false,
    explanation: "의열단(1919)은 김원봉이 조직했다. 김구는 한인 애국단(1931)을 조직했다.",
    compare: {
      title: "의열단 vs 한인 애국단",
      rows: [
        ["의열단", "김원봉, 신채호의 「조선 혁명 선언」, 김상옥·나석주"],
        ["한인 애국단", "김구, 이봉창·윤봉길 의거"]
      ]
    }
  },
  {
    id: "colonial-010",
    era: "colonial",
    level: "advanced",
    confusionType: "order",
    statement: "창씨개명은 1910년대 무단 통치 시기에 강요되었다.",
    answer: false,
    explanation: "창씨개명은 1940년 민족 말살 통치 시기에 강요되었다. 이 시기에는 황국 신민 서사 암송, 신사 참배도 강요되었다."
  },

  // 포켓카드 연결용 추가 문제
  {
    id: "colonial-011",
    era: "colonial",
    level: "advanced",
    confusionType: "achievement",
    statement: "청산리 전투에는 김좌진의 북로 군정서와 홍범도의 부대가 함께 참여하였다.",
    answer: true,
    explanation: "1920년 10월 청산리 일대에서 김좌진의 북로 군정서와 홍범도의 대한 독립군 등이 연합해 일본군을 크게 물리쳤다."
  },
  {
    id: "colonial-012",
    era: "colonial",
    level: "advanced",
    confusionType: "person",
    statement: "이봉창과 윤봉길은 의열단 단원으로 의거를 일으켰다.",
    answer: false,
    explanation: "이봉창(1932.1, 도쿄)과 윤봉길(1932.4, 상하이 훙커우 공원)은 김구가 조직한 한인 애국단 소속이다.",
    compare: {
      title: "의열단 vs 한인 애국단",
      rows: [
        ["의열단", "김원봉, 신채호의 「조선 혁명 선언」, 김상옥·나석주"],
        ["한인 애국단", "김구, 이봉창·윤봉길 의거"]
      ]
    }
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "colonial-013",
    era: "colonial",
    level: "basic",
    confusionType: "achievement",
    statement: "윤봉길은 상하이 훙커우 공원에서 일본군 수뇌부를 향해 폭탄을 던졌다.",
    answer: true,
    explanation: "윤봉길은 1932년 4월 훙커우 공원의 일본군 전승 기념식장에서 의거를 일으켰다.",
    compare: {
      title: "이봉창 vs 윤봉길",
      rows: [
        ["이봉창 (1932.1)", "도쿄, 일왕 행렬에 폭탄 투척"],
        ["윤봉길 (1932.4)", "상하이 훙커우 공원 → 중국 국민당의 임시 정부 지원 계기"]
      ]
    }
  },
  {
    id: "colonial-014",
    era: "colonial",
    level: "advanced",
    confusionType: "order",
    statement: "중국 국민당 정부가 대한민국 임시 정부를 적극 지원하게 된 계기는 이봉창 의거이다.",
    answer: false,
    explanation: "윤봉길 의거를 계기로 중국 국민당 정부가 임시 정부를 적극 지원했고, 이후 한국광복군 창설로 이어졌다.",
    compare: {
      title: "이봉창 vs 윤봉길",
      rows: [
        ["이봉창 (1932.1)", "도쿄, 일왕 행렬에 폭탄 투척"],
        ["윤봉길 (1932.4)", "상하이 훙커우 공원 → 중국 국민당의 임시 정부 지원 계기"]
      ]
    }
  },

  // ---------- 현대 ----------
  {
    id: "contemporary-001",
    era: "contemporary",
    level: "basic",
    confusionType: "order",
    statement: "4·19 혁명은 5·16 군사 정변 이후에 일어났다.",
    answer: false,
    explanation: "4·19 혁명(1960)으로 이승만 정부가 무너졌고, 이듬해 5·16 군사 정변(1961)이 일어났다."
  },
  {
    id: "contemporary-002",
    era: "contemporary",
    level: "basic",
    confusionType: "institution",
    statement: "5·10 총선거는 우리나라 최초의 민주적 보통 선거였다.",
    answer: true,
    explanation: "1948년 5·10 총선거는 만 21세 이상 남녀 모두에게 투표권을 준 최초의 보통 선거였다. 이 선거로 제헌 국회가 구성되었다."
  },
  {
    id: "contemporary-003",
    era: "contemporary",
    level: "advanced",
    confusionType: "institution",
    statement: "반민족 행위 처벌법은 이승만 정부 때 제정되었다.",
    answer: true,
    explanation: "제헌 국회는 1948년 반민족 행위 처벌법을 제정하고 반민 특위를 구성했다. 하지만 정부의 비협조로 성과를 거두지 못했다.",
    compare: {
      title: "이승만 정부 주요 사건",
      rows: [
        ["1948", "반민족 행위 처벌법, 반민 특위"],
        ["1949", "농지 개혁법 (유상 매수·유상 분배)"],
        ["1952", "발췌 개헌"],
        ["1954", "사사오입 개헌"]
      ]
    }
  },
  {
    id: "contemporary-004",
    era: "contemporary",
    level: "advanced",
    confusionType: "order",
    statement: "6·25 전쟁 중 인천 상륙 작전은 1·4 후퇴 이후에 전개되었다.",
    answer: false,
    explanation: "인천 상륙 작전(1950.9)이 먼저이다. 이후 중국군이 개입하면서 1·4 후퇴(1951.1)가 이어졌다.",
    compare: {
      title: "6·25 전쟁 전개",
      rows: [
        ["1950.6", "북한의 남침"],
        ["1950.9", "인천 상륙 작전 → 서울 수복"],
        ["1950.10", "중국군 개입"],
        ["1951.1", "1·4 후퇴"],
        ["1953.7", "정전 협정"]
      ]
    }
  },
  {
    id: "contemporary-005",
    era: "contemporary",
    level: "advanced",
    confusionType: "institution",
    statement: "유신 헌법은 박정희 정부 때 제정되었다.",
    answer: true,
    explanation: "1972년 유신 헌법으로 대통령 간선제(통일 주체 국민 회의)와 긴급 조치권이 도입되었다."
  },
  {
    id: "contemporary-006",
    era: "contemporary",
    level: "basic",
    confusionType: "order",
    statement: "5·18 민주화 운동은 1987년에 일어났다.",
    answer: false,
    explanation: "5·18 민주화 운동은 1980년 광주에서 일어났다. 1987년에는 6월 민주 항쟁이 일어났다.",
    compare: {
      title: "민주화 운동 순서",
      rows: [
        ["1960", "4·19 혁명"],
        ["1979", "부마 민주 항쟁"],
        ["1980", "5·18 민주화 운동"],
        ["1987", "6월 민주 항쟁"]
      ]
    }
  },
  {
    id: "contemporary-007",
    era: "contemporary",
    level: "basic",
    confusionType: "achievement",
    statement: "6월 민주 항쟁의 결과 대통령 직선제 개헌이 이루어졌다.",
    answer: true,
    explanation: "6월 민주 항쟁(1987)으로 6·29 민주화 선언이 발표되었고, 5년 단임의 대통령 직선제 개헌이 이루어졌다."
  },
  {
    id: "contemporary-008",
    era: "contemporary",
    level: "advanced",
    confusionType: "achievement",
    statement: "금융 실명제는 김대중 정부 때 실시되었다.",
    answer: false,
    explanation: "금융 실명제는 김영삼 정부 때 실시되었다(1993).",
    compare: {
      title: "정부별 주요 정책",
      rows: [
        ["노태우", "남북한 유엔 동시 가입, 남북 기본 합의서"],
        ["김영삼", "금융 실명제, OECD 가입, 외환 위기"],
        ["김대중", "외환 위기 극복, 6·15 남북 공동 선언"],
        ["노무현", "10·4 남북 정상 선언"]
      ]
    }
  },
  {
    id: "contemporary-009",
    era: "contemporary",
    level: "advanced",
    confusionType: "achievement",
    statement: "남북한 유엔 동시 가입은 노태우 정부 때 이루어졌다.",
    answer: true,
    explanation: "노태우 정부는 북방 외교를 추진했고, 1991년 남북한이 유엔에 동시 가입했다."
  },
  {
    id: "contemporary-010",
    era: "contemporary",
    level: "advanced",
    confusionType: "achievement",
    statement: "6·15 남북 공동 선언은 노무현 정부 때 발표되었다.",
    answer: false,
    explanation: "6·15 남북 공동 선언은 김대중 정부 때 첫 남북 정상 회담에서 발표되었다(2000). 노무현 정부 때는 10·4 남북 정상 선언(2007)이 발표되었다."
  },

  // 비교 박스 보강용 추가 문제
  {
    id: "contemporary-011",
    era: "contemporary",
    level: "basic",
    confusionType: "achievement",
    statement: "7·4 남북 공동 성명은 박정희 정부 때 발표되었다.",
    answer: true,
    explanation: "1972년 7·4 남북 공동 성명에서 자주·평화·민족적 대단결의 통일 3대 원칙을 발표했다.",
    compare: {
      title: "남북 합의 문서",
      rows: [
        ["7·4 남북 공동 성명 (1972)", "박정희, 통일 3대 원칙"],
        ["남북 기본 합의서 (1991)", "노태우"],
        ["6·15 남북 공동 선언 (2000)", "김대중"],
        ["10·4 남북 정상 선언 (2007)", "노무현"]
      ]
    }
  },
  {
    id: "contemporary-012",
    era: "contemporary",
    level: "advanced",
    confusionType: "achievement",
    statement: "경부 고속 국도는 전두환 정부 때 개통되었다.",
    answer: false,
    explanation: "경부 고속 국도는 박정희 정부 때 개통되었다(1970).",
    compare: {
      title: "정부별 경제",
      rows: [
        ["박정희", "경제 개발 5개년 계획, 경부 고속 국도, 새마을 운동, 수출 100억 달러"],
        ["전두환", "3저 호황"],
        ["김영삼", "금융 실명제, OECD 가입"]
      ]
    }
  }
];
