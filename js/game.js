// 게임 메인 모듈

// 필요한 모듈 가져오기
import { charactersData } from './characters.js';
import { battleEnvironments } from './environments.js';
import { battleStrategies } from './strategies.js';
import { generateBattleResult } from './api.js';

// 게임 상태 관리 객체
const gameState = {
    selectedCharacter: null,
    opponentCharacter: null,
    selectedStrategy: null,
    opponentStrategy: null,
    currentEnvironment: null,
    battleResult: null,
    playerWins: false
};

// DOM 요소 캐싱
const elements = {
    screens: {
        select: document.querySelector('.select-screen'),
        strategy: document.querySelector('.strategy-screen'),
        battle: document.querySelector('.battle-screen'),
        result: document.querySelector('.result-screen')
    },
    characterSelection: document.getElementById('character-selection'),
    strategySelection: document.getElementById('strategy-selection'),
    environment: {
        image: document.getElementById('environment-image'),
        name: document.getElementById('environment-name'),
        description: document.getElementById('environment-description')
    },
    battle: {
        environmentImage: document.getElementById('battle-environment-image'),
        environmentName: document.getElementById('battle-environment-name'),
        environmentDescription: document.getElementById('battle-environment-description'),
        playerImage: document.getElementById('player-image'),
        playerName: document.getElementById('player-name'),
        playerStrategy: document.getElementById('player-strategy'),
        playerAbilities: document.getElementById('player-abilities'),
        opponentImage: document.getElementById('opponent-image'),
        opponentName: document.getElementById('opponent-name'),
        opponentStrategy: document.getElementById('opponent-strategy'),
        opponentAbilities: document.getElementById('opponent-abilities')
    },
    result: {
        title: document.getElementById('result-title'),
        image: document.getElementById('result-image'),
        text: document.getElementById('result-text')
    },
    buttons: {
        goToStrategy: document.getElementById('go-to-strategy'),
        backToSelect: document.getElementById('back-to-select'),
        startBattle: document.getElementById('start-battle'),
        backToStrategy: document.getElementById('back-to-strategy'),
        showResult: document.getElementById('show-result'),
        newBattle: document.getElementById('new-battle'),
        shareResult: document.getElementById('share-result')
    }
};

// 게임 초기화
function initGame() {
    // 캐릭터 카드 생성
    createCharacterCards();
    
    // 버튼 이벤트 리스너 설정
    setupEventListeners();
    
    // 첫 번째 화면 표시
    showScreen('select');
}

// 캐릭터 카드 생성 함수
function createCharacterCards() {
    elements.characterSelection.innerHTML = '';
    
    Object.entries(charactersData).forEach(([id, character]) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.id = id;
        
        card.innerHTML = `
            <div class="character-image" style="background-image: url(${character.image});"></div>
            <div class="character-name">${character.name}</div>
            <div class="character-desc">${character.description.substring(0, 50)}...</div>
        `;
        
        // 캐릭터 선택 이벤트
        card.addEventListener('click', () => {
            // 이전 선택 제거
            document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
            // 현재 선택 추가
            card.classList.add('selected');
            // 선택된 캐릭터 저장
            gameState.selectedCharacter = character;
        });
        
        elements.characterSelection.appendChild(card);
    });
}

// 전략 카드 생성 함수
function createStrategyCards() {
    elements.strategySelection.innerHTML = '';
    
    battleStrategies.forEach(strategy => {
        const strategyCard = document.createElement('div');
        strategyCard.className = 'strategy-card';
        strategyCard.dataset.strategy = strategy.name;
        
        // 현재 환경에 따른 유불리 표시
        let environmentEffect = '';
        if (strategy.advantageEnvironment === gameState.currentEnvironment.name) {
            environmentEffect = `<span style="color: #4CAF50;">✓ 현재 환경에 유리</span>`;
        } else if (strategy.disadvantageEnvironment === gameState.currentEnvironment.name) {
            environmentEffect = `<span style="color: #F44336;">✗ 현재 환경에 불리</span>`;
        }
        
        strategyCard.innerHTML = `
            <div class="strategy-name">${strategy.name}</div>
            <div class="strategy-desc">${strategy.description}</div>
            <div class="strategy-effect">${strategy.effectDescription}</div>
            <div class="strategy-environment-effect">${environmentEffect}</div>
        `;
        
        // 전략 선택 이벤트
        strategyCard.addEventListener('click', () => {
            // 이전 선택 제거
            document.querySelectorAll('.strategy-card').forEach(s => s.classList.remove('selected'));
            // 현재 선택 추가
            strategyCard.classList.add('selected');
            // 선택된 전략 저장
            gameState.selectedStrategy = strategy;
        });
        
        elements.strategySelection.appendChild(strategyCard);
    });
}

// 이벤트 리스너 설정 함수
function setupEventListeners() {
    // 캐릭터 선택 후 전략 화면으로
    elements.buttons.goToStrategy.addEventListener('click', () => {
        if (!gameState.selectedCharacter) {
            alert('먼저 캐릭터를 선택해주세요!');
            return;
        }
        
        // 랜덤으로 환경 선택
        gameState.currentEnvironment = battleEnvironments[Math.floor(Math.random() * battleEnvironments.length)];
        
        // 환경 정보 표시
        elements.environment.image.style.backgroundImage = `url(${gameState.currentEnvironment.image})`;
        elements.environment.name.textContent = gameState.currentEnvironment.name;
        elements.environment.description.textContent = gameState.currentEnvironment.description;
        
        // 선택된 캐릭터 이름 표시
        document.getElementById('selected-character-name').textContent = gameState.selectedCharacter.name;
        
        // 전략 카드 생성
        createStrategyCards();
        
        // 화면 전환
        showScreen('strategy');
    });
    
    // 전략 화면에서 캐릭터 선택 화면으로 돌아가기
    elements.buttons.backToSelect.addEventListener('click', () => {
        showScreen('select');
    });
    
    // 전략 선택 후 대결 화면으로
    elements.buttons.startBattle.addEventListener('click', () => {
        if (!gameState.selectedStrategy) {
            alert('전략을 선택해주세요!');
            return;
        }
        
        // 랜덤 상대 캐릭터 선택 (선택된 캐릭터와 다른 것으로)
        const availableOpponents = Object.values(charactersData).filter(
            char => char.name !== gameState.selectedCharacter.name
        );
        gameState.opponentCharacter = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
        
        // 랜덤 상대 전략 선택
        gameState.opponentStrategy = battleStrategies[Math.floor(Math.random() * battleStrategies.length)];
        
        // 대결 화면 설정
        setupBattleScreen();
        
        // 화면 전환
        showScreen('battle');
    });
    
    // 대결 화면에서 전략 선택 화면으로 돌아가기
    elements.buttons.backToStrategy.addEventListener('click', () => {
        showScreen('strategy');
    });
    
    // 결과 보기 버튼
    elements.buttons.showResult.addEventListener('click', async () => {
        await setupResultScreen();
        showScreen('result');
    });
    
    // 새 대결 버튼
    elements.buttons.newBattle.addEventListener('click', () => {
        showScreen('select');
    });
    
    // 결과 공유 버튼
    elements.buttons.shareResult.addEventListener('click', () => {
        shareResult();
    });
}

// 대결 화면 설정 함수
function setupBattleScreen() {
    // 환경 정보 표시
    elements.battle.environmentImage.style.backgroundImage = `url(${gameState.currentEnvironment.image})`;
    elements.battle.environmentName.textContent = gameState.currentEnvironment.name;
    elements.battle.environmentDescription.textContent = gameState.currentEnvironment.description;
    
    // 플레이어 정보 설정
    elements.battle.playerImage.style.backgroundImage = `url(${gameState.selectedCharacter.image})`;
    elements.battle.playerName.textContent = gameState.selectedCharacter.name;
    elements.battle.playerStrategy.textContent = `전략: ${gameState.selectedStrategy.name}`;
    
    // 플레이어 능력 목록 표시
    elements.battle.playerAbilities.innerHTML = '';
    gameState.selectedCharacter.defaultAbilities.forEach(ability => {
        const li = document.createElement('li');
        li.className = 'ability-item';
        li.textContent = ability;
        elements.battle.playerAbilities.appendChild(li);
    });
    
    // 상대 정보 설정
    elements.battle.opponentImage.style.backgroundImage = `url(${gameState.opponentCharacter.image})`;
    elements.battle.opponentName.textContent = gameState.opponentCharacter.name;
    elements.battle.opponentStrategy.textContent = `전략: ${gameState.opponentStrategy.name}`;
    
    // 상대 능력 목록 표시
    elements.battle.opponentAbilities.innerHTML = '';
    gameState.opponentCharacter.defaultAbilities.forEach(ability => {
        const li = document.createElement('li');
        li.className = 'ability-item';
        li.textContent = ability;
        elements.battle.opponentAbilities.appendChild(li);
    });
}

// 결과 화면 설정 함수
async function setupResultScreen() {
    // 로딩 표시
    elements.result.text.innerHTML = `
        <div class="loading-animation">
            <p>강력한 AI가 대결 결과를 분석 중...</p>
            <div class="spinner"></div>
        </div>
    `;
    
    // 대결 결과 생성
    const resultText = await generateBattleResult(
        gameState.selectedCharacter,
        gameState.opponentCharacter,
        gameState.currentEnvironment,
        gameState.selectedStrategy,
        gameState.opponentStrategy
    );
    
    gameState.battleResult = resultText;
    
    // 승자 판별 (텍스트 분석)
    gameState.playerWins = resultText.includes(`${gameState.selectedCharacter.name}의 승리`) || 
                          resultText.includes(`${gameState.selectedCharacter.name}이(가) 승리`) ||
                          resultText.includes(`${gameState.selectedCharacter.name}가 승리`) ||
                          !resultText.includes(`${gameState.opponentCharacter.name}의 승리`) &&
                          !resultText.includes(`${gameState.opponentCharacter.name}이(가) 승리`) &&
                          !resultText.includes(`${gameState.opponentCharacter.name}가 승리`);
    
    // 결과 화면 업데이트
    elements.result.title.textContent = gameState.playerWins ? '승리!' : '패배!';
    elements.result.image.style.backgroundImage = `url(${gameState.playerWins ? gameState.selectedCharacter.image : gameState.opponentCharacter.image})`;
    elements.result.text.innerHTML = resultText.split('\n').map(para => `<p>${para}</p>`).join('');
}

// 결과 공유 함수
function shareResult() {
    // 소셜 미디어 공유 기능
    const resultText = gameState.battleResult || '대결 결과가 없습니다.';
    const text = `내 캐릭터 ${gameState.selectedCharacter.name}(이)가 ${gameState.opponentCharacter.name}와(과)의 Italian Brainrot 대결에서 ${gameState.playerWins ? '승리' : '패배'}했어요!\n\n${resultText.substring(0, 100)}...\n\n당신도 도전해보세요!`;
    const url = window.location.href;
    
    // 공유 API 사용 (지원되는 브라우저)
    if (navigator.share) {
        navigator.share({
            title: 'Italian Brainrot 밈 대전 결과',
            text: text,
            url: url
        }).catch(err => {
            console.error('공유하기 실패:', err);
            prompt('아래 텍스트를 복사하여 공유하세요:', text + ' ' + url);
        });
    } else {
        // 공유 API가 지원되지 않는 경우
        prompt('아래 텍스트를 복사하여 공유하세요:', text + ' ' + url);
    }
}

// 화면 전환 함수
function showScreen(screenName) {
    // 모든 화면 숨기기
    Object.values(elements.screens).forEach(screen => {
        screen.style.display = 'none';
    });
    
    // 요청한 화면만 표시
    elements.screens[screenName].style.display = 'block';
}

// 게임 시작
document.addEventListener('DOMContentLoaded', initGame);