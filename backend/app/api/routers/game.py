from fastapi import APIRouter

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.game import GameSchema
from app.services import game as service


router: APIRouter = APIRouter(prefix="/game", tags=["game"])


@router.post("", response_model=GameSchema, description="Create new game")
async def create_new(*, session: AsyncSessionDep):

    return await service.create_new(session)


@router.get("", response_model=list[GameSchema], description="Get all games")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{game_id}", response_model=GameSchema, description="Get single game by ID")
async def get_by_id(*, session: AsyncSessionDep, game_id: int):

    return await service.get_by_id(session, game_id)
