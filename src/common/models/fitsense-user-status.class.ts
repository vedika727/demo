export class FitsenseUserStatus{
    fitSenseStatus: {
        activity: {
        activityScoreToday: number,
        activityScoreGoal: number,
        activityScoreAverage: number,
        activityRecommendations: {
        running: {
        durationMinutes: number,
        speedKph: number
        },
        cycling: {
        durationMinutes: number,
        speedKph: number
        }
        },
        statusLevel: string
    },
        balance: {
            pointsBalance: number
        },
        challenges: Array<  {
            type: string,
            name: string,
            startTime: number,
            endTime: number,
            hasJoined: boolean,
            secondsLeft: number,
            rank:number,
            participants: number,
            score: number,
            scoreGoal: number
        } > 
      
    }
}