from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.player import PlayerModel


async def create(session: AsyncSession) -> PlayerModel:
    return PlayerModel()


async def get_all(session: AsyncSession) -> list[PlayerModel]:

    players: Sequence[PlayerModel] = (await session.scalars(select(PlayerModel))).all()

    return list(players)


async def get_by_id(session: AsyncSession, player_id: int) -> PlayerModel:

    player: PlayerModel | None = (await session.scalars(select(PlayerModel).where(PlayerModel.id == player_id))).first()

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    return player
