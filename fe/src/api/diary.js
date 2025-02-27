import api from "./config";

// 대화방 요약 가져오기
export const getDiarySummary = async (chatroomId) => {
  try {
    const response = await api.post("/diary/summary", {
      chatroom_id: chatroomId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch diary summary", error);
    throw error;
  }
};

// 요약 생성 후 자동 저장
export const summarizeAndSaveDiary = async (chatroomId) => {
  try {
    const response = await api.post("/diary/summary/save", {
      chatroom_id: chatroomId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to summarize and save diary", error);
    throw error;
  }
};

// 일기 저장 (새 일기 작성)
export const saveDiary = async (chatroomId, content, date, emotion) => {
  try {
    const response = await api.post("/diary/save", {
      chatroom_id: chatroomId,
      content,
      date,
      emotion,
      summary: null, // 새 일기는 summary 없이 저장
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save diary", error);
    throw error;
  }
};

// 일기 목록 조회
export const getDiaryList = async (date) => {
  try {
    const formattedDate = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD 형식 변환
    console.log(`[DEBUG] 요청 날짜: ${formattedDate}`);

    const response = await api.get("/diary/list", {
      params: { date: formattedDate },
    });
    return response.data.diaries;
  } catch (error) {
    console.error("Failed to fetch diary list", error);
    throw error;
  }
};

// 일기 상세 조회
export const getDiaryDetail = async (diaryId) => {
  try {
    const response = await api.get(`/diary/${diaryId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch diary detail", error);
    throw error;
  }
};

// 일기 수정
export const updateDiary = async (diaryId, content, emotion) => {
  try {
    const response = await api.put(`/diary/update/${diaryId}`, {
      content,
      emotion,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update diary", error);
    throw error;
  }
};

// 일기 삭제
export const deleteDiary = async (diaryId) => {
  try {
    const response = await api.delete(`/diary/delete/${diaryId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete diary", error);
    throw error;
  }
};
