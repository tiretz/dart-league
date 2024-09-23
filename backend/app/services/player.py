from typing import Sequence

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.player import PlayerModel
from app.schemas.player import CreatePlayerSchema, PatchPlayerSchema, PlayerSchema
from app.services import team as team_service


async def create(session: AsyncSession, player_to_create: CreatePlayerSchema) -> PlayerSchema:

    player: PlayerModel = PlayerModel(first_name=player_to_create.first_name, last_name=player_to_create.last_name, passnumber=player_to_create.passnumber, teams=[await team_service.get_by_id(session, teamId) for teamId in player_to_create.teamIds])

    session.add(player)

    await session.commit()

    await session.refresh(player)

    return await get_schema_from_model(session, player)


async def delete(session: AsyncSession, player_id: int) -> PlayerSchema:

    player: PlayerModel = await get_by_id(session, player_id)

    await session.delete(player)

    await session.commit()

    return await get_schema_from_model(session, player)


async def get_all(session: AsyncSession) -> list[PlayerSchema]:

    players: Sequence[PlayerModel] = (await session.scalars(select(PlayerModel).order_by(PlayerModel.id))).unique().all()

    return [await get_schema_from_model(session, player) for player in players]


async def get_by_id(session: AsyncSession, team_id: int) -> PlayerModel:

    player: PlayerModel | None = (await session.scalars(select(PlayerModel).where(PlayerModel.id == team_id))).unique().first()

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    return player


async def get_schema_from_model(session: AsyncSession, player: PlayerModel) -> PlayerSchema:

    return PlayerSchema(id=player.id, first_name=player.first_name, last_name=player.last_name, passnumber=player.passnumber, teams=[await team_service.get_single(session, team.id) for team in player.teams])


async def get_single(session: AsyncSession, player_id: int) -> PlayerSchema:

    player: PlayerModel = await get_by_id(session, player_id)

    return await get_schema_from_model(session, player)


async def patch(session: AsyncSession, team_id: int, patched_player: PatchPlayerSchema) -> PlayerSchema:

    player: PlayerModel = await get_by_id(session, team_id)

    player.first_name = patched_player.first_name
    player.last_name = patched_player.last_name
    player.passnumber = patched_player.passnumber
    player.teams = [await team_service.get_by_id(session, teamId) for teamId in patched_player.teamIds]

    session.add(player)

    await session.commit()

    return await get_schema_from_model(session, player)
