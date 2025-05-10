import { UserSession } from "@/types/types";

const sessions = new Map<number, UserSession>();

export function getSession(userId: number): UserSession {
  if (!sessions.has(userId)) {
    sessions.set(userId, {
      editProfile: null,
      currentMenu: 'menu_main',
      workoutType: null,
      editTempData: {
        userId,
      },
    });
  }
  return sessions.get(userId)!;
}

export function updateSession(userId: number, update: Partial<UserSession>) {
  const session = getSession(userId);
  sessions.set(userId, { ...session, ...update });
}

export function clearSession(userId: number) {
  sessions.delete(userId);
}
