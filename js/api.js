// API 호출 관리 모듈

// 결과를 캐싱하기 위한 객체
const battleResultsCache = {};

/**
 * 대결 결과를 생성하는 함수
 */
export async function generateBattleResult(playerChar, opponentChar, environment, playerStrategy, opponentStrategy) {
    // 캐시 키 생성
    const cacheKey = `${playerChar.name}-${opponentChar.name}-${environment.name}-${playerStrategy.name}-${opponentStrategy.name}`;
    
    // 이미 캐시된 결과가 있으면 반환
    if (battleResultsCache[cacheKey]) {
        console.log('캐시된 결과 사용:', cacheKey);
        return battleResultsCache[cacheKey];
    }
    
    try {
        // 서버리스 함수 호출을 시뮬레이션 (실제 배포 후 활성화)
        // 현재는 API 키를 보호하기 위해 서버리스 함수 대신 로컬 생성 함수 사용
        // const response = await fetch('/api/generateResult', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         playerChar,
        //         opponentChar,
        //         environment,
        //         playerStrategy,
        //         opponentStrategy
        //     })
        // });
        // 
        // const data = await response.json();
        // 
        // if (data.error) {
        //     console.error('API 오류:', data.error);
        //     return generateFallbackResult(playerChar, opponentChar, environment);
        // }
        // 
        // const result = data.result;

        // 로컬에서 테스트를 위한 대체 결과 생성
        const result = generateFallbackResult(playerChar, opponentChar, environment);
        
        // 결과 캐싱
        battleResultsCache[cacheKey] = result;
        
        // 최대 20개 결과만 캐싱
        const keys = Object.keys(battleResultsCache);
        if (keys.length > 20) {
            delete battleResultsCache[keys[0]];
        }
        
        return result;
    } catch (error) {
        console.error('API 호출 오류:', error);
        return generateFallbackResult(playerChar, opponentChar, environment);
    }
}

/**
 * API 호출 실패 시 사용할 대체 결과 생성 함수
 */
export function generateFallbackResult(playerChar, opponentChar, environment) {
    // 랜덤으로 승자 결정
    const playerWins = Math.random() > 0.5;
    
    const winner = playerWins ? playerChar : opponentChar;
    const loser = playerWins ? opponentChar : playerChar;
    
    // 랜덤 능력 선택
    const winnerAbility = winner.defaultAbilities[Math.floor(Math.random() * winner.defaultAbilities.length)].split(' - ')[0];
    const loserAbility = loser.defaultAbilities[Math.floor(Math.random() * loser.defaultAbilities.length)].split(' - ')[0];
    
    const templates = [
        `${winner.name}의 압도적인 힘이 ${loser.name}를 완전히 제압했다! ${environment.name} 환경에서 ${winner.name}의 ${winnerAbility} 능력은 우주의 법칙마저 비틀었고, ${loser.name}의 ${loserAbility}은(는) 그 앞에 무력했다. 이것은 Italian Brainrot 역사상 가장 일방적인 승리였다!`,
        
        `놀랍게도 ${winner.name}이(가) ${loser.name}을(를) 예상을 뒤엎고 격파했다! ${environment.name}의 특성을 완벽하게 활용한 ${winner.name}의 터무니없는 ${winnerAbility} 능력은 모든 논리와 물리법칙을 무시하며 승리를 가져왔다. ${loser.name}은(는) 자신의 ${loserAbility} 능력이 무용지물이 되는 순간을 그저 지켜볼 수밖에 없었다.`,
        
        `${loser.name}이(가) 아무리 노력해도 ${winner.name}의 압도적인 힘 앞에 무릎을 꿇을 수밖에 없었다. ${environment.name} 속에서 ${winner.name}의 존재 자체가 우주의 균형을 깨뜨리는 수준이었기 때문이다! ${winner.name}의 ${winnerAbility}은(는) ${loser.name}의 ${loserAbility}을(를) 완전히 압도했고, 결국 승리는 ${winner.name}의 것이 되었다.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}