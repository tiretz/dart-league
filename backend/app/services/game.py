from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.game import GameModel


async def create(session: AsyncSession) -> GameModel:
    return GameModel()


async def get_all(session: AsyncSession) -> list[GameModel]:

    games: Sequence[GameModel] = (await session.scalars(select(GameModel))).all()

    return list(games)


async def get_by_id(session: AsyncSession, game_id: int) -> GameModel:

    game: GameModel | None = (await session.scalars(select(GameModel).where(GameModel.id == game_id))).first()

    if not game:
        raise HTTPException(status_code=404, detail="Game not found")

    return game
