from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.league import LeagueModel
from app.schemas.league import CreateLeagueSchema, LeagueSchema, PatchLeagueSchema


async def create(session: AsyncSession, league_to_create: CreateLeagueSchema) -> LeagueSchema:

    max_order_index: int | None = await session.scalar(select(func.max(LeagueModel.order_index)))

    league: LeagueModel = LeagueModel(name=league_to_create.name, order_index=(max_order_index + 1) if max_order_index else 0)

    session.add(league)

    await session.commit()

    await session.refresh(league)

    return get_model_from_schema(league)


async def delete(session: AsyncSession, league_id: int) -> LeagueSchema:

    league: LeagueModel = await get_by_id(session, league_id)

    await session.delete(league)

    await session.commit()

    return get_model_from_schema(league)


async def get_all(session: AsyncSession) -> list[LeagueSchema]:

    leagues: Sequence[LeagueModel] = (await session.scalars(select(LeagueModel).order_by(LeagueModel.order_index))).unique().all()

    return [get_model_from_schema(league) for league in leagues]


async def get_by_id(session: AsyncSession, league_id: int) -> LeagueModel:

    league: LeagueModel | None = (await session.scalars(select(LeagueModel).where(LeagueModel.id == league_id))).first()

    if not league:
        raise HTTPException(status_code=404, detail="League not found")

    return league


def get_model_from_schema(model: LeagueModel) -> LeagueSchema:

    return LeagueSchema(id=model.id, name=model.name, order_index=model.order_index)


async def get_single(session: AsyncSession, league_id: int) -> LeagueSchema:

    league: LeagueModel = await get_by_id(session, league_id)

    return get_model_from_schema(league)


async def patch(session: AsyncSession, league_id: int, patched_league: PatchLeagueSchema) -> LeagueSchema:

    league: LeagueModel = await get_by_id(session, league_id)

    league.name = patched_league.name

    session.add(league)

    await session.commit()

    return get_model_from_schema(league)


async def reorder(session: AsyncSession, leagues: list[LeagueSchema]) -> list[LeagueSchema]:

    for index, league in enumerate(leagues):

        league_to_reorder: LeagueModel = await get_by_id(session, league.id)

        league_to_reorder.order_index = index

        session.add(league_to_reorder)

    await session.commit()

    return await get_all(session)
