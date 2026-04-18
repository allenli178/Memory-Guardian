import { useLocalStorage } from "./useLocalStorage";

interface GameRecord {
  type: "match" | "number" | "color";
  score: number;
  time?: number;
  stars?: number;
  level?: number;
  correct?: number;
  total?: number;
}

interface DailyRecord {
  date: string;
  games: GameRecord[];
  totalScore: number;
  duration: number;
}

export function useGameStats() {
  const records = useLocalStorage<DailyRecord[]>("memory-guardian-records", []);

  function addRecord(record: GameRecord) {
    const today = new Date().toISOString().split("T")[0];
    const existingIndex = records.value.findIndex((r) => r.date === today);

    if (existingIndex >= 0) {
      records.value[existingIndex].games.push(record);
      records.value[existingIndex].totalScore += record.score;
      records.value[existingIndex].duration += record.time ? Math.ceil(record.time / 60) : 1;
    } else {
      const newRecord: DailyRecord = {
        date: today,
        games: [record],
        totalScore: record.score,
        duration: record.time ? Math.ceil(record.time / 60) : 1,
      };
      records.value.push(newRecord);
    }
  }

  function getTodayRecords(): DailyRecord | null {
    const today = new Date().toISOString().split("T")[0];
    return records.value.find((r) => r.date === today) || null;
  }

  function getWeeklyScores(): number[] {
    const scores: number[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const record = records.value.find((r) => r.date === dateStr);
      scores.push(record ? record.totalScore : 0);
    }

    return scores;
  }

  function getEncouragement(score: number): string {
    if (score >= 90) {
      return "您今天表现非常出色，继续保持！";
    } else if (score >= 70) {
      return "您今天表现很好，继续加油！";
    } else if (score >= 50) {
      return "您今天做得不错，明天继续努力！";
    } else {
      return "谢谢您的参与，每一次训练都是进步！";
    }
  }

  return { records, addRecord, getTodayRecords, getWeeklyScores, getEncouragement };
}
