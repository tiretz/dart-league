from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.mode import ModeModel
from app.schemas.mode import CreateModeSchema, ModeSchema, PatchModeSchema


async def create(session: AsyncSession, mode_to_create: CreateModeSchema) -> ModeSchema:

    max_order_index: int | None = await session.scalar(select(func.max(ModeModel.order_index)))

    mode: ModeModel = ModeModel(name=mode_to_create.name, order_index=(max_order_index + 1) if max_order_index else 0)

    session.add(mode)

    await session.commit()

    await session.refresh(mode)

    return get_model_from_schema(mode)


async def delete(session: AsyncSession, mode_id: int) -> ModeSchema:

    mode: ModeModel = await get_by_id(session, mode_id)

    await session.delete(mode)

    await session.commit()

    return get_model_from_schema(mode)


async def get_all(session: AsyncSession) -> list[ModeSchema]:

    modes: Sequence[ModeModel] = (await session.scalars(select(ModeModel).order_by(ModeModel.order_index))).unique().all()

    return [get_model_from_schema(mode) for mode in modes]


async def get_by_id(session: AsyncSession, mode_id: int) -> ModeModel:

    mode: ModeModel | None = (await session.scalars(select(ModeModel).where(ModeModel.id == mode_id))).first()

    if not mode:
        raise HTTPException(status_code=404, detail="Mode not found")

    return mode


def get_model_from_schema(mode: ModeModel) -> ModeSchema:

    return ModeSchema(id=mode.id, name=mode.name, order_index=mode.order_index)


async def get_single(session: AsyncSession, mode_id: int) -> ModeSchema:

    mode: ModeModel = await get_by_id(session, mode_id)

    return get_model_from_schema(mode)


async def patch(session: AsyncSession, mode_id: int, patched_mode: PatchModeSchema) -> ModeSchema:

    mode: ModeModel = await get_by_id(session, mode_id)

    mode.name = patched_mode.name

    session.add(mode)

    await session.commit()

    return get_model_from_schema(mode)


async def reorder(session: AsyncSession, modes: list[ModeSchema]) -> list[ModeSchema]:

    for index, mode in enumerate(modes):

        mode_to_reorder: ModeModel = await get_by_id(session, mode.id)

        mode_to_reorder.order_index = index

        session.add(mode_to_reorder)

    await session.commit()

    return await get_all(session)
