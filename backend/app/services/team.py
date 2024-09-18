from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.team import TeamModel


async def create_new(session: AsyncSession) -> TeamModel:
    return TeamModel()


async def get_all(session: AsyncSession) -> list[TeamModel]:

    teams: Sequence[TeamModel] = (await session.scalars(select(TeamModel))).all()

    return list(teams)


async def get_by_id(session: AsyncSession, team_id: int) -> TeamModel:

    team: TeamModel | None = (await session.scalars(select(TeamModel).where(TeamModel.id == team_id))).first()

    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    return team
