from fastapi import APIRouter, Body, status

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.player import CreatePlayerSchema, PatchPlayerSchema, PlayerSchema
from app.services import player as service


router: APIRouter = APIRouter(prefix="/player", tags=["player"])


@router.post("", response_model=PlayerSchema, status_code=status.HTTP_201_CREATED, description="Create new home player")
async def create(*, session: AsyncSessionDep, homePlayer: CreatePlayerSchema = Body()):

    return await service.create(session, homePlayer)


@router.delete("/{home_player_id}", response_model=PlayerSchema, description="Delete home player")
async def delete(*, session: AsyncSessionDep, home_player_id: int):

    return await service.delete(session, home_player_id)


@router.get("", response_model=list[PlayerSchema], description="Get all home players")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{home_player_id}", response_model=PlayerSchema, description="Get home player by ID")
async def get_single(*, session: AsyncSessionDep, home_player_id: int):

    return await service.get_single(session, home_player_id)


@router.patch("/{home_player_id}", response_model=PlayerSchema, description="Edit home player")
async def patch(*, session: AsyncSessionDep, home_player_id: int, team: PatchPlayerSchema = Body()):

    return await service.patch(session, home_player_id, team)
