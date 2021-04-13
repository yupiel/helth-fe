interface Activity {
    readonly id: string;
    readonly activityType: string;
    readonly creationDate: Date;
    readonly userID: string;
}

export default Activity