export interface ITeam {
  id?: string;
  name?: string;
  description?: string;
  members?: string[];
  companyId: string;
  managerTeamId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeamList {}
