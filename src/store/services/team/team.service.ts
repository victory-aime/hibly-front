import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/index';

/**
 * TeamService provides methods for handling team-related operations
 * such as fetching all teams and creating a new team through API endpoints.
 */
export class TeamService extends BaseApi {
  getAllTeams(companyId?: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().TEAM.GET_ALL,
      {},
      { companyId },
    );
  }

  create_team(payload: MODELS.ITeam) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().TEAM.CREATE,
      payload,
    );
  }
}
