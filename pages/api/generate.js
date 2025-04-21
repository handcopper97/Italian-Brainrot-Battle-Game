export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      // 나중에 OpenAI API 호출 로직 추가
      return res.status(200).json({ message: 'API 엔드포인트가 작동합니다!' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }