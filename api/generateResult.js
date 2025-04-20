// api/generateResult.js - Vercel Serverless Function

// 이 파일은 Vercel이나 Netlify에 배포할 때 사용됩니다.
// 로컬 개발 중에는 이 파일이 실행되지 않으며, 
// js/api.js에서 대체 결과를 생성합니다.

// 환경 변수에서 API 키를 가져옵니다.
// .env 파일에 OPENAI_API_KEY를 설정하고, 이를 Vercel/Netlify에도 설정해야 합니다.
const apiKey = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // OPTIONS 요청 처리 (CORS preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // POST 요청만 처리
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { playerChar, opponentChar, environment, playerStrategy, opponentStrategy } = req.body;
        
        // 필수 파라미터 확인
        if (!playerChar || !opponentChar || !environment || !playerStrategy || !opponentStrategy) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // API 키 확인
        if (!apiKey) {
            return res.status(500).json({ error: 'API key is not configured' });
        }

        // OpenAI API 요청 구성
        const prompt = `
Italian Brainrot 밈 캐릭터들의 대결 결과를 생성해주세요.

플레이어: ${playerChar.name}
플레이어 능력:
${playerChar.abilities.join('\n')}
플레이어 전략: ${playerStrategy.name} - ${playerStrategy.description}

상대: ${opponentChar.name}
상대 능력:
${opponentChar.abilities.join('\n')}
상대 전략: ${opponentStrategy.name} - ${opponentStrategy.description}

전투 환경: ${environment.name} - ${environment.description}

환경 유리한 캐릭터: ${environment.advantage}
환경 불리한 캐릭터: ${environment.disadvantage}

위 정보를 바탕으로 Italian Brainrot 밈 스타일의 터무니없고 과장된 대결 결과를 만들어주세요. 
결과는 5-7문장으로 작성하고, 다음을 포함해야 합니다:
1. 승자와 패자를 명확히 표시
2. 결정적인 능력이나 전략이 어떻게 승리에 기여했는지 과장되고 황당한 설명
3. 전투 환경이 어떻게 결과에 영향을 미쳤는지
4. Italian Brainrot 밈 특유의 과장되고 비논리적이지만 마치 논리적인 것처럼 보이는 설명
5. 우주, 차원, 물리 법칙 등을 초월하는 터무니없는 능력 묘사

결과는 한국어로 작성해주세요.`;

        // OpenAI API 호출
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You generate battle results for an Italian Brainrot meme battle game. Your responses should be hyperbolic, absurd, and over-the-top, but presented as if they make perfect logical sense.'
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: 1.0,
                max_tokens: 500
            })
        });

        const data = await response.json();

        // 응답 확인 및 결과 반환
        if (data.error) {
            console.error('OpenAI API 오류:', data.error);
            return res.status(500).json({ error: 'Error from OpenAI API', details: data.error });
        }

        if (data.choices && data.choices.length > 0) {
            const result = data.choices[0].message.content;
            return res.status(200).json({ result });
        } else {
            console.error('예상치 못한 API 응답 형식:', data);
            return res.status(500).json({ error: 'Unexpected API response format' });
        }
    } catch (error) {
        console.error('서버 오류:', error);
        return res.status(500).json({ error: 'Server error', message: error.message });
    }
}