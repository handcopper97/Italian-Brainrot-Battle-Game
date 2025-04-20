// 전투 환경 데이터

export const battleEnvironments = [
    {
        name: "용암 화산",
        description: "끓어오르는 용암과 화산재가 가득한 불타는 지옥",
        advantage: "bombardiro", // 공중 우위가 있는 캐릭터에게 유리
        disadvantage: "tralalero", // 물 기반 캐릭터에게 불리
        image: "https://picsum.photos/200/120?random=1"
    },
    {
        name: "깊은 바다",
        description: "압도적인 수압과 어둠이 지배하는 심해",
        advantage: "tralalero", // 물과 관련된 캐릭터에게 유리
        disadvantage: "bombardiro", // 폭격과 비행에 불리
        image: "https://picsum.photos/200/120?random=2"
    },
    {
        name: "양자 차원",
        description: "물리 법칙이 무의미한 초현실적 공간",
        advantage: "gigakubikus", // 차원을 다루는 캐릭터에게 유리
        disadvantage: "bingus", // 실존적 능력이 약화됨
        image: "https://picsum.photos/200/120?random=3"
    },
    {
        name: "공포의 밤",
        description: "모든 두려움이 실체화되는 암흑의 세계",
        advantage: "sahur", // 공포를 주는 캐릭터에게 유리
        disadvantage: "quandaledingus", // 혼돈이 더 예측 불가능해짐
        image: "https://picsum.photos/200/120?random=4"
    },
    {
        name: "무(無)의 공간",
        description: "존재와 비존재의 경계가 모호한 허무의 세계",
        advantage: "bingus", // 존재의 미니멀리즘에 완벽한 환경
        disadvantage: "sahur", // 물리적 공격이 약화됨
        image: "https://picsum.photos/200/120?random=5"
    },
    {
        name: "혼돈의 회오리",
        description: "예측불가능한 현상이 끊임없이 발생하는 카오스",
        advantage: "quandaledingus", // 혼돈을 다루는 캐릭터에게 유리
        disadvantage: "gigakubikus", // 기하학적 완전함이 방해받음
        image: "https://picsum.photos/200/120?random=6"
    }
];