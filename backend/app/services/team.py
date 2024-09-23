from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.league import LeagueModel
from app.models.team import TeamModel
from app.schemas.team import CreateTeamSchema, PatchTeamSchema, TeamSchema
from app.services import league as league_service


async def create(session: AsyncSession, team_to_create: CreateTeamSchema) -> TeamSchema:

    league: LeagueModel | None = await session.scalar(select(LeagueModel).where(LeagueModel.id == team_to_create.league_id))

    team: TeamModel = TeamModel(name=team_to_create.name, league=league)

    session.add(team)

    await session.commit()

    await session.refresh(team)

    return get_schema_from_model(team)


async def delete(session: AsyncSession, team_id: int) -> TeamSchema:

    team: TeamModel = await get_by_id(session, team_id)

    await session.delete(team)

    await session.commit()

    return get_schema_from_model(team)


async def get_all(session: AsyncSession) -> list[TeamSchema]:

    teams: Sequence[TeamModel] = (await session.scalars(select(TeamModel).order_by(TeamModel.id))).unique().all()

    return [get_schema_from_model(team) for team in teams]


async def get_by_id(session: AsyncSession, team_id: int) -> TeamModel:

    team: TeamModel | None = (await session.scalars(select(TeamModel).where(TeamModel.id == team_id))).unique().first()

    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    return team


def get_schema_from_model(team: TeamModel) -> TeamSchema:

    return TeamSchema(id=team.id, name=team.name, league=league_service.get_model_from_schema(team.league), number_of_players=len(team.players))


async def get_single(session: AsyncSession, team_id: int) -> TeamSchema:

    team: TeamModel = await get_by_id(session, team_id)

    return get_schema_from_model(team)


async def patch(session: AsyncSession, team_id: int, patched_team: PatchTeamSchema) -> TeamSchema:

    team: TeamModel = await get_by_id(session, team_id)

    team.league = await league_service.get_by_id(session, patched_team.league_id)
    team.name = patched_team.name

    session.add(team)

    await session.commit()

    return get_schema_from_model(team)
