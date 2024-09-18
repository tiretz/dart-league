from fastapi import APIRouter

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.player import PlayerSchema
from app.services import player as service


router: APIRouter = APIRouter(prefix="/player", tags=["player"])


@router.post("", response_model=PlayerSchema, description="Create new player")
async def create_new(*, session: AsyncSessionDep):

    return await service.create(session)


@router.get("", response_model=list[PlayerSchema], description="Get all players")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{player_id}", response_model=PlayerSchema, description="Get single player by ID")
async def get_by_id(*, session: AsyncSessionDep, player_id: int):

    return await service.get_by_id(session, player_id)
