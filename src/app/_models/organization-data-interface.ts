export class OrganizationDataInterface{
    id: number;
	orgStatusId: number;
	orgTypeId: number;
    orgNameTh: string;
	orgNameEn: string;
	orgAddress: string;
	orgTel: string;
	orgEmail: string;
	orgCoopStdAmount: number;
    orgAnnAmount: number;
	orgDetail: string;
}

export class StaffOrgDataInterface{
	id: number;
	stfOrgId: number;
	stfOrgAccId:number;
	stfOrgFirstNameTh:string;
	stfOrgFirstNameEn:string;
	stfOrgLastNameTh:string;
	stfOrgLastNameEn:string;
	stfOrgTel:string;
	stfOrgEmail:string;
	stfOrgMobileTel:string;

}