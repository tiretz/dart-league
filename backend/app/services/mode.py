from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.mode import ModeModel


async def create_new(session: AsyncSession) -> ModeModel:
    return ModeModel()


async def get_all(session: AsyncSession) -> list[ModeModel]:

    modes: Sequence[ModeModel] = (await session.scalars(select(ModeModel))).unique().all()

    return list(modes)


async def get_by_id(session: AsyncSession, game_id: int) -> ModeModel:

    mode: ModeModel | None = (await session.scalars(select(ModeModel).where(ModeModel.id == game_id))).first()

    if not mode:
        raise HTTPException(status_code=404, detail="Mode not found")

    return mode
