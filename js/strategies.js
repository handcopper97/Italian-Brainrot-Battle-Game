// 전투 전략 데이터

export const battleStrategies = [
    {
        name: "땅에 숨기",
        description: "지형을 이용해 몸을 숨기고 기습 공격한다",
        advantageEnvironment: "깊은 바다", // 숨기 좋은 환경
        disadvantageEnvironment: "무(無)의 공간", // 숨을 곳이 없음
        effectDescription: "기습 공격 성공 시 데미지가 2배로 증가"
    },
    {
        name: "방어자세 잡기",
        description: "모든 공격에 대비해 완벽한 방어태세를 갖춘다",
        advantageEnvironment: "용암 화산", // 위험한 환경에서 유리
        disadvantageEnvironment: "혼돈의 회오리", // 예측불가능한 공격에 취약
        effectDescription: "모든 피해를 30% 감소시키지만, 공격력도 25% 감소"
    },
    {
        name: "돌격",
        description: "모든 것을 걸고 전력으로 적에게 돌진한다",
        advantageEnvironment: "공포의 밤", // 공포를 이겨내는 용기
        disadvantageEnvironment: "깊은 바다", // 수압에 의해 속도 저하
        effectDescription: "공격력 50% 증가, 방어력 40% 감소"
    },
    {
        name: "차원 건너뛰기",
        description: "현실과 다른 차원을 오가며 전투를 유리하게 이끈다",
        advantageEnvironment: "양자 차원", // 차원 이동이 쉬워짐
        disadvantageEnvironment: "공포의 밤", // 차원 이동 시 공포에 취약
        effectDescription: "50% 확률로 적의 공격을 완전히 회피"
    },
    {
        name: "현실 왜곡",
        description: "주변 환경의 물리 법칙을 자신에게 유리하게 바꾼다",
        advantageEnvironment: "혼돈의 회오리", // 이미 불안정한 현실
        disadvantageEnvironment: "양자 차원", // 이미 왜곡된 현실
        effectDescription: "환경 이점이 2배로 증가, 상대의 환경 이점은 무효화"
    },
    {
        name: "존재 부정",
        description: "자신의 존재 자체를 희미하게 만들어 공격을 무효화한다",
        advantageEnvironment: "무(無)의 공간", // 존재의 경계가 모호함
        disadvantageEnvironment: "용암 화산", // 극단적 물리 환경
        effectDescription: "30% 확률로 모든 공격이 자신을 통과"
    }
];