import * as Constants from './constants';
import { teamServiceInstance } from './team.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';
import { AxiosError } from 'axios';

const getAllTeamsQuery = (
  args: QUERIES.QueryPayload<{ companyId: string }>,
) => {
  const { params, queryOptions } = args;
  return QUERIES.useCustomQuery<MODELS.ITeam[], any, AxiosError>({
    queryKey: [Constants.TEAM_KEYS.GET_ALL_TEAM],
    queryFn: () => teamServiceInstance().getAllTeams({ params }),
    options: queryOptions,
  });
};

const createTeamMutation = (args: QUERIES.MutationPayload<MODELS.ITeam>) => {
  return QUERIES.useCustomMutation<MODELS.ITeam, any, AxiosError>({
    mutationKey: [Constants.TEAM_KEYS.CREATE_TEAM],
    mutationFn: ({ payload }) => teamServiceInstance().create_team(payload!),
    options: args.mutationOptions,
  });
};

export { getAllTeamsQuery, createTeamMutation };
