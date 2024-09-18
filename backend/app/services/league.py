from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.league import LeagueModel


async def create_new(session: AsyncSession) -> LeagueModel:
    return LeagueModel()


async def get_all(session: AsyncSession) -> list[LeagueModel]:

    leagues: Sequence[LeagueModel] = (await session.scalars(select(LeagueModel).order_by(LeagueModel.order_id))).unique().all()

    return list(leagues)


async def get_by_id(session: AsyncSession, game_id: int) -> LeagueModel:

    league: LeagueModel | None = (await session.scalars(select(LeagueModel).where(LeagueModel.id == game_id))).first()

    if not league:
        raise HTTPException(status_code=404, detail="League not found")

    return league
