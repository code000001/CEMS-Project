export class AnouncementInterface{
    id: number
    annStatusId: number
    annOrgId: number
    annAccId: number
    annStartDate : string
    annEndDate : string
    annStdAmount : number
    annReward : string
    annWorkshift : string
    annItemReq : string
}

export class AnouncementPutInterface{
    annStatusId: number
    annOrgId: number
    annAccId: number
    annStartDate : string
    annEndDate : string
    annStdAmount : number
    annReward : string
    annWorkshift : string
    annItemReq : string
}