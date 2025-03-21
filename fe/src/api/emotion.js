import api from "./config";

/**
 * 감정 예측 요청 함수
 * @param {string} imageData
 * @param {string} userId
 * @param {string} chatroomId
 * @returns {Promise<Object>}
 */
export const predictEmotion = async (imageData, userId, chatroomId) => {
  try {
    const response = await api.post("/emotion/predict", {
      frame: imageData,
      user_id: userId,
      chatroom_id: chatroomId,
    });
    return response.data;
  } catch (error) {
    console.error("감정 예측 실패:", error);
    throw new Error("감정 예측 실패");
  }
};

/**
 * 감정 데이터를 MongoDB에 저장
 * @param {string} userId
 * @param {string} chatroomId
 * @param {string} emotion
 * @param {number} confidence
 * @returns {Promise<Object>}
 */
export const saveEmotionData = async (
  userId,
  chatroomId,
  emotion,
  confidence
) => {
  try {
    const response = await api.post("/emotion/save-emotion", {
      user_id: userId,
      chatroom_id: chatroomId,
      emotion,
      confidence,
    });
    return response.data;
  } catch (error) {
    console.error("감정 데이터 저장 실패:", error);
    throw new Error("감정 데이터 저장 실패");
  }
};

/**
 * 특정 채팅방의 감정 분석 결과 조회 (가장 많이 등장한 감정 포함)
 * @param {string} chatroomId
 * @returns {Promise<Object>}
 */
export const getEmotionResults = async (chatroomId) => {
  if (!chatroomId) {
    console.warn("[WARN] 유효하지 않은 chatroomId:", chatroomId);
    return { emotions: [], most_common: { emotion: "default", confidence: 0 } };
  }

  try {
    console.log("[DEBUG] 감정 데이터 요청 시작:", chatroomId);

    const response = await api.get(`/emotion/results/${chatroomId}`);

    console.log("[DEBUG] 감정 데이터 요청 성공:", response.data);

    return (
      response.data || {
        emotions: [],
        most_common: { emotion: "default", confidence: 0 },
      }
    );
  } catch (error) {
    console.error("[ERROR] 감정 결과 조회 실패:", error);

    if (error.response) {
      console.error("[ERROR] 응답 데이터:", error.response.data);
      console.error("[ERROR] 상태 코드:", error.response.status);
    }

    return { emotions: [], most_common: { emotion: "default", confidence: 0 } };
  }
};

/**
 * 감정 통계 조회 (주간, 월간)
 * @param {string} startDate - 조회 시작 날짜 (YYYY-MM-DD)
 * @param {string} endDate - 조회 종료 날짜 (YYYY-MM-DD)
 * @returns {Promise<Object>} 감정 통계 데이터 반환
 */
export const getEmotionStats = async (startDate, endDate) => {
  try {
    const startDateKST = `${startDate}T00:00:00+09:00`;
    const endDateKST = `${endDate}T23:59:59+09:00`;

    console.log("[DEBUG] API 요청 startDate:", startDateKST);
    console.log("[DEBUG] API 요청 endDate:", endDateKST);

    const response = await api.get("/emotion/stats", {
      params: { start_date: startDateKST, end_date: endDateKST },
    });

    return response.data.stats;
  } catch (error) {
    console.error("감정 통계 조회 오류:", error);
    return null;
  }
};

/**
 * 감정 데이터 삭제
 * @param {string} emotionId
 * @returns {Promise<Object>}
 */
export const deleteEmotionData = async (emotionId) => {
  try {
    const response = await api.delete(`/emotion/delete/${emotionId}`);
    return response.data;
  } catch (error) {
    console.error("감정 데이터 삭제 실패:", error);
    throw new Error("감정 데이터 삭제 실패");
  }
};