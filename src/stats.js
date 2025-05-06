import { DateTime } from 'luxon';
import { loadAllGuesses } from './save_local';

export function getStatsData() {
  const allGuesses = loadAllGuesses();

  const allGuessesEntries = Object.entries(allGuesses);
  const played = allGuessesEntries.length;

  const guessDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  let currentStreak = 0;
  let maxStreak = 0;
  let previousDate = null;
  for (const [dayString, guesses] of allGuessesEntries) {
    const currentDate = DateTime.fromFormat(dayString, 'yyyy-MM-dd');
    const winIndex = guesses.findIndex((guess) => guess.delta === 0);
    const won = winIndex >= 0;
    if (won) {
      const tryCount = winIndex + 1;
      guessDistribution[tryCount]++;

      if (
        previousDate == null ||
        previousDate.plus({ days: 1 }).hasSame(currentDate, 'day')
      ) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = 0;
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }
    previousDate = currentDate;
  }

  const winCount = Object.values(guessDistribution).reduce(
    (total, tries) => total + tries
  );

  return {
    currentStreak: currentStreak,
    maxStreak: maxStreak,
    played,
    winRatio: winCount / (played || 1),
    guessDistribution: guessDistribution,
  };
}
